const handleLike = async (id) => {
  const accessToken = localStorage.getItem("userToken"); // or from state
  if (!accessToken) {
    console.error("No access token found. User might not be logged in.");
    return null; // or handle the error as needed
  }

  try {
    const response = await fetch(
      `https://js-project-api-k17p.onrender.com/thoughts/${id}/like`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`, // <-- Add this line
        },
      }
    );

    if (response.ok) {
      return await response.json();
    } else {
      console.error("Failed to add heart 😞: Response not OK");
      return null;
    }
  } catch (error) {
    console.error("Unable to add heart 😞:", error);
    return null;
  }
};

export default handleLike;
