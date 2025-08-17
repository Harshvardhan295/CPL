import React, { useState, useEffect } from 'react';
import PlayerCard from '../components/PlayerCard.jsx';
import TeamCard from '../components/TeamCard.jsx';

const Auction = () => {
  const [players, setPlayers] = useState([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
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
      // Access gapi from the window object
      window.gapi.client.init({
        apiKey: import.meta.env.VITE_CPL_AUCTION_APP,
        discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
      }).then(() => {
        window.gapi.client.sheets.spreadsheets.values.get({
          spreadsheetId: import.meta.env.VITE_SPREADSHEET_ID,
          range: 'Sheet1!A2:C',
        }).then((response) => {
          const data = response.result.values || [];
          const formattedPlayers = data.map((row) => ({
            id: row[0],
            name: row[1],
            stats: row[2],
          }));
          setPlayers(formattedPlayers);
        }).catch(err => console.error("Error fetching sheet data: ", err));
      }).catch(err => console.error("Error initializing GAPI client: ", err));
    };
    // Access gapi from the window object
    window.gapi.load('client:auth2', initClient);
  }, []);

  const handleBid = (teamName) => {
    let increment = 50000;
    if (currentBid >= 300000 && currentBid < 800000) {
      increment = 100000;
    } else if (currentBid >= 800000) {
      increment = 200000;
    }

    const newBid = currentBid + increment;

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
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-black">
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center">
        {auctionFinished ? (
          <div className="text-white text-5xl">Auction Finished!</div>
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
          <p className="text-white text-2xl">Loading players...</p>
        )}
        <div className="flex justify-center mt-8">
          {Object.keys(teams).map((teamName) => (
            <TeamCard
              key={teamName}
              teamName={teamName}
              logo={`src/assets/${teamName.toLowerCase()}.png`}
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