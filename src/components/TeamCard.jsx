import React, { useState } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import { useAuction } from "../context/AuctionContext.jsx";

const TeamCard = ({ team }) => {
  const { handleBid, justSoldToTeam } = useAuction();
  const [isHovered, setIsHovered] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const { name, shortName, logo, color, purse, players } = team;

  const isSoldToThisTeam = justSoldToTeam === team.shortName;

  const glowStyle = {
    boxShadow: isHovered
      ? `inset 0 0 15px ${color}, 0 0 25px ${color}, 0 0 50px ${color}`
      : `inset 0 0 5px ${color}, 0 0 18px ${color}`,
    transform: isHovered ? "scale(1.1)" : "scale(1)",
    transition: "all 0.3s ease",
    cursor: "pointer",
  };

  const handlePopoverOpen = (event) => {
    setIsHovered(true);
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setIsHovered(false);
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  return (
    <div className="flex flex-col items-center p-2">
      <div
        className={`relative w-20 h-20 sm:w-28 sm:h-28 rounded-full overflow-hidden ${
          isSoldToThisTeam ? "sold-glow" : ""
        }`}
        style={glowStyle}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        onClick={() => handleBid(team.shortName)}
        onContextMenu={(e) => {
          e.preventDefault();
          setOpenModal(true);
        }}
      >
        <img src={logo} alt={`${name} Logo`} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
        <span className="absolute bottom-2 right-[1px] w-full text-center text-white text-sm sm:text-lg font-semibold drop-shadow-md">
          {shortName}
        </span>
      </div>

      {/* Popover for purse */}
      <Popover
        id="mouse-over-popover"
        sx={{ pointerEvents: "none" }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        transformOrigin={{ vertical: "bottom", horizontal: "center" }}
        onClose={handlePopoverClose}
        disableRestoreFocus
        PaperProps={{
          sx: {
            backgroundColor: "rgba(0,0,0,0.7)",
            color: "white",
            border: `1px solid ${color}`,
            borderRadius: "8px",
            padding: "8px 12px",
            fontSize: "0.8rem",
          },
        }}
      >
        <Typography>
          Purse: <b>{(purse / 100000).toFixed(1)} L</b>
        </Typography>
      </Popover>

      {/* Blurry dark backdrop when modal is open */}
      {openModal && (
        <div
          className="fixed inset-0 z-[9998]"
          style={{
            background: "rgba(20, 20, 20, 0.7)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            pointerEvents: "auto",
            transition: "background 0.3s",
          }}
        />
      )}

      <Modal
        show={openModal}
        onClose={() => setOpenModal(false)}
        popup
        size="md"
      >
        <div
          className="bg-gray-900 border border-gray-600 rounded-lg shadow-lg text-white flex flex-col"
          style={{
            width: "min(90vw, 360px)", // 9:16 aspect ratio
            height: "min(90vh, 640px)",
            aspectRatio: "9/16",
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 9999,
          }}
        >
          <ModalHeader className="border-b border-gray-600 text-white">
            <div className="flex items-center gap-4">
              <img src={logo} alt={name} className="w-10 h-10" />
              <span className="text-white font-bold">{name}</span>
            </div>
          </ModalHeader>

          <ModalBody className="flex-1 overflow-y-auto px-4 py-2">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-100">Players:</h3>
              {players.length > 0 ? (
                <ul className="list-disc list-inside text-gray-300">
                  {players.map((player, idx) => (
                    <li key={idx}>{player.name || player}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400">No players yet</p>
              )}
            </div>
          </ModalBody>

          <ModalFooter className="border-t border-gray-600">
            <div className="w-full text-center font-bold text-lg text-white">
              Purse Remaining: {(purse / 100000).toFixed(1)} L
            </div>
          </ModalFooter>
        </div>
      </Modal>
    </div>
  );
};

export default TeamCard;
