import React from "react";
import { styled, keyframes } from "../../styled-components";
import BunnyIcon from "../Svg/Icons/Logo";
import { BunnyProps, FallingBunniesProps } from "./types";

// Cross-platform compatible animation - using pixels instead of vh
const bunnyFall = keyframes`
  0% {
    opacity: 1;
    transform: translate(0, -100px) rotateZ(0deg);
  }

  75% {
    opacity: 1;
    transform: translate(100px, 600px) rotateZ(270deg);
  }

  100% {
    opacity: 0;
    transform: translate(150px, 800px) rotateZ(360deg);
  }
`;

// Modern Bunny component with proper TypeScript typing
interface StyledBunnyProps {
  $position: number;
  $duration: number;
  $iterations: number | string;
  $delay: number;
}

const Bunny = styled.div<StyledBunnyProps>`
  display: inline-flex;
  position: fixed;
  top: 0;
  left: ${({ $position }: { $position: number }) => `${$position}%`};
  transform: translate3d(0, -100%, 0);
  user-select: none;
  pointer-events: none;
  z-index: 99999;

  animation-name: ${bunnyFall};
  animation-duration: ${({ $duration }: { $duration: number }) => `${$duration}s`};
  animation-delay: ${({ $delay }: { $delay: number }) => `${$delay}s`};
  animation-timing-function: linear;
  animation-iteration-count: ${({ $iterations }: { $iterations: number | string }) => 
    (typeof $iterations === 'number' && Number.isFinite($iterations)) ? String($iterations) : "infinite"
  };
  animation-play-state: running;
`;

// Generate truly random values for each bunny
const generateRandomBunnyProps = (duration: number) => ({
  position: Math.random() * 90, // 0-90% to prevent overflow
  delay: Math.random() * duration * 0.8, // Random delay up to 80% of duration
});

const FallingBunnies: React.FC<React.PropsWithChildren<FallingBunniesProps>> = ({
  count = 30,
  size = 32,
  iterations = Infinity,
  duration = 10,
}) => {
  // Generate random properties for each bunny to create truly random animation
  const bunnies = [...Array(count)].map((_, index) => {
    const randomProps = generateRandomBunnyProps(duration);
    
    return (
      <Bunny 
        key={String(index)} 
        $position={randomProps.position}
        $duration={duration}
        $iterations={iterations}
        $delay={randomProps.delay}
      >
        <BunnyIcon width={size} height={size} />
      </Bunny>
    );
  });

  return <div>{bunnies}</div>;
};

export default FallingBunnies;
