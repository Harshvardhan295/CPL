import AuctionCard from "./AuctionCard.jsx";
import PlayerCard from "./PlayerCard.jsx";

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
