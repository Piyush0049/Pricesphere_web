"use client";
import React, { useState } from "react";
import { FaEye, FaGoogle } from "react-icons/fa";
import Image from "next/image";
import GoogleLoginButton from "@/components/googleloginbutton";
import { FaEyeSlash } from "react-icons/fa";
import { loginInUser } from "@/actions/user_action";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string) => {
    if (!email) {
      return "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      return "Invalid email";
    }
    return "";
  };

  const validatePassword = (password: string) => {
    if (!password) {
      return "Required";
    }
    return "";
  };

  const handleSubmit = async(event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const emailValidationError = validateEmail(email);
      const passwordValidationError = validatePassword(password);

      setEmailError(emailValidationError);
      setPasswordError(passwordValidationError);

      if (!emailValidationError && !passwordValidationError) {
        console.log({ email, password });
      }
      console.log({ email, password });
      const res = await loginInUser({ email, password });
      console.log(res);
      if(!res.success) {
        setEmailError(res.message || "Login failed. Please try again.");
        toast.error(res.message || "Login failed. Please try again.");
      }else {
        toast.success("Login successful!");
        router.push("/dashboard");
      }
      setEmail("");
      setPassword("");
      setEmailError("");
    } catch (error) {
      toast.error("Login failed. Please try again.");
      setEmailError("Login failed. Please try again.");
      console.log(error)
    }
    finally{
      setIsSubmitting(false);
    }

  };

  return (
    <div
      className="min-h-screen flex font-poppins justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white relative bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/login.png')", backgroundColor: "#1f2937" }}
    >
      <div className="absolute inset-0 bg-black opacity-85 lg:opacity-80 backdrop-blur-xl"></div>
      <div className="hidden lg:block w-[60%] relative m-1">
        <Image
          alt="login"
          className="w-full h-full rounded-l-xl animate-fade-in"
          src="/assets/login.png"
          layout="fill"
        />
      </div>

      <div className="flex lg:w-[40%] justify-center items-center bg-transparent px-[18px] lg:pr-10 py-10 bg-opacity-80 relative z-10">
        <div className="w-full lg:max-w-[83%] xl:max-w-[63%] space-y-8">
          <div>
            <div className="text-[22px] lg:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-300 to-orange-100 mb-2">
              Login To Your Account
            </div>
            <p className="text-sm text-orange-200">
              Pricesphere – Compare, Save, and Shop Smart!
            </p>
          </div>
          <GoogleLoginButton className="flex items-center justify-center w-full py-3 mt-4 border rounded-lg shadow-lg hover:shadow-xl hover:text-orange-500 transition-all transform hover:scale-105" text="Login" />
          <div className="flex items-center justify-between mt-1">
            <span className="border-b w-1/5 lg:w-1/4"></span>
            <span className="text-[9px] text-center text-orange-200 uppercase">
              Or Login with
            </span>
            <span className="border-b w-1/5 lg:w-1/4"></span>
          </div>
          <form onSubmit={handleSubmit} className="mt-1 space-y-4">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-orange-200">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 mt-1 text-xs border border-orange-400 rounded-sm focus:outline-none focus:ring-2 focus:ring-orange-300 transition-all bg-transparent placeholder-orange-300"
                />
                {emailError && (
                  <div className="text-red-400 text-xs mt-2">{emailError}</div>
                )}
              </div>
              <div>
                <label className="block text-xs font-medium text-orange-200">
                  Password
                </label>
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 text-xs mt-1 border border-orange-400 rounded-sm focus:outline-none focus:ring-2 focus:ring-orange-300 transition-all bg-transparent placeholder-orange-300"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-orange-400 cursor-pointer">
                    {showPassword ? (
                      <FaEyeSlash onClick={() => setShowPassword(false)} />
                    ) : (
                      <FaEye onClick={() => setShowPassword(true)} />
                    )}
                  </div></div>
                {passwordError && (
                  <div className="text-red-400 text-xs mt-2">{passwordError}</div>
                )}
              </div>
            </div>
            <div className="flex text-xs items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-3 w-3 text-orange-600 border-orange-600 rounded focus:ring-orange-500 accent-orange-600"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-xs text-orange-200"
                >
                  Remember me
                </label>
              </div>
              <div>
                <a
                  href="#"
                  className="text-xs text-orange-100 hover:text-orange-200"
                >
                  Forgot your password?
                </a>
              </div>
            </div>
            <button
              type="submit"
              className="w-full mt-10 text-sm py-2 bg-gradient-to-r from-orange-500 to-orange-400 text-white font-semibold rounded-sm hover:shadow-sm hover:bg-gradient-to-r hover:from-orange-400 hover:to-orange-300 transition-all transform hover:scale-102 flex items-center justify-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16z"
                    ></path>
                  </svg>
                  Loading...
                </span>
              ) : (
                "Login"
              )}
            </button>
            <p className="text-center text-xs mt-4">
              Don’t have an account?{" "}
              <a href="/signup" className="text-orange-300 hover:text-orange-200">
                Register here
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>

  );
};

export default LoginPage;
