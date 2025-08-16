import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import { interpolate } from "@popmotion/popcorn";

// Styled components
const Container = styled.div`
  border-radius: 8px;
  transform-style: preserve-3d;
  transform: perspective(921px);
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  margin: 2rem;
`;

const Content = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  transform-style: preserve-3d;
  perspective: 800px;
  backface-visibility: hidden;
`;

const Shadow = styled.div`
  position: absolute;
  top: 5%;
  left: 5%;
  width: 90%;
  height: 90%;
  border-radius: 1rem;
  transition: all 0.2s ease-out;
  box-shadow: rgba(0, 0, 0, 0.6) 0px 50px 100px -30px;
`;

const RelativeContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  overflow: hidden;
  transform-style: preserve-3d;
  perspective: 800px;
  backface-visibility: hidden;
`;

const Image = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-size: cover;
  background-position: center;
  border-radius: 1rem;
`;

const Gradient = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: all 0.5s ease;
`;

export default function AuctionCard({
  height = 400,
  width = 300,
  imageUrl = "https://i.pinimg.com/736x/c8/15/9a/c8159a22643301a1bf05aa548057e7c3.jpg",
}) {
  const ref = useRef(null);
  const [hover, setHover] = useState(false);
  const [tapped, setTapped] = useState(false);

  const centerPoint = [width / 2, height / 2];
  const xy = useMotionValue(centerPoint);
  const tx = 0.05;

  const transformX = interpolate([0, width], [width * tx, width * tx * -1]);
  const rotateY = useTransform(xy, ([x]) => transformX(x));

  const transformY = interpolate([0, height], [height * tx * -1, height * tx]);
  const rotateX = useTransform(xy, ([, y]) => transformY(y));

  const config = { stiffness: 150, damping: 20 };
  const springX = useSpring(rotateX, config);
  const springY = useSpring(rotateY, config);

  const gradientOpacity = useTransform(xy, ([, y]) =>
    interpolate([0, height], [0, 0.3])(y)
  );
  const gradientOpacitySpring = useSpring(gradientOpacity, config);

  const gradient = useTransform(gradientOpacitySpring, (opacity) => {
    let [x, y] = xy.get();
    if (y === centerPoint[1]) y = centerPoint[1] + 1;

    const angle = Math.atan2(y - centerPoint[1], x - centerPoint[0]);
    const degree =
      ((angle > 0 ? angle : 2 * Math.PI + angle) * 360) / (2 * Math.PI) - 90;

    return `linear-gradient(${degree}deg, rgba(255,255,255,${opacity}), rgba(255,255,255,0) 80%)`;
  });

  function onMouseOver(e) {
    if (tapped) return;
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    xy.set([e.clientX - rect.left, e.clientY - rect.top]);
  }

  useEffect(() => {
    if (!hover) {
      xy.set(centerPoint);
    }
  }, [hover, centerPoint, xy]);

  return (
    <Container ref={ref} width={width} height={height} className="flex justify-center" >
      <Content
        style={{ rotateX: springX, rotateY: springY }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onHoverStart={() => setHover(true)}
        onHoverEnd={() => setHover(false)}
        onMouseMove={onMouseOver}
        onTapStart={() => setTapped(true)}
        onTapCancel={(e) => {
          setTapped(false);
          onMouseOver(e);
        }}
        onTap={() => setTapped(false)}
      >
        <Shadow />
        <RelativeContainer>
          <Image style={{ backgroundImage: `url(${imageUrl})` }} />
        </RelativeContainer>
        <Gradient style={{ background: gradient }} />
      </Content>
    </Container>
  );
}
