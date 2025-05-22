import { useState } from "react";
import { motion } from "framer-motion";

export default function AnimatedButton({
  children,
  onClick,
  className = "", // Add className prop with a default empty string
}: {
  children: React.ReactNode;
  onClick: () => void;
  className?: string; // Define the className prop
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  // Infinite pulsing animation for the ring
  const pulseAnimation = {
    scale: [1, 1.02, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 2.5,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "loop" as const,
    },
  };

  return (
    <>
      {/* Container with the light blue ring */}
      <div className={`relative inline-block w-full`}>
        {/* Light blue circular ring with infinite animation */}
        <motion.div
          className="absolute -inset-3 rounded-full bg-[#0494FC33]"
          animate={pulseAnimation}
        />

        {/* Actual button */}
        <motion.button
          className={`w-full cursor-pointer relative overflow-hidden text-white font-medium px-3 py-4 md:px-6 md:py-4 rounded-full ${className}`}
          style={{
            backgroundColor: "#0099FF",
          }}
          onClick={onClick}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          onTapStart={() => setIsPressed(true)}
          onTap={() => setTimeout(() => setIsPressed(false), 100)}
          onTapCancel={() => setIsPressed(false)}
          whileHover={{
            scale: 1.01,
          }}
          whileTap={{
            scale: 0.97,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 17,
          }}
        >
          {/* Background shine effect */}
          {isHovered && (
            <motion.div
              className="absolute inset-0 bg-white opacity-10"
              initial={{ x: "-100%", skewX: -20 }}
              animate={{ x: "200%", skewX: -20 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
          )}

          {/* Button content with subtle animations */}
          <motion.div
            animate={{
              y: isPressed ? 1 : 0,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="relative text-base md:text-xl font-semibold z-10 flex items-center justify-center"
          >
            {children}
          </motion.div>
        </motion.button>
      </div>
    </>
  );
}
