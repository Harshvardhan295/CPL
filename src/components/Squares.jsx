import { useRef, useEffect } from 'react';
import './Squares.css';

const Squares = ({
  direction = 'right',
  speed = 1,
  borderColor = '#999',
  squareSize = 40,
  hoverFillColor = '#222',
  className = ''
}) => {
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);
  const gridOffset = useRef({ x: 0, y: 0 });
  const mousePos = useRef({ x: -1, y: -1 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let speedX = 0;
    let speedY = 0;

    // Determine movement direction based on props
    const effectiveSpeed = Math.max(speed, 0.1);
    switch (direction) {
      case 'right': speedX = -effectiveSpeed; break;
      case 'left': speedX = effectiveSpeed; break;
      case 'up': speedY = effectiveSpeed; break;
      case 'down': speedY = -effectiveSpeed; break;
      case 'diagonal':
        speedX = -effectiveSpeed / Math.sqrt(2);
        speedY = -effectiveSpeed / Math.sqrt(2);
        break;
      default: break;
    }

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    const drawGrid = () => {
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);
      ctx.save();
      
      // Translate the canvas origin based on the animated offset
      ctx.translate(gridOffset.current.x, gridOffset.current.y);
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = 1;

      // Draw vertical lines
      for (let x = 0; x < width + squareSize; x += squareSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height + squareSize);
        ctx.stroke();
      }

      // Draw horizontal lines
      for (let y = 0; y < height + squareSize; y += squareSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width + squareSize, y);
        ctx.stroke();
      }
      
      // Draw hovered square if mouse is over the canvas
      if (mousePos.current.x > 0 && mousePos.current.y > 0) {
        const hoverX = Math.floor((mousePos.current.x - gridOffset.current.x) / squareSize) * squareSize;
        const hoverY = Math.floor((mousePos.current.y - gridOffset.current.y) / squareSize) * squareSize;
        ctx.fillStyle = hoverFillColor;
        ctx.fillRect(hoverX, hoverY, squareSize, squareSize);
      }

      ctx.restore();
    };

    const animate = () => {
      // Update the grid offset for movement
      gridOffset.current.x += speedX;
      gridOffset.current.y += speedY;

      // Wrap the offset to create a seamless loop
      if (Math.abs(gridOffset.current.x) > squareSize) gridOffset.current.x %= squareSize;
      if (Math.abs(gridOffset.current.y) > squareSize) gridOffset.current.y %= squareSize;

      drawGrid();
      animationFrameId.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      mousePos.current.x = event.clientX - rect.left;
      mousePos.current.y = event.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mousePos.current = { x: -1, y: -1 };
    };

    // Initial setup
    resizeCanvas();
    animate();

    // Event listeners
    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId.current);
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [direction, speed, borderColor, hoverFillColor, squareSize]);

  return <canvas ref={canvasRef} className={`squares-canvas ${className}`}></canvas>;
};

export default Squares;
