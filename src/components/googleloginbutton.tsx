"use client";

import { useAppDispatch } from "@/redux/hooks";
import { userData } from "@/redux/slices/userSlice";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface GoogleLoginButtonProps {
  className?: string; 
  text?: string
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ className = "", text = "" }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const login = useGoogleLogin({
    onSuccess: async (credentialResponse) => {
      setIsLoading(true);
      try {
        const res = await axios.post(
          "/api/google/auth",
          {
            access_token: credentialResponse.access_token,
          },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        dispatch(userData(res.data.user));

        toast.success("Login success");
        router.replace("/dashboard");
      } catch (error: any) {
        console.error("Axios error:", error);
        toast.error("Google login failed!");
      } finally {
        setIsLoading(false);
      }
    },
    onError: (error: any) => {
      console.error("Google login error:", error);
      toast.error("Google login failed!");
    },
  });

  return (
    <button
      type="button"
      onClick={() => login()}
      className={`w-full text-lg lg:text-base text-orange-400 h-12 gap-2 ${className}`} 
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
        </>
      ) : (
        <>
          <Image
            src="/assets/icons/google-icon.svg"
            alt="Sign in with Google"
            width={17}
            height={17}
          />
          {text} with Google
        </>
      )}
    </button>
  );
};

export default GoogleLoginButton;
