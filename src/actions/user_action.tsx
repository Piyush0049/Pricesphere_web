import { getCookie } from "./cookie_actions";
import apiClient from "@/apiClient/apiClient";
import { UserDataProps } from "@/types";
import axios from "axios";

// ----------------------------
// Join Waiting List
// ----------------------------
export const joinWaitingList = async (email: string) => {
  try {
    console.log(process.env.NEXT_PUBLIC_API_BASE_URL, "here is the url");

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/join-waitlist-pricesphere`,
      { email },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    return handleAxiosError(error, "joining the waiting list");
  }
};

// ----------------------------
// Get Logged-in User
// ----------------------------
export const getUser = async () => {
  const token = await getCookie("token");

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/user`,
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(handleErrorMessage(error, "fetching logged in user"));
  }
};

// ----------------------------
// Login User
// ----------------------------
interface LoginData {
  email: string;
  password: string;
}

export const loginInUser = async (data: LoginData) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`,
      data,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(handleErrorMessage(error, "logging in user"));
  }
};

// ----------------------------
// Register User
// ----------------------------
interface SignupData {
  name: string;
  username: string;
  email: string;
  password: string;
}

export const signUpUser = async (data: SignupData) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/register`,
      data,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(handleErrorMessage(error, "registering user"));
  }
};

// ----------------------------
// Logout User
// ----------------------------
export const logoutUser = async () => {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/logout`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(handleErrorMessage(error, "logging out user"));
  }
};

// ----------------------------
// Resend OTP
// ----------------------------
export const resendOtp = async (email: string) => {
  try {
    const response = await apiClient.post("/api/auth/resend", { email });

    return response.data as { user: UserDataProps; token: string };
  } catch (error) {
    throw new Error(handleErrorMessage(error, "resending OTP"));
  }
};

// ----------------------------
// Helper Functions
// ----------------------------
function handleAxiosError(error: unknown, action: string) {
  if (axios.isAxiosError(error)) {
    return {
      success: false,
      message: error.response?.data?.message || `Error ${action}`,
    };
  }

  if (error instanceof Error) {
    return { success: false, message: error.message };
  }

  return { success: false, message: `An unknown error occurred while ${action}` };
}

function handleErrorMessage(error: unknown, action: string): string {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || `Error ${action}`;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return `An unknown error occurred while ${action}`;
}
