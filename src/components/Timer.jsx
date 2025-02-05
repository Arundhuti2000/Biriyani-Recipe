import React, { useState, useEffect } from "react";

const Timer = ({ duration, onComplete, onReset, timerRef }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (timerRef) {
      timerRef.current = {
        stop: () => {
          setIsActive(false);
          setTimeLeft(duration);
        },
      };
    }
  }, [timerRef, duration]);

  useEffect(() => {
    let interval;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            clearInterval(interval);
            onComplete();
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, onComplete]);

  const toggleTimer = () => setIsActive(!isActive);
  const handleReset = () => {
    setTimeLeft(duration);
    setIsActive(false);
    onReset();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="flex items-center gap-4">
      <span className="font-mono text-base sm:text-xl text-gray-600 min-w-[4rem]">
        {formatTime(timeLeft)}
      </span>
      <button
        onClick={toggleTimer}
        className="px-4 py-2 rounded-lg bg-sky-600 text-white hover:bg-sky-700 transition-colors min-w-[4rem]"
      >
        {isActive ? "Pause" : "Start"}
      </button>
      <button
        onClick={handleReset}
        className="px-4 py-2 rounded-lg bg-orange-400 text-white hover:bg-orange-500 transition-colors"
      >
        Reset
      </button>
    </div>
  );
};

export default Timer;
