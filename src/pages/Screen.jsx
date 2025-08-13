import React from 'react';
import LetterGlitch from '../components/LetterGlitch';
import tennisWallpaper from '../assets/tennisWallpaper.jpg'
import Squares from '../components/Squares';

const MainBody = () => {
  return (
    <div
  className="min-h-screen bg-cover bg-center bg-fixed"
  style={{ backgroundImage: `url(${tennisWallpaper})` }}
    >
      <Squares 
        speed={0.5} 
        squareSize={40}
        direction='diagonal' 
        borderColor='#aaa'
        hoverFillColor='#111'
      />
      <h1 className="text-white text-3xl p-10"></h1>
    </div>

  );
};

export default MainBody;
