// Simple test script to check the API directly
const fetchUserData = async () => {
  const userId = "10386094-89a6-4f9f-9896-c16da13f3e9c";
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTAzODYwOTQtODlhNi00ZjlmLTk4OTYtYzE2ZGExM2YzZTljIiwiZXhwIjoxNzQzMzMxMDAyLCJ0eXBlIjoiYWNjZXNzIiwiaWF0IjoxNzQzMzMwNDAyfQ.5ZiXiHLAYN9Bl-AZ29dqOO7A4aM5Yutvi2wnYTUdOcY";

  try {
    console.log("Fetching user data...");
    const response = await fetch(
      `https://e5ed-102-208-89-6.ngrok-free.app/api/v1/auth/user/${userId}`,
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
