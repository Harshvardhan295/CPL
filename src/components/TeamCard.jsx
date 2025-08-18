import React, { useState } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "flowbite-react";

// The component now correctly expects a single 'team' object prop.
const TeamCard = ({ team }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  // Helper function to format the purse value
  const formatCurrency = (amount) => {
    if (amount >= 10000000) { // 1 Crore or more
      return { value: (amount / 10000000).toFixed(2), unit: 'Cr' };
    }
    // Less than 1 Crore (Lakhs)
    return { value: (amount / 100000).toFixed(1), unit: 'L' };
  };

  // Destructuring from the 'team' prop.
  // Fixed to use 'shortName' from your JSON and alias it as 'short'.
  const { name, shortName: short, logo, color, purse, players } = team;

  // Glow styles (no changes here)
  const glowStyle = {
    boxShadow: isHovered
      ? `inset 0 0 15px ${color}, 0 0 25px ${color}, 0 0 50px ${color}`
      : `inset 0 0 5px ${color}, 0 0 18px ${color}`,
    transform: isHovered ? "scale(1.1)" : "scale(1)",
    transition: "all 0.3s ease",
    cursor: "pointer",
  };

  // Popover hover handlers (no changes here)
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setIsHovered(true);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setIsHovered(false);
  };

  const open = Boolean(anchorEl);
  const purseFormatted = formatCurrency(purse); // Format the purse once

  return (
    <div className="p-2 w-[2.4em]">
      {/* Team Card */}
      <div
        className="relative w-28 h-28 rounded-full overflow-hidden"
        style={glowStyle}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        onContextMenu={(e) => {
          e.preventDefault();
          setOpenModal(true);
        }}
      >
        <img src={logo} alt={`${name} Logo`} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
        <span className="absolute bottom-2 w-full text-center text-white text-lg font-semibold drop-shadow-md">
          {short}
        </span>
      </div>

      {/* Popover on hover */}
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
            backgroundColor: "transparent",
            color: "white",
            boxShadow: "inset 0 0 0 2px #fff",
            borderRadius: "9999px",
            px: 1.5,
            py: 0.2,
            fontSize: "0.70rem",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          },
        }}
      >
        {/* FIXED: Typography with formatted currency and proper alignment */}
        <Typography component="div" sx={{ display: 'flex', alignItems: 'baseline', padding: '2px 4px' }}>
          Purse <b>{short}</b>:&nbsp;
          <span>{purseFormatted.value}</span>
          <span style={{ fontSize: '0.8em', marginLeft: '2px' }}>{purseFormatted.unit}</span>
        </Typography>
      </Popover>

      {/* Modal */}
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
        className="z-[9999] text-white bg-black/50 backdrop-blur-sm flex items-center justify-center pt-24"
      >
        <div className="h-[500px] w-[400px] m-auto bg-black/40 border border-white/10 rounded-xl shadow-lg p-5 flex flex-col justify-between items-center text-white font-custom">
          <ModalHeader className="text-3xl border-b rounded-t-lg flex mb-5">
            <div className="mr-32">{short}</div>
          </ModalHeader>
          <ModalBody>
            {players.length > 0 ? (
              <ul className="list-disc pl-2 space-y-1 text-1xl">
                {players.map((player, idx) => (
                  <li key={idx}>{player.name}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400">No players yet</p>
            )}
          </ModalBody>
          <ModalFooter>
             {/* FIXED: Button with formatted currency */}
            <Button color="failure" className="font-custom">
              Players - {players.length} | Purse - {purseFormatted.value} {purseFormatted.unit}
            </Button>
          </ModalFooter>
        </div>
      </Modal>
    </div>
  );
};

export default TeamCard;