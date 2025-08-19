import React, { createContext, useState, useContext, useEffect } from 'react';

const AuctionContext = createContext();

export const AuctionProvider = ({ children }) => {
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState({});
  const [loading, setLoading] = useState(true); // For initial page load
  const [isSelling, setIsSelling] = useState(false); // For when a player is sold
  const [isResetting, setIsResetting] = useState(false); // For when the auction is reset
  const [justSoldToTeam, setJustSoldToTeam] = useState(null); // State for the glow effect
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [currentBid, setCurrentBid] = useState(100000);
  const [lastBidder, setLastBidder] = useState(null);
  const [bidHistory, setBidHistory] = useState([]);
  const [auctionFinished, setAuctionFinished] = useState(false);

  const fetchAuctionData = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/auction');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPlayers(data.players);
      setTeams(data.teams);
    } catch (error) {
      console.error("Failed to fetch auction data:", error);
    }
  };

  useEffect(() => {
    const initialLoad = async () => {
      setLoading(true);
      await fetchAuctionData();
      setLoading(false);
    };
    initialLoad();
  }, []);

  const getNextBid = (bid) => {
    if (bid < 300000) return bid + 50000;
    if (bid < 1000000) return bid + 100000;
    return bid + 200000;
  };

  const handleBid = (teamShortName) => {
    if (players[currentPlayerIndex]?.isSold || auctionFinished) return;
    const nextBid = getNextBid(currentBid);
    if (teams[teamShortName]?.purse >= nextBid) {
      setBidHistory(prev => [...prev, { team: lastBidder, amount: currentBid }]);
      setCurrentBid(nextBid);
      setLastBidder(teamShortName);
    } else {
      alert(`${teamShortName} does not have enough purse for this bid.`);
    }
  };

  const handleUndo = () => {
    if (players[currentPlayerIndex]?.isSold || bidHistory.length === 0) return;
    const lastBid = bidHistory[bidHistory.length - 1];
    setCurrentBid(lastBid.amount);
    setLastBidder(lastBid.team);
    setBidHistory(prev => prev.slice(0, -1));
  };

  const handleSold = async () => {
    if (!lastBidder || players[currentPlayerIndex]?.isSold) return;
    const soldPlayer = players[currentPlayerIndex];
    
    setIsSelling(true);
    setJustSoldToTeam(lastBidder); // Trigger glow immediately

    try {
      const response = await fetch('http://localhost:8000/api/auction/sell', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          playerId: soldPlayer._id,
          teamShortName: lastBidder,
          soldPrice: currentBid,
        }),
      });
      if (!response.ok) throw new Error('Failed to save sale to the database');

      // Wait for 2 seconds to show loader and glow effect
      setTimeout(async () => {
        await fetchAuctionData();
        setIsSelling(false);
        setJustSoldToTeam(null);
      }, 200);

    } catch (error) {
      console.error("Error selling player:", error);
      alert("Failed to save the sale. Please check the server connection.");
      setIsSelling(false);
      setJustSoldToTeam(null);
    }
  };

  const handleNextPlayer = () => {
    if (currentPlayerIndex < players.length - 1) {
      setCurrentPlayerIndex(prev => prev + 1);
      setCurrentBid(100000);
      setLastBidder(null);
      setBidHistory([]);
    } else {
      if (window.confirm("This is the last player. Do you want to end the auction?")) {
        setAuctionFinished(true);
      }
    }
  };

  const handlePrevPlayer = () => {
    if (currentPlayerIndex > 0) {
      setCurrentPlayerIndex(prev => prev - 1);
      setCurrentBid(100000);
      setLastBidder(null);
      setBidHistory([]);
    }
  };
  
  const handleResetAuction = async () => {
    if (!window.confirm("Are you sure you want to reset the entire auction? All progress will be lost permanently.")) return;
    
    setIsResetting(true);
    try {
      const response = await fetch('http://localhost:8000/api/auction/reset', { method: 'POST' });
      if (!response.ok) throw new Error('Failed to reset auction on the server');
      window.location.reload(); // Reload the page to reflect changes
    } catch (error) {
      console.error("Error resetting auction:", error);
      alert("Failed to reset auction. Please check the server.");
      setIsResetting(false); // Hide loading indicator on error
    }
  };

  const value = {
    players, teams, loading, isSelling, isResetting, justSoldToTeam,
    currentPlayerIndex, currentBid, lastBidder, auctionFinished,
    handleBid, handleUndo, handleSold, handleNextPlayer, handlePrevPlayer, handleResetAuction
  };

  return <AuctionContext.Provider value={value}>{children}</AuctionContext.Provider>;
};

export const useAuction = () => {
  return useContext(AuctionContext);
};
