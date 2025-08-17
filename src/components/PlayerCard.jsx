import React from 'react';
import './PlayerCard.css';
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { GrRevert } from "react-icons/gr";
import defaultPlayerIcon from '../assets/default-player.jpg'; // Using cricketShot as a default image

// Helper to format currency
const formatCurrency = (amount) => {
  if (amount >= 10000000) {
    return `${(amount / 10000000).toFixed(2)} Cr`;
  }
  return `${(amount / 100000).toFixed(1)} L`;
};

const PlayerCard = ({ player, currentBid, onUndo, onSold, onNext, onPrev }) => {
  if (!player) {
    return (
      <div className="text-5xl text-white h-[400px] w-[900px] bg-white/20 backdrop-blur-lg border border-white/30 rounded-xl p-5 flex items-center justify-center">
        Loading Player...
      </div>
    );
  }

  return (
    <div className="text-white h-[400px] w-[900px] 
      bg-white/20 backdrop-blur-lg 
      border border-white/30 rounded-xl 
      shadow-[0_0_40px_rgba(255,255,255,0.3),0_0_80px_rgba(173,216,230,0.4)] p-8
      flex items-center justify-between space-x-8">

      {/* Backward Button */}
      <div className="cursor-pointer" onClick={onPrev}>
        <button className="shadow-[inset_0_0_0_2px_#616467] text-white p-4 rounded-full bg-transparent hover:bg-[#616467] transition duration-200">
          <SlArrowLeft size={28} />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex items-center space-x-8 flex-grow">
        {/* Left Side: Player Image */}
        <div className="flex-shrink-0">
          <img 
            src={player.imageUrl || defaultPlayerIcon} 
            alt={player.name}
            className="w-56 h-56 rounded-full object-cover border-4 border-cyan-400 shadow-lg"
            onError={(e) => { e.target.onerror = null; e.target.src = defaultPlayerIcon; }}
          />
        </div>

        {/* Right Side: Player Details and Bidding */}
        <div className="flex flex-col flex-grow h-full justify-between text-left">
          <div>
            <div className="text-6xl font-bold font-custom tracking-wider">{player.name}</div>
            <div className="text-2xl mt-4 space-y-2">
              <p><strong>Priority:</strong> {player.priority}</p>
              <p className="flex items-center"><strong>Performance:</strong> <span className="text-yellow-400 text-3xl ml-2">{player.performance}</span></p>
            </div>
          </div>
          
          <div className='font-custom flex items-center justify-start space-x-4'>
            <div className="text-4xl shadow-[inset_0_0_0_2px_#616467] text-white px-6 py-2 rounded-full tracking-widest uppercase bg-transparent">
              {formatCurrency(currentBid)}
            </div>
            
            <button 
              onClick={onSold}
              className="text-3xl shadow-[inset_0_0_0_2px_#616467] text-white px-6 py-2 rounded-full tracking-widest uppercase bg-transparent hover:bg-green-500 transition duration-200">
              Sold
            </button>

            <button 
              onClick={onUndo}
              className="shadow-[inset_0_0_0_2px_#616467] text-white p-4 rounded-full tracking-widest uppercase bg-transparent hover:bg-[#616467] transition duration-200">
              <GrRevert size={24}/>
            </button>
          </div>
        </div>
      </div>

      {/* Forward Button */}
      <div className="cursor-pointer" onClick={onNext}>
        <button className="shadow-[inset_0_0_0_2px_#616467] text-white p-4 rounded-full bg-transparent hover:bg-[#616467] transition duration-200">
          <SlArrowRight size={28} />
        </button>
      </div>
    </div>
  );
};

export default PlayerCard;