// Get liked thoughts from local storage
export const getLikedThoughts = () => {
  const data = localStorage.getItem("likedThoughts");
  return data ? JSON.parse(data) : {};
};

// Save new like
export const saveLikedThought = (id) => {
  const current = getLikedThoughts();
  const updated = { ...current, [id]: true };
  localStorage.setItem("likedThoughts", JSON.stringify(updated));
};

// Count the number of likes
export const getLikeCount = () => {
  return Object.keys(getLikedThoughts()).length;
};
