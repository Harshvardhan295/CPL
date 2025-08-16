import React, { useState } from 'react';
import tennisWallpaper from '../assets/tennisWallpaper.jpg';
import Squares from '../components/Squares';
import { motion } from "framer-motion";
import Trail from '../components/TrailText';
import './Screen.css'
import cricketShot from '../assets/cricketShot.png';
const MainBody = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className="relative min-h-screen overflow-hidden h-[15px]">

      <div
        className="absolute bg-cover bg-center"
        style={{
          backgroundImage: `url(${tennisWallpaper})`,

          height: "calc(100vh)",
          width: "100%",        
        }}
      />

      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <Squares
          speed={0.6}
          squareSize={30}
          direction="diagonal"
          borderColor="rgba(255,255,255,0.5)"
          hoverFillColor="rgba(255,255,255,0.4)"
        />
      </div>

      <div
        className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center"
        onClick={() => setOpen(o => !o)}
      >
        <div className='flex'>
        <div>
          <img src={cricketShot} className='imageCricket' alt="Cricket Shot" />
        </div>

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
