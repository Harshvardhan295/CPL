import React from 'react';
import PlayerCard from "../components/PlayerCard.jsx";
import TeamCard from "../components/TeamCard.jsx";
import VantaBackground from "../components/VantaBackground.jsx";
import { useAuction } from '../context/AuctionContext.jsx';

const Auction = () => {
  // Get the new 'loading' state from the context
  const { teams, players, auctionFinished, handleResetAuction, loading } = useAuction();

  // --- NEW: Show a loading screen while fetching data from the backend ---
  if (loading) {
    return (
      <div className="relative min-h-screen w-full flex items-center justify-center bg-gray-900">
        <VantaBackground />
        <div className="text-center z-10">
            <p className="text-white text-3xl font-bold">Connecting to Server...</p>
            <p className="text-gray-400 text-xl mt-2">Loading Auction Data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <VantaBackground />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center pt-10 pb-10">
        {auctionFinished ? (
          <div className="text-center">
            <h1 className="text-white text-5xl font-bold mb-8">Auction Finished!</h1>
            <button 
              onClick={handleResetAuction}
              className="text-2xl bg-blue-600 text-white px-6 py-3 rounded-full tracking-widest hover:bg-blue-500 transition duration-200 font-bold"
            >
              Reset Auction
            </button>
          </div>
        ) : players.length > 0 ? (
          <PlayerCard />
        ) : (
          <p className="text-white text-2xl">No players found on the server.</p>
        )}
        <div className="flex flex-wrap justify-center items-center mt-8 gap-x-20 gap-y-4 px-4">
          {Object.keys(teams).map((teamShortName) => (
            <TeamCard
              key={teamShortName}
              team={teams[teamShortName]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Auction;