import React, { useState } from 'react';
import tennisWallpaper from '../assets/tennisWallpaper.jpg';
import Squares from '../components/Squares.jsx';
import { motion } from "framer-motion";
import Trail from '../components/TrailText';
import './Screen.css'
import cricketShot from '../assets/cricketShot.png';
import { useNavigate } from 'react-router-dom';
import loadingGif from '../assets/loading.gif';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const goToAuction = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/auction');
    }, 1500);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background elements */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url(${tennisWallpaper})`,
          height: "100vh",
          width: "100%",
        }}
      />
      <div className="absolute inset-0 opacity-40 pointer-events-none z-0">
        <Squares
          speed={0.6}
          squareSize={30}
          direction="diagonal"
          borderColor="rgba(255,255,255,0.5)"
          hoverFillColor="rgba(255,255,255,0.4)"
        />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4 md:p-8">
        <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-7xl mx-auto gap-4">
          
          {/* Left Side: Animated Text */}
          <div className="md:w-1/2 l-14 w-full flex justify-center md:justify-start">
            <Trail open={open} items={['THE', 'CAMPUS', 'PREMIER', 'LEAGUE', '2025']} />
          </div>

          {/* Right Side: Image and Button */}
          <div className="md:w-1/2 w-full flex flex-col items-center justify-center mt-8 md:mt-0">
            <img 
              src={cricketShot} 
              className='imageCricket w-auto h-auto max-h-[40vh] max-w-[200px] sm:max-w-xs md:max-w-sm' 
              alt="Cricket Shot" 
            />
            <motion.div
              className="mt-8 h-[60px] w-[220px] sm:h-[70px] sm:w-[240px] cursor-pointer rounded-[50px] bg-[#00ccff] flex items-center justify-center text-white font-bold text-xl sm:text-2xl"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              onClick={goToAuction}
            >
              Start Auction
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Loading GIF Overlay */}
      {loading && (
        <div className="loader-overlay">
          <img src={loadingGif} alt="Loading..." className="loader-gif" />
        </div>
      )}
    </div>
  );
};

export default Home;
