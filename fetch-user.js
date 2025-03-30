// Script to fetch user details from the API
import fetch from "node-fetch";

const userId = "f370b932-719f-49b4-8224-e8f12bff9029";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZjM3MGI5MzItNzE5Zi00OWI0LTgyMjQtZThmMTJiZmY5MDI5IiwiZXhwIjoxNzQzMzMyOTA2LCJ0eXBlIjoiYWNjZXNzIiwiaWF0IjoxNzQzMzMyMzA2fQ.w1cSYhDvKhAH3l1-XtlTQlfbgIkt7MOLVFzY7d8LHcQ";

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
