import React from 'react';
import './Matrix.css';
import './PlayerCard.css';
import TeamCard from './TeamCard'
import './soldbutton.css'
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { GrRevert } from "react-icons/gr";
import { GrAdd } from "react-icons/gr";
import { CiSearch } from "react-icons/ci";



const PlayerCard = () => {
  return (
    <div className="text-5xl text-white h-[500px] w-[900px] 
      bg-white/20 backdrop-blur-lg 
      border border-white/30 rounded-xl 
      shadow-[0_0_40px_rgba(255,255,255,0.3),0_0_80px_rgba(173,216,230,0.4)] p-5
      flex flex-col justify-between">


<div className="flex w-full items-center text-center">
  {/* Left Arrow */}
  <div className="cursor-pointer">
    <button className="shadow-[inset_0_0_0_2px_#616467] text-black pr-5 px-4 py-4 rounded-full bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200">
      <SlArrowLeft size={28} />
    </button>
  </div>

  {/* Center Content */}
  <div className="nameInBox flex flex-col items-center justify-center flex-1">
    <div className="firstName font-custom text-center">Virat <b>Kohli</b></div>
    <div className="preference font-custom flex text-center">Batsman <span>⭐⭐⭐⭐</span></div>
  </div>

  {/* Right Arrow */}
  <div className="cursor-pointer">
    <button className="shadow-[inset_0_0_0_2px_#616467] text-black pl-5 px-4 py-4 rounded-full bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200">
      <SlArrowRight size={28} />
    </button>
  </div>
</div>



      <div className="teams flex justify-between ">
        <TeamCard teamName='KKR' glowColor="purple" logo={'src/assets/kkr.png'}/>
        <TeamCard teamName='CSK' glowColor="yellow" logo={'src/assets/csk.png'}/>
        <TeamCard teamName='RCB' glowColor="black" logo={'src/assets/rcb.png'}/>
        <TeamCard teamName='SRH' glowColor="red" logo={'src/assets/srh.png'}/>
        <TeamCard teamName='DC' glowColor="white" logo={'src/assets/dc.jpg'}/>
        <TeamCard teamName='RCB' glowColor="red" logo={'src/assets/rcb.png'}/>
        <TeamCard teamName='MI' glowColor="skyblue" logo={'src/assets/mi.png'}/>
      </div>

      {/* Glitch Button */}
      <div className=' font-custom text-center p-1 flex align-center justify-center items-center justify-evenly'>
        <button className="shadow-[inset_0_0_0_2px_#616467] text-black px-6 m-2 py-2 rounded-full tracking-widest uppercase bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200">
          ₹55.2L
        </button>
        <button className="shadow-[inset_0_0_0_2px_#616467] text-black px-4 py-2 rounded-full tracking-widest uppercase bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200">
          Bid
        </button>
        <button className="shadow-[inset_0_0_0_2px_#616467] text-black px-4 py-2 rounded-full tracking-widest uppercase bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200">
          Sold</button>
        <button className="shadow-[inset_0_0_0_2px_#616467] text-black ml-2 px-2 py-2 rounded-full tracking-widest uppercase bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200">
          <GrRevert />
        </button>
        <button className="shadow-[inset_0_0_0_2px_#616467] text-black px-2 py-2 rounded-full tracking-widest uppercase bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200">
          <CiSearch />
        </button>

      </div>
      
    </div>
  );
};

export default PlayerCard;
