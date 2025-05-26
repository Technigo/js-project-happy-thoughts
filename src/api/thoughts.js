const API_URL = 'https://happy-thoughts-api-4ful.onrender.com/thoughts';

export const fetchThoughts = async () => {
  const response = await fetch(`${API_URL}`);
  if (!response.ok) throw new Error('Failed to fetch thoughts');
  return response.json();
};

export const postThought = async (message) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });
  if (!response.ok) throw new Error('Failed to post thought');
  return response.json();
};

export const PostLikeThought = async (id) => {
  const response = await fetch(`${API_URL}/${id}/like`, {
    method: 'POST',
  });
  if (!response.ok) throw new Error('Failed to like thought');
  return response.json();
};
