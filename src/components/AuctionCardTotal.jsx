import AuctionCard from "../components/auctionCard.jsx";
import PlayerCard from "./PlayerCard.jsx";
import React from "react";

const AuctionCardTotal = () => {
  return (
    <>
      <div className="flex">
        <AuctionCard height={450} width={350} />
        <PlayerCard height={450} width={350} />
      </div>
      
    </>
        
  );
};

export default AuctionCardTotal;
