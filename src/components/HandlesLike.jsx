const handleLike = async (id) => {
  try {
    const response = await fetch(`http://localhost:9000/thoughts/${id}/like`, {
      method: "POST",
    });
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
