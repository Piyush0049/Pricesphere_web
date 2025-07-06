"use client";

import { useState, useRef, ChangeEvent, KeyboardEvent, ClipboardEvent } from "react";
import { useRouter } from "next/navigation";
import ResendOtpButton from "./ResendOtpButton";
import axios from "axios";

interface VerificationProps {
  isVerify: boolean;
  setIsVerify: (value: boolean) => void;
}

const Verify: React.FC<VerificationProps> = () => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  const verifyOTP = async (otpValue: string[]) => {
    if (isVerifying) return;
    setIsVerifying(true);
    const otpString = otpValue.join("");
    let isSuccess = false;
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/verification`,
        { otp: otpString },
        { withCredentials: true }
      );
      console.log("OTP verification response:", response);

      isSuccess = true;
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } catch (error) {
      console.error("Error verifying OTP:", error);
    } finally {
      if (!isSuccess) {
        setIsVerifying(false);
      }
    }
  };

  
  const handleChange = (index: number, value: string) => {
    if (!isNaN(Number(value)) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < otp.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }

      if (newOtp.every((digit) => digit !== "")) {
        verifyOTP(newOtp);
      }
    }
  };

  const handleKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("Text");
    const digits = pastedData.replace(/\D/g, "");
    if (digits.length === otp.length) {
      const otpArray = digits.split("");
      setOtp(otpArray);
      inputRefs.current[otp.length - 1]?.focus();
      verifyOTP(otpArray);
    }
  };

  return (
    <>
      <div
        className={`min-h-screen flex font-poppins justify-center items-center bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white ${isVerifying ? "filter blur-sm" : ""
          }`}
      >
        <div className="bg-transparent p-10 rounded-lg shadow-lg flex flex-col items-center">
          <h2 className="mb-5 text-xl font-bold text-orange-400">Enter OTP</h2>
          <p className="mb-5 text-sm text-orange-100 text-center">
            Please enter the 6-digit code sent to your email.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col items-center w-full">
            <div className="flex gap-2 mb-5">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  value={digit}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(index, e.target.value)}
                  onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleKeyDown(index, e)}
                  onPaste={(e: ClipboardEvent<HTMLInputElement>) => handlePaste(e)}
                  maxLength={1}
                  ref={(el) => {
                    if (el) inputRefs.current[index] = el;
                  }}
                  className="w-12 h-12 text-center text-xl font-bold border-2 bg-gray-700 border-gray-300 rounded-md outline-none focus:border-orange-500 shadow-sm"
                />
              ))}
            </div>
            <div className="flex items-center justify-center gap-5">
              <ResendOtpButton />
            </div>
            {isVerifying && (
              <p className="mt-3 text-sm text-orange-300">Verifying...</p>
            )}
          </form>
        </div>
      </div>

      {/* Loader Overlay */}
      {isVerifying && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
          <div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </>
  );
};

export default Verify;
