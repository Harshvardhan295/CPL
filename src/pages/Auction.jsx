import React from 'react';
import PlayerCard from "../components/PlayerCard.jsx";
import TeamCard from "../components/TeamCard.jsx";
import VantaBackground from "../components/VantaBackground.jsx";
import { useAuction } from '../context/AuctionContext.jsx';
import loadingGif from '../assets/loading.gif'; // Import the loading GIF

const Auction = () => {
  // Get all loading states from the context
  const { teams, players, auctionFinished, handleResetAuction, loading, isSelling, isResetting } = useAuction();

  // Determine if any loading action is in progress
  const showLoader = loading || isSelling || isResetting;

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Conditionally render the single, simple loading overlay */}
      {showLoader && (
        <div className="loader-overlay">
          <img src={loadingGif} alt="Loading..." className="loader-gif" />
        </div>
      )}

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
          // Only show this if not in the initial loading state
          !loading && <p className="text-white text-2xl">No players found on the server.</p>
        )}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4 mt-8 px-4">
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
