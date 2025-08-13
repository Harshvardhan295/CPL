import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import NET from "vanta/dist/vanta.net.min";

const VantaBackground = () => {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  useEffect(() => {
    if (!vantaEffect) {
      const effect = NET({
        el: vantaRef.current,
        THREE: THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0x3f9bff, // Line color (blue)
        backgroundColor: 0x000000, // Dark background (note: hex needs to be 6 digits)
        points: 12.0,
        maxDistance: 27.0,
        spacing: 18.0,
      });
      setVantaEffect(effect);
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div
      ref={vantaRef}
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      {/* Optional overlay content */}
      <h1 style={{ color: "white", textAlign: "center", paddingTop: "50vh" }}>
      </h1>
    </div>
  );
};

export default VantaBackground;
