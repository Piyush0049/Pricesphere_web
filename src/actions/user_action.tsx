import { getCookie } from "./cookie_actions";
import apiClient from "@/apiClient/apiClient";

// Fix for line 55:41 and 83:40
// Update the joinWaitingList function to handle errors properly

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

// Fix for other functions with any types
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

export const loginInUser = async (data: any) => {
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


export const signUpUser = async (data: any) => {
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
      throw new Error(`Error registering user: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while registering user!");
    }
  }
};



export const resendOtp = async (email: string) => {
  try {
    const res = await apiClient.post("/api/auth/resend", { email });

    const data = res.data;
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error re-sending OTP: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while re-sending OTP!");
    }
  }
};





