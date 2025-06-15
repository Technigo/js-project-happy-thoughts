export const getUserId = () => {
  let userId = localStorage.getItem("userId");

  if (!userId) {
    userId = crypto.randomUUID(); // or use a short UUID generator
    localStorage.setItem("userId", userId);
  }

  return userId;
};
