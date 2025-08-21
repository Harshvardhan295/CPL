import React from 'react';
import './PlayerCard.css';
// Note: react-icons imports are removed and replaced with inline SVGs below
// import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
// import { GrRevert } from "react-icons/gr";
import defaultPlayerIcon from '../assets/default-player.png';
import { useAuction } from '../context/AuctionContext.jsx';

// --- Helper Components for Icons ---

const SlArrowLeft = ({ size = 28 }) => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height={size} width={size} xmlns="http://www.w3.org/2000/svg">
    <path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8c-16.4 12.8-16.4 37.5 0 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path>
  </svg>
);

const SlArrowRight = ({ size = 28 }) => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height={size} width={size} xmlns="http://www.w3.org/2000/svg">
    <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z"></path>
  </svg>
);

const GrRevert = ({ size = 24 }) => (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height={size} width={size} xmlns="http://www.w3.org/2000/svg">
        <path fill="none" stroke="#FFF" strokeWidth="2" d="M8,3 L3,8 L8,13 M19,21 C19,15.4771525 14.5228475,11 9,11 L3,11"></path>
    </svg>
);


const formatCurrency = (amount) => {
  if (amount >= 10000000) return `${(amount / 10000000).toFixed(2)}\u00A0Cr`;
  return `${(amount / 100000).toFixed(1)}\u00A0L`;
};

const PlayerCard = () => {
  const { players, currentPlayerIndex, currentBid, lastBidder, teams, handleUndo, handleSold, handleNextPlayer, handlePrevPlayer } = useAuction();
  const player = players[currentPlayerIndex];

  let themeTeam = null;
  if (player?.isSold && player.soldToTeam) {
    themeTeam = teams[player.soldToTeam];
  } else if (lastBidder) {
    themeTeam = teams[lastBidder];
  }

  const cardStyle = {
    borderColor: themeTeam ? themeTeam.color : 'rgba(255, 255, 255, 0.2)',
    boxShadow: themeTeam ? `0 0 35px 10px ${themeTeam.color}80` : 'none',
    transition: 'all 0.4s ease-in-out',
  };

  if (!player) {
    return <div>Loading Player...</div>;
  }
  
  // Vite handles resolving paths from the /src directory when structured this way.
  // This avoids using `import.meta.url` which may not be supported in all build targets.
  const getPlayerImageUrl = (imagePath) => `/src/data/${imagePath}`;

  return (
    <div
      className="relative text-white w-full max-w-4xl bg-black/30 backdrop-blur-lg border-4 rounded-2xl p-4 md:p-8 flex flex-col md:flex-row items-center justify-between md:space-x-8"
      style={cardStyle}
    >
      {themeTeam && (
        <div
          style={{
            backgroundImage: `url(${themeTeam.logo})`,
            backgroundSize: '150%',
          }}
          className="absolute inset-0 bg-center opacity-20 blur-lg z-[-1] rounded-xl"
        ></div>
      )}

      <button onClick={handlePrevPlayer} className="absolute left-2 top-1/2 -translate-y-1/2 md:static md:translate-y-0 p-2 md:p-4 rounded-full bg-white/10 hover:bg-white/20 transition duration-200">
        <SlArrowLeft size={28} />
      </button>

      <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8 flex-grow">
        <div className="flex-shrink-0">
          <img
            src={player.img ? getPlayerImageUrl(player.img) : defaultPlayerIcon}
            alt={player.name}
            className="w-32 h-32 md:w-56 md:h-56 rounded-full object-cover border-4 shadow-lg transition-all duration-300"
            style={{ borderColor: themeTeam ? themeTeam.color : '#06b6d4' }}
            onError={(e) => { e.target.onerror = null; e.target.src = defaultPlayerIcon; }}
          />
        </div>
        <div className="flex flex-col flex-grow h-full justify-between text-center md:text-left">
          <div>
            <div className="text-4xl md:text-6xl font-bold font-custom tracking-wider">{player.name}</div>
            <div className="text-lg md:text-2xl mt-4 space-y-2 text-gray-300">
              <p><strong>Role:</strong> {player.role}</p>
              <p className="flex items-center justify-center md:justify-start"><strong>Rating:</strong> <span className="text-yellow-400 text-2xl md:text-3xl ml-2">{player.rating}</span></p>
            </div>
          </div>
          <div className='font-custom flex items-center justify-center md:justify-start space-x-2 md:space-x-4 mt-6'>
            <div className="text-2xl md:text-4xl border-2 border-gray-500 text-white px-4 py-2 rounded-full tracking-widest">{formatCurrency(currentBid)}</div>
            {player.isSold ? (
              <button disabled className="text-xl md:text-3xl bg-red-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-full tracking-widest font-bold cursor-not-allowed opacity-70">SOLD</button>
            ) : (
              <button onClick={handleSold} disabled={!lastBidder} className="text-xl md:text-3xl bg-green-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-full tracking-widest hover:bg-green-500 transition duration-200 font-bold disabled:bg-gray-500 disabled:cursor-not-allowed disabled:opacity-50">SELL</button>
            )}
            <button onClick={handleUndo} disabled={player.isSold} className="p-2 md:p-4 rounded-full bg-white/10 hover:bg-white/20 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"><GrRevert size={24}/></button>
          </div>
        </div>
      </div>

      <button onClick={handleNextPlayer} className="absolute right-2 top-1/2 -translate-y-1/2 md:static md:translate-y-0 p-2 md:p-4 rounded-full bg-white/10 hover:bg-white/20 transition duration-200">
        <SlArrowRight size={28} />
      </button>
    </div>
  );
};

export default PlayerCard;
