"use client";

import * as React from "react";
import { motion, useAnimationFrame } from "framer-motion";

interface InfinityNameProps {
  text?: string;
  speed?: number;
  color?: string;
  fontSize?: number;
  strokeWidth?: number;
  letterDelay?: number;
  rotateText?: boolean;
}

export default function InfinityName({
  text = "FramerGPT",
  speed = 0.25,
  color = "#ff7a00",
  fontSize = 40,
  strokeWidth = 3,
  letterDelay = 0.03,
  rotateText = true,
}: InfinityNameProps) {
  const pathRef = React.useRef<SVGPathElement | null>(null);
  const [pathLength, setPathLength] = React.useState(0);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, []);

  useAnimationFrame((t, delta) => {
    setProgress((prev) => (prev + (delta / 1000) * speed) % 1);
  });

  const letters = text.split("");

  // Helper to get letter position & rotation
  const getLetterProps = (offset: number) => {
    if (!pathRef.current) return { x: 0, y: 0, angle: 0 };
    const length = pathLength * ((progress + offset + 1) % 1);
    const pos = pathRef.current.getPointAtLength(length);
    const nextPos = pathRef.current.getPointAtLength(
      (length + 2) % pathLength
    );
    const angle = Math.atan2(nextPos.y - pos.y, nextPos.x - pos.x);
    return { x: pos.x, y: pos.y, angle };
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <svg
        viewBox="0 0 800 400"
        width="100%"
        height="100%"
        style={{ overflow: "visible" }}
      >
        {/* Infinity Path */}
        <path
          ref={pathRef}
          d="M 150 200 C 150 50, 400 50, 400 200 C 400 350, 650 350, 650 200 C 650 50, 400 50, 400 200 C 400 350, 150 350, 150 200 Z"
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          opacity="0.2"
        />

        {/* Letters moving like a snake */}
        {letters.map((letter, i) => {
          const { x, y, angle } = getLetterProps(i * letterDelay);
          return (
            <motion.g
              key={i}
              animate={{
                x,
                y,
                rotate: rotateText ? (angle * 180) / Math.PI : 0,
              }}
              transition={{
                type: "tween",
                ease: "linear",
                duration: 0.01,
              }}
              style={{
                transformOrigin: "center",
                transformBox: "fill-box",
              }}
            >
              <text
                fill={color}
                fontSize={fontSize}
                fontWeight="bold"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {letter}
              </text>
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}
