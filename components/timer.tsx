"use client";
import { useEffect, useState } from "react";

interface CountdownTimerProps {
  durationInMinutes: number; // Duration in minutes
  className?: string; // Optional class for styling
  onComplete?: () => void; // Callback when countdown ends
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  durationInMinutes,
  className,
  onComplete,
}) => {
  const [timeLeft, setTimeLeft] = useState(durationInMinutes * 60);

  useEffect(() => {
    if (timeLeft <= 0) {
      if (onComplete) onComplete();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return <span className={className}>{formatTime(timeLeft)}</span>;
};

export default CountdownTimer;
