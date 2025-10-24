import { getCookie } from "./cookie_actions";
import apiClient from "@/apiClient/apiClient";
import { UserDataProps } from "@/types";


export const joinWaitingList = async (email: string) => {
  try {
    console.log(process.env.NEXT_PUBLIC_API_BASE_URL, "here is the url");
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/join-waitlist-pricesphere?email=${email}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    return await response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "An unknown error occurred" };
  }
};

export const getUser = async () => {
  const token = await getCookie("token");
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/user`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
        credentials: "include",
        // cache: "force-cache",
        next: {
          tags: ["userData"],
        },
      }
    );

    const data = await res.json();

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error in fetching logged in user: ${error}`);
    } else {
      throw new Error(
        "An unknown error occurred while fetching logged in user"
      );
    }
  }
};

interface LoginData {
  email: string;
  password: string;
}

export const loginInUser = async (data: LoginData) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
        cache: "no-store",
      }
    );

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error logging in user: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while logging in the user!");
    }
  }
};

interface SignupData {
  name: string;
  username: string;
  email: string;
  password: string;
}

export const signUpUser = async (data: SignupData) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
        cache: "no-store",
      }
    );

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error registering user: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while registering user!");
    }
  }
};


export const logoutUser = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/logout`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        // cache: "no-store",
      }
    );

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error logging out user: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while logging out user!");
    }
  }
};


// Fixed duplicate catch blocks and variable naming issues
export const resendOtp = async (email: string) => {
  try {
    const response = await apiClient.post("/api/auth/resend", { email });

    // Fixed type and variable name
    const data = response.data as { user: UserDataProps; token: string };
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error re-sending OTP: ${error.message}`);
    }
    
    // For axios errors with response data
    const axiosError = error as { response?: { data?: { message?: string } } };
    if (axiosError.response?.data?.message) {
      throw new Error(axiosError.response.data.message);
    }
    
    throw new Error("An unknown error occurred while re-sending OTP!");
  }
};





