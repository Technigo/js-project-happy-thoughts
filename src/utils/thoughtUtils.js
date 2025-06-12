export const addUniqueSortedThought = (prevThoughts, newThought) => {
  const withoutDuplicate = prevThoughts.filter((t) => t.id !== newThought.id);
  return [newThought, ...withoutDuplicate].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
};
