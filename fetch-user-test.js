// Simple test script to check the API directly
const fetchUserData = async () => {
  const userId = "f370b932-719f-49b4-8224-e8f12bff9029";
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZjM3MGI5MzItNzE5Zi00OWI0LTgyMjQtZThmMTJiZmY5MDI5IiwiZXhwIjoxNzQzMzM4NTk1LCJ0eXBlIjoiYWNjZXNzIiwiaWF0IjoxNzQzMzM3OTk1fQ.jeuraiBVkOCCEq0GYDso4_g1gpXaUEGp61YsbtY_GIc";

  try {
    console.log("Fetching user data...");
    const response = await fetch(
      `https://c7c5-102-176-94-204.ngrok-free.app/api/v1/auth/user/${userId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include", // Include cookies with the request
      }
    );

    console.log("Response status:", response.status);
    console.log("Content-Type:", response.headers.get("content-type"));

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const textResponse = await response.text();
      console.log("Non-JSON response:", textResponse.substring(0, 200) + "...");
      return;
    }

    if (!response.ok) {
      console.log(`API request failed with status ${response.status}`);
      return;
    }

    const result = await response.json();
    console.log("API Response:", JSON.stringify(result, null, 2));
  } catch (error) {
    console.error("Error:", error.message);
  }
};

fetchUserData();
