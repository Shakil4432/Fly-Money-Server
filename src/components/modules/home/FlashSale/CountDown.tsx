"use client";
import { useState, useEffect } from "react";

type TimeLeft = {
  H: number;
  M: number;
  S: number;
};

export default function CountDown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    H: 0,
    M: 0,
    S: 0,
  });

  // Function to calculate the time left until midnight
  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0); // Set time to 12 AM of the next day

    const diff = midnight.getTime() - now.getTime();

    const H = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const M = Math.floor((diff / (1000 * 60)) % 60);
    const S = Math.floor((diff / 1000) % 60);

    return {
      H,
      M,
      S,
    };
  };

  useEffect(() => {
    // Set the initial time left
    setTimeLeft(calculateTimeLeft());

    // Update the countdown every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer); // Cleanup on unmount
  }, []);

  return (
    <div className="flex items-center justify-evenly space-x-4 text-gray-800 flex-wrap  gap-4">
      {(["H", "M", "S"] as const).map((unit) => (
        <div
          key={unit}
          className={`flex flex-col items-center px-3 lg:px-6 py-1 rounded-full w-24 lg:w-32 ${
            unit === "H"
              ? "border border-red-500 text-red-500 sm:text-sm"
              : "bg-[#FAF0E6] border border-[#7c3f00] text-[#7c3f00] sm:text-sm"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">
              {timeLeft[unit].toString().padStart(2, "0")}
            </span>
            <span className="text-sm">
              {unit.charAt(0).toUpperCase() + unit.slice(1)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
