import React, { useState } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";

const TeamCard = ({ glowColor = "red", teamName = "RCB", logo }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const srcc = logo || "src/assets/csk.png";

  // Dynamic glow styles
  const glowStyle = {
    boxShadow: isHovered
      ? `
        inset 0 0 15px ${glowColor},
        0 0 25px ${glowColor},
        0 0 50px ${glowColor}
      `
      : `
        inset 0 0 5px ${glowColor},
        0 0 18px ${glowColor}
      `,
    transform: isHovered ? "scale(1.1)" : "scale(1)",
    transition: "all 0.3s ease",
  };

  // Handle Popover
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
      <div
        className="relative w-28 h-28 rounded-full overflow-hidden"
        style={glowStyle}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        {/* Logo Image */}
        <img
          src={srcc}
          alt={`${teamName} Logo`}
          className="w-full h-full object-cover"
        />

        {/* Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

        {/* Team Name */}
        <span className="absolute bottom-2 w-full text-center text-white text-lg font-semibold drop-shadow-md">
          {teamName}
        </span>
      </div>

      {/* Popover */}
<Popover
  id="mouse-over-popover"
  sx={{ pointerEvents: "none" }}
  open={open}
  anchorEl={anchorEl}
  anchorOrigin={{
    vertical: "top",     // anchor from the top of the image
    horizontal: "center",
  }}
  transformOrigin={{
    vertical: "bottom",  // popover grows upward
    horizontal: "center",
  }}
  onClose={handlePopoverClose}
  disableRestoreFocus
  PaperProps={{
    sx: {
      backgroundColor: "transparent",         // transparent background
      color: "white",                         // white text
      boxShadow: "inset 0 0 0 2px #fff",   // inset border effect
      borderRadius: "9999px",                 // fully rounded (like a pill)
      px: 1.5,
      py: 0.2,
      fontSize: "0.70rem",                    // smaller text
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


    </div>
  );
};

export default TeamCard;
