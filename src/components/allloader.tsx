"use client"; // Ensure this runs only on the client side

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

export function AllPageLoader() {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Start loading whenever the path changes
    setLoading(true);
    // Simulate a brief load time, then hide the loader
    const timeout = setTimeout(() => setLoading(false), 500);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <>
      {/* Top Progress Bar */}
      {loading && (
        <div className="fixed top-0 left-0 w-full h-1 bg-orange-500 animate-pulse z-[1000000000000000]" />
      )}

      {/* Fullscreen Loader */}
      {loading && (
        <div className="fixed z-[1000000000000005] inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white flex items-center justify-center">
          {/* The logo with a slow bounce animation */}
          <Image
            src="/assets/logo.png"
            alt="logo"
            width={160} // w-40 = 160px
            height={80} // approximate, adjust as needed
            className="w-40 h-auto animate-slow-bounce"
          />
          <style jsx>{`
            @keyframes slow-bounce {
              0%, 100% {
                transform: translateY(0);
              }
              50% {
                transform: translateY(-25px);
              }
            }
            .animate-slow-bounce {
              animation: slow-bounce 2s infinite;
            }
          `}</style>
        </div>
      )}
    </>
  );
}
