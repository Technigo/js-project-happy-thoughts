const handleLike = async (id) => {
  try {
    const response = await fetch(
      `https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts/${id}/like`,
      {
        method: "POST",
      }
    );
    return await response.json();
  } catch (error) {
    console.error("Unable to heart 😞:", error);
  }
};

export default handleLike;
