// Script to fetch user details from the API
import fetch from "node-fetch";

const userId = "f370b932-719f-49b4-8224-e8f12bff9029";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZjM3MGI5MzItNzE5Zi00OWI0LTgyMjQtZThmMTJiZmY5MDI5IiwiZXhwIjoxNzQzMzM4NTk1LCJ0eXBlIjoiYWNjZXNzIiwiaWF0IjoxNzQzMzM3OTk1fQ.jeuraiBVkOCCEq0GYDso4_g1gpXaUEGp61YsbtY_GIc";

async function fetchUserDetails() {
  try {
    const response = await fetch(
      `https://c7c5-102-176-94-204.ngrok-free.app/api/v1/auth/user/${userId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    console.log("User details:", JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    console.error("Error fetching user data:", error.message);
  }
}

fetchUserDetails();
