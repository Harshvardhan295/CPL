import React, { useState, useEffect } from 'react';
import PlayerCard from '../components/PlayerCard.jsx';
import TeamCard from '../components/TeamCard.jsx';

const Auction = () => {
  const [players, setPlayers] = useState([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [apiError, setApiError] = useState(null);
  const [teams, setTeams] = useState({
    RCB: { purse: 10000000, players: [] },
    MI: { purse: 10000000, players: [] },
    CSK: { purse: 10000000, players: [] },
    SRH: { purse: 10000000, players: [] },
    DC: { purse: 10000000, players: [] },
    KKR: { purse: 10000000, players: [] },
    PBKS: { purse: 10000000, players: [] },
  });
  const [currentBid, setCurrentBid] = useState(100000);
  const [lastBidder, setLastBidder] = useState(null);
  const [bidHistory, setBidHistory] = useState([]);
  const [auctionFinished, setAuctionFinished] = useState(false);

  useEffect(() => {
    const initClient = () => {
      window.gapi.client.init({
        apiKey: import.meta.env.VITE_CPL_AUCTION_APP,
        discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
      }).then(() => {
        window.gapi.client.sheets.spreadsheets.values.get({
          spreadsheetId: import.meta.env.VITE_SPREADSHEET_ID,
          range: import.meta.env.VITE_SHEET_RANGE,
        }).then((response) => {
          const data = response.result.values || [];
          const formattedPlayers = data.map((row) => ({
            // Correctly mapping to the columns from your sheet
            id: row[0] || 'N/A',                 // Column C: Email Address
            name: row[0] || 'Unknown Player',    // Column D: Full Name
            priority: row[5] || '-',             // Column H: Priority for Auction
            imageUrl: row[6] || '',              // Column I: Profile Image URL
            performance: row[7] || 'N/A',        // Column J: Rate Your Performance
          }));
          if (formattedPlayers.length === 0) {
              setApiError("No players found. Please check the sheet name and range in the .env file.");
          }
          setPlayers(formattedPlayers);
        }).catch(err => {
            console.error("Error fetching sheet data: ", err.result.error.message);
            setApiError(`Failed to fetch data: ${err.result.error.message}. Check Sheet Name, API Key, and Sharing settings.`);
        });
      }).catch(err => {
          console.error("Error initializing GAPI client: ", err);
          setApiError("Failed to initialize Google API. Check your API Key.");
      });
    };
    if (window.gapi) {
        window.gapi.load('client:auth2', initClient);
    } else {
        setApiError("Google API script not loaded. Check internet connection and index.html.");
    }
  }, []);

  const handleBid = (teamName) => {
    if (auctionFinished) return;
    let increment = 50000;
    if (currentBid >= 800000) {
      increment = 200000;
    } else if (currentBid >= 300000) {
      increment = 100000;
    }
    const newBid = currentBid + increment;
    if (newBid > 10000000) {
        alert("Bid cannot exceed 1 crore.");
        return;
    }
    if (teams[teamName].purse >= newBid) {
      setBidHistory([...bidHistory, { team: lastBidder, amount: currentBid }]);
      setCurrentBid(newBid);
      setLastBidder(teamName);
    } else {
      alert(`${teamName} does not have enough purse to place this bid.`);
    }
  };

  const handleUndo = () => {
    if (bidHistory.length > 0) {
      const lastBid = bidHistory.pop();
      setCurrentBid(lastBid.amount);
      setLastBidder(lastBid.team);
      setBidHistory([...bidHistory]);
    }
  };

  const handleSold = () => {
    if (lastBidder && players[currentPlayerIndex]) {
      const newTeams = { ...teams };
      newTeams[lastBidder].purse -= currentBid;
      newTeams[lastBidder].players.push(players[currentPlayerIndex]);
      setTeams(newTeams);
      if (currentPlayerIndex < players.length - 1) {
        setCurrentPlayerIndex(currentPlayerIndex + 1);
        setCurrentBid(100000);
        setLastBidder(null);
        setBidHistory([]);
      } else {
        setAuctionFinished(true);
      }
    }
  };
  
  const handleNextPlayer = () => {
    if (currentPlayerIndex < players.length - 1) {
      setCurrentPlayerIndex(currentPlayerIndex + 1);
    }
  };

  const handlePrevPlayer = () => {
    if (currentPlayerIndex > 0) {
      setCurrentPlayerIndex(currentPlayerIndex - 1);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center pt-10">
        {apiError ? (
            <div className="text-red-500 text-2xl bg-white/10 p-8 rounded-lg">
                <p>Error:</p>
                <p>{apiError}</p>
            </div>
        ) : auctionFinished ? (
          <div className="text-white text-5xl font-bold">Auction Finished!</div>
        ) : players.length > 0 ? (
          <PlayerCard
            player={players[currentPlayerIndex]}
            currentBid={currentBid}
            onUndo={handleUndo}
            onSold={handleSold}
            onNext={handleNextPlayer}
            onPrev={handlePrevPlayer}
          />
        ) : (
          <p className="text-white text-2xl">Loading players from Google Sheet...</p>
        )}
        <div className="flex flex-wrap justify-center mt-8">
          {Object.keys(teams).map((teamName) => (
            <TeamCard
              key={teamName}
              teamName={teamName}
              logo={`/src/assets/${teamName.toLowerCase()}.png`}
              onBid={() => handleBid(teamName)}
              players={teams[teamName].players}
              purse={teams[teamName].purse}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Auction;