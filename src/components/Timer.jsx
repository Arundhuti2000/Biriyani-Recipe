import React, { useState, useEffect } from "react";

const Timer = ({ duration, onComplete, onReset }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isActive, setIsActive] = useState(false);

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
    <div className="flex items-center gap-2">
      <span className="font-mono text-xl min-w-[4rem] text-gray-700">
        {formatTime(timeLeft)}
      </span>
      <button
        onClick={toggleTimer}
        className="px-4 py-2  rounded-lg bg-sky-600 tracking-wide text-white hover:bg-gray-700 transition-colors min-w-[4rem] text"
      >
        {isActive ? "Pause" : "Start"}
      </button>
      <button
        onClick={handleReset}
        className="px-4 py-2 rounded-lg bg-orange-400 tracking-wide text-white hover:bg-gray-500 transition-colors text"
      >
        Reset
      </button>
    </div>
  );
};

export default Timer;
