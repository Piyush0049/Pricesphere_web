"use client";

import { resendOtp } from "@/actions/user_action";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { UserDataProps } from "@/types";

interface OtpResponse {
  success: boolean;
  message: string;
  error?: string;
  user: UserDataProps;
  token: string;
}

const ResendOtpButton = () => {
  const [isResendingOTP, setIsResendingOTP] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  const resendOTPHandler = async () => {
    setIsResendingOTP(true);
    const email = localStorage.getItem("email");
  
    try {
      if (!email) {
        toast.error("Email not found");
        return;
      }
      
      const data = await resendOtp(email) as OtpResponse;
      if (data.error) {
        toast.error(data.error);
      } 
      // Then check for success message
      else if (data.success && data.message) {
        toast.success(data.message);
      }
      // Handle case where we get user and token but no explicit success message
      else if (data.user && data.token) {
        toast.success("OTP sent successfully");
      }
      // Fallback error case
      else {
        toast.error("Failed to resend OTP");
      }
      
      setTimeLeft(30);
    } catch (error: unknown) {
      toast.error("Error re-sending OTP", {
        description: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setIsResendingOTP(false);
    }
  };

  useEffect(() => {
    if (timeLeft === 0) return;

    const intervalId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const isDisabled = timeLeft > 0 || isResendingOTP;

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={resendOTPHandler}
        disabled={isDisabled}
        className={` px-5 py-2 rounded-md text-white font-semibold transition-colors duration-300 focus:outline-none text-nowrap
          ${isDisabled ? "bg-gray-400 cursor-not-allowed hidden" : "bg-orange-600 hover:bg-orange-700"}`}
      >
        {isResendingOTP ? (
          <div className="flex items-center">
            Resending
            <Loader2 className="ml-2 w-4 h-4 animate-spin" />
          </div>
        ) : (
          "Resend OTP"
        )}
      </button>
      <span className={`text-sm text-orange-300 ${timeLeft === 0 && "hidden"}`}>
        Resend OTP in 00:{String(timeLeft).padStart(2, "0")}s
      </span>
    </div>
  );
};

export default ResendOtpButton;
