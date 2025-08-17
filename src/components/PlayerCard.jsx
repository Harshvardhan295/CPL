import React from 'react';
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { GrRevert } from "react-icons/gr";

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
      <div className="text-5xl text-white h-[500px] w-[900px] bg-white/20 backdrop-blur-lg border border-white/30 rounded-xl p-5 flex items-center justify-center">
        Loading Player...
      </div>
    );
  }

  // Split name for styling if desired
  const nameParts = player.name.split(' ');
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(' ');

  return (
    <div className="text-5xl text-white h-[500px] w-[900px] 
      bg-white/20 backdrop-blur-lg 
      border border-white/30 rounded-xl 
      shadow-[0_0_40px_rgba(255,255,255,0.3),0_0_80px_rgba(173,216,230,0.4)] p-5
      flex flex-col justify-between">

      {/* Player Info */}
      <div className="flex w-full items-center text-center">
        <div className="cursor-pointer" onClick={onPrev}>
          <button className="shadow-[inset_0_0_0_2px_#616467] text-black p-4 rounded-full bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200">
            <SlArrowLeft size={28} />
          </button>
        </div>

        <div className="nameInBox flex flex-col items-center justify-center flex-1">
          <div className="text-6xl font-bold">{firstName} <span className="font-light">{lastName}</span></div>
          <div className="text-3xl mt-2">{player.stats}</div>
        </div>

        <div className="cursor-pointer" onClick={onNext}>
          <button className="shadow-[inset_0_0_0_2px_#616467] text-black p-4 rounded-full bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200">
            <SlArrowRight size={28} />
          </button>
        </div>
      </div>

      {/* Bidding Controls */}
      <div className='font-custom text-center p-1 flex items-center justify-evenly'>
        <div className="text-4xl shadow-[inset_0_0_0_2px_#616467] text-black px-6 m-2 py-2 rounded-full tracking-widest uppercase bg-transparent">
          {formatCurrency(currentBid)}
        </div>
        
        <button 
          onClick={onSold}
          className="text-3xl shadow-[inset_0_0_0_2px_#616467] text-black px-4 py-2 rounded-full tracking-widest uppercase bg-transparent hover:bg-green-500 hover:text-white dark:text-neutral-200 transition duration-200">
          Sold
        </button>

        <button 
          onClick={onUndo}
          className="shadow-[inset_0_0_0_2px_#616467] text-black ml-2 px-3 py-3 rounded-full tracking-widest uppercase bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200">
          <GrRevert size={24}/>
        </button>
      </div>
    </div>
  );
};

export default PlayerCard;