const BASE_URL = import.meta.env.VITE_API_URL;

// GET Messages
export const fetchThoughts =  async () => {
 const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error("Failed to fetch thoughts");
    return res.json();
};

// POST messages
export const postThought =  async (message) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });
  if (!res.ok) throw new Error("Failed to post message");
  return res.json();
};

// Like messages
export const likeThought = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}/like`, {
    method: "POST",
  });
    if (!res.ok) throw new Error("Failed to like message");
    return res.json();
};
