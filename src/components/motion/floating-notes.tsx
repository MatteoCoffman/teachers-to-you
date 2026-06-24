"use client";

import { motion, useReducedMotion } from "motion/react";
import { Music2, Guitar, Piano } from "lucide-react";

const icons = [
  { Icon: Music2, x: "12%", y: "18%", size: 28, delay: 0 },
  { Icon: Guitar, x: "78%", y: "22%", size: 32, delay: 0.4 },
  { Icon: Piano, x: "85%", y: "62%", size: 26, delay: 0.8 },
  { Icon: Music2, x: "8%", y: "68%", size: 22, delay: 1.2 },
];

export function FloatingNotes() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {icons.map(({ Icon, x, y, size, delay }, i) => (
        <motion.div
          key={i}
          className="absolute text-primary/15"
          style={{ left: x, top: y }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0.08, 0.18, 0.08],
            y: [0, -12, 0],
            rotate: [0, i % 2 === 0 ? 6 : -6, 0],
          }}
          transition={{
            duration: 6 + i,
            delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Icon style={{ width: size, height: size }} />
        </motion.div>
      ))}
    </div>
  );
}
