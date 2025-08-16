import React, { useState } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "flowbite-react";

const TeamCard = ({ glowColor = "red", teamName = "RCB", logo }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const srcc = logo || "src/assets/csk.png";

  // Example players list
  const players = [
    "Virat Kohli",
    "Faf du Plessis",
    "Glenn Maxwell",
    "Mohammed Siraj",
    "Mohammed Siraj",
    "Mohammed Siraj",
    "Mohammed Siraj",
    "Mohammed Siraj",
    "Mohammed Siraj",
    "Mohammed Siraj",
    "Mohammed Siraj",
  ];

  // Glow styles
  const glowStyle = {
    boxShadow: isHovered
      ? `inset 0 0 15px ${glowColor}, 0 0 25px ${glowColor}, 0 0 50px ${glowColor}`
      : `inset 0 0 5px ${glowColor}, 0 0 18px ${glowColor}`,
    transform: isHovered ? "scale(1.1)" : "scale(1)",
    transition: "all 0.3s ease",
    cursor: "pointer",
  };

  // Popover hover handlers
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setIsHovered(true);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setIsHovered(false);
  };

  const open = Boolean(anchorEl);

  return (
    <div className="p-2 w-[2.4em]">
      {/* Team Card */}
      <div
        className="relative w-28 h-28 rounded-full overflow-hidden"
        style={glowStyle}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        onContextMenu={(e) => {
    e.preventDefault(); // prevent browser default right-click menu
    setOpenModal(true);
  }}// open modal on click
      >
        {/* Logo Image */}
        <img src={srcc} alt={`${teamName} Logo`} className="w-full h-full object-cover" />

        {/* Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

        {/* Team Name */}
        <span className="absolute bottom-2 w-full text-center text-white text-lg font-semibold drop-shadow-md">
          {teamName}
        </span>
      </div>

      {/* Popover on hover */}
      <Popover
        id="mouse-over-popover"
        sx={{ pointerEvents: "none" }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
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
            transition: "all 0.2s ease",
          },
        }}
      >
        <Typography>
          Purse <b>{teamName}</b>
        </Typography>
      </Popover>

      {/* Modal on click */}
<Modal
  show={openModal}
  size="md"
  onClose={() => setOpenModal(false)}
  popup
  className="z-[9999] text-white bg-black/50 backdrop-blur-sm flex items-center justify-center pt-24" 
>
  <div
    className="h-[500px] w-[400px] m-auto

      bg-black/40 backdrop-blur-2 
      border border-white/10 rounded-xl 
      shadow-[0_0_40px_rgba(25,25,25,0.3),0_0_80px_rgba(173,216,230,0.4)] p-5
      flex flex-col justify-between items-center text-white font-custom"
  >
    <ModalHeader className=" text-3xl  border-b  rounded-t-lg flex mb-5">
      <div className="mr-32 text-3xl ">{teamName} </div>
    </ModalHeader>
    <ModalBody>
      <ul className="list-disc pl-2 space-y-1 text-1xl">
        {players.map((player, idx) => (
          <li key={idx}>{player}</li>
        ))}
      </ul>
    </ModalBody>
    <ModalFooter>
      <Button
        color="failure"
        className="font-custom"
      >
        Player- 6 | Team Purse- 60L
      </Button>
    </ModalFooter>
  </div>
</Modal>






    </div>
  );
};

export default TeamCard;
