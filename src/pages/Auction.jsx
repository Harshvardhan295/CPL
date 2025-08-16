import AuctionCardTotal from "../components/AuctionCardTotal"; // Ensure correct file name casing
import VantaBackground from "../components/VantaBackground.jsx";
export default function Auction() {
  return (
    <div
      style={{
        position: "relative",
        height: "92.5vh",
        width: "100%",
        overflow: "hidden",
      }}
    >
      {/* Background */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      >
        <VantaBackground />
      </div>

      {/* Foreground content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          height: "100%",
          padding: "2rem",
          marginLeft: "10px",
        }}
      >
        <div className="flex">
          <AuctionCardTotal />
        </div>
      </div>
    </div>
  );
}