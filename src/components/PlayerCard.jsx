import React from 'react';
import './PlayerCard.css';
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { GrRevert } from "react-icons/gr";
import defaultPlayerIcon from '../assets/default-player.png';
import { useAuction } from '../context/AuctionContext.jsx';

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
            src={player.img || defaultPlayerIcon}
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