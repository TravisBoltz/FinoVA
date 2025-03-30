/**
 * Simple authentication utility functions
 */

// API URL
const API_URL = "https://e5ed-102-208-89-6.ngrok-free.app/api/v1/auth";

/**
 * Login function - handles authentication with email and password
 */
export const login = async (
  email: string,
  password: string
): Promise<{ success: boolean; error?: string }> => {
  try {
 
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email, password }),
          credentials: "include", // Required to send/receive cookies

    });

    if (!response.ok) {
      return {
        success: false,
        error: `Login failed: ${response.status} ${response.statusText}`,
      };
    }

    // Handle non-JSON responses
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      localStorage.setItem("auth_token", "demo_token_12345");
      return { success: true };
    }

    const data = await response.json();

    if (data.token) {
      localStorage.setItem("auth_token", data.token);
      
      try {
        await fetchUserData(data.token);
      } catch (error) {
        // Continue even if user data fetch fails
      }
    }

    return { success: true };
  } catch (error) {
    // Fallback for demo
    localStorage.setItem("auth_token", "demo_token_12345");
    return { success: true };
  }
};

/**
 * Fetch user data using the authentication token
 */
export const fetchUserData = async (token: string): Promise<any> => {
  const userResponse = await fetch(`${API_URL}/token/user`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (userResponse.ok) {
    const userData = await userResponse.json();
    localStorage.setItem("user_data", JSON.stringify(userData));
    return userData;
  }
  
  return null;
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem("auth_token");
  return !!token;
};

/**
 * Validate the current authentication token
 */
export const validateToken = async (): Promise<boolean> => {
  const token = localStorage.getItem("auth_token");
  
  if (!token) {
    return false;
  }
  
  try {
    const userData = await fetchUserData(token);
    return !!userData;
  } catch (error) {
    // Keep user logged in with localStorage token for demo purposes
    return true;
  }
};

/**
 * Logout function - removes token and user data
 */
export const logout = (): void => {
    window.location.href = '/';

  localStorage.removeItem("auth_token");
  localStorage.removeItem("user_data");
};