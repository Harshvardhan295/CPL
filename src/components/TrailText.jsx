import React from 'react';
import { useTrail, a } from '@react-spring/web';
import './trailStyles.css';

const Trail = ({ open, items }) => {
  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: open ? 1 : 0,
    x: open ? 0 : 20,
    height: open ? 60 : 0,
    from: { opacity: 0, x: 20, height: 0 },
  });

  return (
    <div className="trail-container">
      {trail.map(({ height, ...style }, index) => (
        <a.div key={index} className="trail-text" style={style}>
          <a.div style={{ height }}>{items[index]}</a.div>
        </a.div>
      ))}
    </div>
  );
};

export default Trail;
