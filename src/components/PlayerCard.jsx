import React from 'react';
import './PlayerCard.css';
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { GrRevert } from "react-icons/gr";
import defaultPlayerIcon from '../assets/default-player.jpg';

const formatCurrency = (amount) => {
  if (amount >= 10000000) {
    return `${(amount / 10000000).toFixed(2)} Cr`;
  }
  return `${(amount / 100000).toFixed(1)} L`;
};

const PlayerCard = ({ player, currentBid, onUndo, onSold, onNext, onPrev }) => {
  if (!player) {
    return (
      <div className="text-5xl text-white h-[400px] w-[900px] bg-black/30 backdrop-blur-lg border border-white/20 rounded-xl p-5 flex items-center justify-center">
        Loading Player...
      </div>
    );
  }

  return (
    <div className="text-white h-[400px] w-full max-w-4xl 
      bg-black/30 backdrop-blur-lg 
      border border-white/20 rounded-2xl 
      shadow-2xl p-8
      flex items-center justify-between space-x-8">

      {/* Backward Button */}
      <button onClick={onPrev} className="p-4 rounded-full bg-white/10 hover:bg-white/20 transition duration-200">
        <SlArrowLeft size={28} />
      </button>

      {/* Main Content */}
      <div className="flex items-center space-x-8 flex-grow">
        <div className="flex-shrink-0">
          <img 
            src={player.imageUrl || defaultPlayerIcon} 
            alt={player.name}
            className="w-56 h-56 rounded-full object-cover border-4 border-cyan-400 shadow-lg"
            onError={(e) => { e.target.onerror = null; e.target.src = defaultPlayerIcon; }}
          />
        </div>
        <div className="flex flex-col flex-grow h-full justify-between text-left">
          <div>
            <div className="text-6xl font-bold font-custom tracking-wider">{player.name}</div>
            <div className="text-2xl mt-4 space-y-2 text-gray-300">
              <p><strong>Priority:</strong> {player.priority}</p>
              <p className="flex items-center"><strong>Performance:</strong> <span className="text-yellow-400 text-3xl ml-2">{player.performance}</span></p>
            </div>
          </div>
          <div className='font-custom flex items-center justify-start space-x-4 mt-6'>
            <div className="text-4xl border-2 border-gray-500 text-white px-6 py-2 rounded-full tracking-widest">
              {formatCurrency(currentBid)}
            </div>
            <button 
              onClick={onSold}
              className="text-3xl bg-green-600 text-white px-6 py-3 rounded-full tracking-widest hover:bg-green-500 transition duration-200 font-bold">
              SOLD
            </button>
            <button 
              onClick={onUndo}
              className="p-4 rounded-full bg-white/10 hover:bg-white/20 transition duration-200">
              <GrRevert size={24}/>
            </button>
          </div>
        </div>
      </div>

      {/* Forward Button */}
      <button onClick={onNext} className="p-4 rounded-full bg-white/10 hover:bg-white/20 transition duration-200">
        <SlArrowRight size={28} />
      </button>
    </div>
  );
};

export default PlayerCard;
