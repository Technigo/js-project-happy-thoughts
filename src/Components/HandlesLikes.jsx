const handleLike = async (id) => {
  try {
    const response = await fetch(
      `https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts/${id}/like`,
      {
        method: "POST",
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
