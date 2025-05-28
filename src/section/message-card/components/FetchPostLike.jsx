
export const FetchPostLike.jsx = () => {

  fetch("https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts", {
    method: "POST",
    body: JSON.stringify({
      message: userInput,
    }),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((newThought) => {
      setApiNewId(newThought._id)
      // setMessages((previousThoughts) => [newThought, ...previousThoughts])
    })
  comment(event, userInput);
};
