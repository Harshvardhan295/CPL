import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
// Import the local player data as a fallback for development
import playersData from '../data/players.json'; 

const AuctionContext = createContext();

export const AuctionProvider = ({ children }) => {
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState({});
  const [loading, setLoading] = useState(true);
  const [isSelling, setIsSelling] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [justSoldToTeam, setJustSoldToTeam] = useState(null);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [currentBid, setCurrentBid] = useState(100000);
  const [lastBidder, setLastBidder] = useState(null);
  const [bidHistory, setBidHistory] = useState([]);
  const [auctionFinished, setAuctionFinished] = useState(false);

  // --- DATA FETCHING ---
  // This function now attempts to fetch from the server, but uses local data as a fallback.
  // This is great for development when your backend might not be running.
  const fetchAuctionData = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:8000/api/auction');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPlayers(data.players);
      setTeams(data.teams);
      // Find the first unsold player to start the auction
      const firstUnsoldIndex = data.players.findIndex(p => !p.isSold);
      setCurrentPlayerIndex(firstUnsoldIndex >= 0 ? firstUnsoldIndex : 0);

    } catch (error) {
      console.error("Failed to fetch auction data from server, loading local fallback:", error);
      // --- Fallback to local data ---
      const localPlayers = playersData.map(p => ({ ...p, isSold: false, soldToTeam: null, soldPrice: 0, _id: p.id.toString() }));
      setPlayers(localPlayers);
      // You can define mock teams here if needed for local development
      setTeams({
         "CSK": { "name": "Chennai Super Kings", "purse": 10000000, "logo": "/logos/csk.png", color: '#FDB913' },
         "MI": { "name": "Mumbai Indians", "purse": 10000000, "logo": "/logos/mi.png", color: '#004B8D' },
         "RCB": { "name": "Royal Challengers Bangalore", "purse": 10000000, "logo": "/logos/rcb.png", color: '#EC1C24' },
         "KKR": { "name": "Kolkata Knight Riders", "purse": 10000000, "logo": "/logos/kkr.png", color: '#3A225D' },
      });
    }
  }, []);

  useEffect(() => {
    const initialLoad = async () => {
      setLoading(true);
      await fetchAuctionData();
      setLoading(false);
    };
    initialLoad();
  }, [fetchAuctionData]);

  // --- BIDDING LOGIC ---
  const getNextBid = (bid) => {
    if (bid < 300000) return bid + 50000;
    if (bid < 1000000) return bid + 100000;
    return bid + 200000;
  };

  const handleBid = (teamShortName) => {
    const currentPlayer = players[currentPlayerIndex];
    if (!currentPlayer || currentPlayer.isSold || auctionFinished) return;

    const nextBid = getNextBid(currentBid);
    if (teams[teamShortName]?.purse >= nextBid) {
      setBidHistory(prev => [...prev, { team: lastBidder, amount: currentBid }]);
      setCurrentBid(nextBid);
      setLastBidder(teamShortName);
    } else {
      // Use a more user-friendly notification instead of alert
      console.warn(`${teamShortName} does not have enough purse for this bid.`);
      // You could implement a toast notification here for a better UX
    }
  };

  const handleUndo = () => {
    if (players[currentPlayerIndex]?.isSold || bidHistory.length === 0) return;
    const lastBid = bidHistory[bidHistory.length - 1];
    setCurrentBid(lastBid.amount);
    setLastBidder(lastBid.team);
    setBidHistory(prev => prev.slice(0, -1));
  };

  // --- PLAYER SALE & NAVIGATION ---
  const handleSold = async () => {
    const soldPlayer = players[currentPlayerIndex];
    if (!lastBidder || !soldPlayer || soldPlayer.isSold) return;
    
    setIsSelling(true);
    setJustSoldToTeam(lastBidder);

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

      setTimeout(async () => {
        await fetchAuctionData(); // Refetch data to get the latest state
        setIsSelling(false);
        setJustSoldToTeam(null);
        // Automatically move to the next unsold player after a sale
        handleNextPlayer(true); 
      }, 2000); // Increased delay to 2 seconds for better visual feedback

    } catch (error) {
      console.error("Error selling player:", error);
      alert("Failed to save the sale. Please check the server connection.");
      setIsSelling(false);
      setJustSoldToTeam(null);
    }
  };

  // Improved navigation to skip sold players
  const handleNextPlayer = (isAfterSale = false) => {
    let nextIndex = -1;
    // Start searching from the current player's index + 1
    for (let i = currentPlayerIndex + 1; i < players.length; i++) {
        if (!players[i].isSold) {
            nextIndex = i;
            break;
        }
    }

    if (nextIndex !== -1) {
        setCurrentPlayerIndex(nextIndex);
    } else {
        // If no unsold player is found, check if all players are sold
        const allSold = players.every(p => p.isSold);
        if (allSold) {
            setAuctionFinished(true);
        } else if (!isAfterSale) {
            // Only show confirm if not triggered automatically after a sale
            if (window.confirm("This is the last available player. Do you want to end the auction?")) {
                setAuctionFinished(true);
            }
        }
    }
    // Reset bid state for the new player
    setCurrentBid(100000);
    setLastBidder(null);
    setBidHistory([]);
  };

  const handlePrevPlayer = () => {
    let prevIndex = -1;
    // Start searching backwards from the current player's index - 1
    for (let i = currentPlayerIndex - 1; i >= 0; i--) {
        if (!players[i].isSold) {
            prevIndex = i;
            break;
        }
    }
    if (prevIndex !== -1) {
        setCurrentPlayerIndex(prevIndex);
        setCurrentBid(100000);
        setLastBidder(null);
        setBidHistory([]);
    }
  };
  
  // --- AUCTION RESET ---
  const handleResetAuction = async () => {
    if (!window.confirm("Are you sure you want to reset the entire auction? All progress will be lost permanently.")) return;
    
    setIsResetting(true);
    try {
      const response = await fetch('http://localhost:8000/api/auction/reset', { method: 'POST' });
      if (!response.ok) throw new Error('Failed to reset auction on the server');
      // Instead of reloading, just refetch the initial state
      await fetchAuctionData(); 
      setCurrentPlayerIndex(0);
      setAuctionFinished(false);
    } catch (error) {
      console.error("Error resetting auction:", error);
      alert("Failed to reset auction. Please check the server.");
    } finally {
        setIsResetting(false);
    }
  };

  // --- CONTEXT VALUE ---
  const value = {
    players, teams, loading, isSelling, isResetting, justSoldToTeam,
    currentPlayerIndex, currentBid, lastBidder, auctionFinished,
    handleBid, handleUndo, handleSold, handleNextPlayer, handlePrevPlayer, handleResetAuction
  };

  return <AuctionContext.Provider value={value}>{children}</AuctionContext.Provider>;
};

// Custom hook to use the auction context
export const useAuction = () => {
  const context = useContext(AuctionContext);
  if (context === undefined) {
    throw new Error('useAuction must be used within an AuctionProvider');
  }
  return context;
};
