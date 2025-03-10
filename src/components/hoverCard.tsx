import React, { useState, useEffect } from "react";

interface HoverCardProps {
  children: React.ReactNode;
}

const HoverCard: React.FC<HoverCardProps> = ({ children }) => {
  const [cardWidth, setCardWidth] = useState<number>(() => {
    const storedWidth = localStorage.getItem("cardWidth");
    return storedWidth ? JSON.parse(storedWidth) : 152;
  });

  useEffect(() => {
    const getUpdatedWidth = () => {
      const storedWidth = localStorage.getItem("cardWidth");
      if (storedWidth) {
        const newWidth = JSON.parse(storedWidth);
        if (newWidth !== cardWidth) {
          setCardWidth(newWidth);
        }
      }
    };
    const interval = setInterval(getUpdatedWidth, 500);
    return () => clearInterval(interval);
  }, [cardWidth]);

  return (
    <div
      className="absolute top-2 -left-1 ml-0 bg-gradient-to-r from-[#0a192f] to-[#0e1e40] border border-[#454f65] shadow-xl rounded-md sm:rounded-xl p-2.5 sm:p-4 text-white z-20 transition-all duration-300 ease-in-out delay-100 animate-popIn"
      style={{ width: `${cardWidth}px` }}
    >
      {children}
    </div>
  );
};

export default HoverCard;
