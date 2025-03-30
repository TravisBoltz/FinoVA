// Script to fetch user details from the API
import fetch from "node-fetch";

const userId = "10386094-89a6-4f9f-9896-c16da13f3e9c";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTAzODYwOTQtODlhNi00ZjlmLTk4OTYtYzE2ZGExM2YzZTljIiwiZXhwIjoxNzQzMzMxMDAyLCJ0eXBlIjoiYWNjZXNzIiwiaWF0IjoxNzQzMzMwNDAyfQ.5ZiXiHLAYN9Bl-AZ29dqOO7A4aM5Yutvi2wnYTUdOcY";

async function fetchUserDetails() {
  try {
    const response = await fetch(
      `https://e5ed-102-208-89-6.ngrok-free.app/api/v1/auth/user/${userId}`,
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
