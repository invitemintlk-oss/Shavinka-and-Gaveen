import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface Petal {
  id: number;
  x: number;
  size: number;
  rotation: number;
  duration: number;
  delay: number;
  color: string;
  drift: number;
}

interface FloatingPetalsProps {
  count?: number;
  maxDelay?: number;
}

export const FloatingPetals: React.FC<FloatingPetalsProps> = ({ count = 12, maxDelay = 15 }) => {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    // Vintage petal colors: dusty rose, burgundy, ivory
    const colors = ['#B98B82', '#681F2B', '#FAF4E7'];
    
    const newPetals = Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 90 + 5, // 5% to 95%
      size: Math.random() * 12 + 10,
      rotation: Math.random() * 360,
      duration: Math.random() * 20 + 25, // Slower duration
      delay: Math.random() * maxDelay,
      color: colors[Math.floor(Math.random() * colors.length)],
      drift: Math.random() * 30 - 15,
    }));
    setPetals(newPetals);
  }, [count, maxDelay]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute"
          style={{ color: petal.color }}
          initial={{
            x: `${petal.x}%`,
            y: '-10%',
            rotate: petal.rotation,
            opacity: 0
          }}
          animate={{
            y: '110%',
            x: `${petal.x + petal.drift}%`,
            rotate: petal.rotation + 360,
            opacity: [0, 0.8, 0.8, 0]
          }}
          transition={{
            duration: petal.duration,
            repeat: Infinity,
            delay: petal.delay,
            ease: "linear"
          }}
        >
          {/* Subtle petal shape */}
          <svg
            width={petal.size}
            height={petal.size}
            viewBox="0 0 24 24"
            fill="currentColor"
            className="drop-shadow-md opacity-70"
          >
            <path d="M12,2C12,2 8,6 8,12C8,18 12,22 12,22C12,22 16,18 16,12C16,6 12,2 12,2Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};
