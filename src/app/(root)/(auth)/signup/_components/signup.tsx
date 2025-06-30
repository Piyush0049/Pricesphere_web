"use client";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Image from "next/image";
import GoogleLoginButton from "@/components/googleloginbutton";
import { signUpUser } from "@/actions/user_action";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Verification {
  isVerify: boolean;
  setIsVerify: (value: boolean) => void;
}

// Define the response type for signUpUser
interface SignupResponse {
  success: boolean;
  message: string;
}

// Remove the unused variable from props destructuring
const SignupPage: React.FC<Verification> = ({ setIsVerify }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null); // Move this outside the catch block
  // Keep router for future use or remove if truly unused
  const router = useRouter();


  const validateUsername = (username: string) => {
    if (!username) {
      return "Required";
    } else if (username.length < 3) {
      return "Username must be at least 3 characters";
    }
    return "";
  };


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
    } else if (password.length < 6) {
      return "Password must be at least 6 characters";
    }
    return "";
  };


  const validateConfirmPassword = (confirmPassword: string) => {
    if (!confirmPassword) {
      return "Required";
    } else if (confirmPassword !== password) {
      return "Passwords do not match";
    }
    return "";
  };


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null); // Reset error state
    
    const usernameValidationError = validateUsername(username);
    const emailValidationError = validateEmail(email);
    const passwordValidationError = validatePassword(password);
    const confirmPasswordValidationError = validateConfirmPassword(confirmPassword);
    
    setUsernameError(usernameValidationError);
    setEmailError(emailValidationError);
    setPasswordError(passwordValidationError);
    setConfirmPasswordError(confirmPasswordValidationError);
    
    if (
      !usernameValidationError &&
      !emailValidationError &&
      !passwordValidationError &&
      !confirmPasswordValidationError
    ) {
      console.log({ username, email, password });
    }
    
    // Adjust the data structure to match the SignupData interface
    const data = { 
      name: username, // Using username as name since name is required in SignupData
      username, 
      email, 
      password 
    };
    
    try {
      const responseData = await signUpUser(data) as SignupResponse;
      if (responseData.success) {
        toast.success(responseData.message);
        localStorage.setItem("email", data.email);
        setIsVerify(true);
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      // Properly type the error and handle it
      if (error instanceof Error) {
        setError(error.message);
        toast.error(error.message || "Error registering user.");
      } else {
        setError("An unknown error occurred");
        toast.error("Error registering user.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div
      className="min-h-screen flex font-poppins justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white relative bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/signup.png')", backgroundColor: "#1f2937" }}
    >
      <div className="absolute inset-0 bg-black opacity-85 lg:opacity-70 backdrop-blur-xl"></div>
      <div className="flex lg:w-[40%] justify-center items-center bg-transparent px-[18px] lg:pl-10 py-10 bg-opacity-80 relative z-10">
        <div className="w-full lg:max-w-[83%] xl:max-w-[63%] space-y-8">
          <div>
            <div className="text-[22px] lg:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-300 to-orange-100 mb-2">
              Create Your Account
            </div>
            <p className="text-sm text-orange-200">
              Pricesphere – Compare, Save, and Shop Smart!
            </p>
          </div>
          <GoogleLoginButton className="flex items-center justify-center w-full py-3 mt-4 border rounded-lg shadow-lg hover:shadow-xl hover:text-orange-500 transition-all transform hover:scale-105" text="Signup" />
          <div className="flex items-center justify-between mt-1">
            <span className="border-b w-1/5 lg:w-1/4"></span>
            <span className="text-[9px] text-center text-orange-200 uppercase">
              Or Register with
            </span>
            <span className="border-b w-1/5 lg:w-1/4"></span>
          </div>
          <form onSubmit={handleSubmit} className="mt-1 space-y-4">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-orange-200">
                  Username
                </label>
                <input
                  name="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-2 mt-1 text-xs border border-orange-400 rounded-sm focus:outline-none focus:ring-2 focus:ring-orange-300 transition-all bg-transparent placeholder-orange-300"
                />
                {usernameError && (
                  <div className="text-red-400 text-xs mt-2">{usernameError}</div>
                )}
              </div>
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
                  <div
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-orange-400 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>
                {passwordError && (
                  <div className="text-red-400 text-xs mt-2">{passwordError}</div>
                )}
              </div>
              <div>
                <label className="block text-xs font-medium text-orange-200">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-2 mt-1 text-xs border border-orange-400 rounded-sm focus:outline-none focus:ring-2 focus:ring-orange-300 transition-all bg-transparent placeholder-orange-300"
                  />
                  <div
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-orange-400 cursor-pointer"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>
                {confirmPasswordError && (
                  <div className="text-red-400 text-xs mt-2">{confirmPasswordError}</div>
                )}
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
                "Sign Up"
              )}
            </button>
            <p className="text-center text-xs mt-4">
              Already have an account?{" "}
              <a href="/login" className="text-orange-300 hover:text-orange-200">
                Login here
              </a>
            </p>
          </form>
        </div>
      </div>
      <div className="hidden lg:block w-[60%] relative m-1">
        <Image
          alt="signup"
          className="w-full h-full rounded-l-xl animate-fade-in"
          src="/assets/signup.png"
          layout="fill"
        />
      </div>
    </div>
  );
};


export default SignupPage;
