import React, { useState } from 'react';
import tennisWallpaper from '../assets/tennisWallpaper.jpg';
import Squares from '../components/Squares';
import { motion } from "framer-motion";
import Trail from '../components/TrailText';
import './Screen.css'
const MainBody = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className="relative min-h-screen overflow-hidden h-[15px]">

      {/* Background image */}
      <div
        className="absolute bg-cover bg-center"
        style={{
          backgroundImage: `url(${tennisWallpaper})`,

          height: "calc(100vh)", // fill remaining height
          width: "100%",          // full width
        }}
      />


      {/* Transparent Squares above background */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <Squares
          speed={0.6}
          squareSize={30}
          direction="diagonal"
          borderColor="rgba(255,255,255,0.5)" // transparent white border
          hoverFillColor="rgba(255,255,255,0.4)" // transparent fill on hover
        />
      </div>

      <div
        className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center"
        onClick={() => setOpen(o => !o)}
      >
        <div className='flex'>
           <div className='clickmefuncitonbutton'>

              <motion.div
                className="mb-8 h-[80px] w-[200px] cursor-pointer rounded-[50px] bg-[#00ccff] flex items-center justify-center text-white font-bold"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                Click Me
              </motion.div>
           </div>

            <Trail open={true} items={['THE','CAMPUS', 'PREMIER', 'LEAGUE','2025']} />

        </div>
       
      </div>
    </div>
  );
};

export default MainBody;
