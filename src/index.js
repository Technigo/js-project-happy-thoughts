import React, { useEffect } from "react";
import ReactDOM from "react-dom";
const App = () => {
  const [thoughts, setThoughts] = useState([]);
  useEffect(() => {
    fetch("https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts")
      .then((res) => res.json())
      .then((json) => setThoughts(json))
      .catch((error) => console.error("Error fetching thoughts:", error));
  }, []);

  return (
    <div>
      <h1>Happy Thoughts</h1>
      {/* Render thoughts or other components here */}
    </div>
  );
};
const animationButton = () => {
  // Add your animation logic here or remove this function if not needed
};
const [decrement, setDecrement] = useState(140);
const [count, setCount] = useState(0);
const [loading, setLoading] = useState(true);
setLoading(false);
const [error, setError] = useState(null);
// Removed duplicate declaration of thoughts state
const HelloWorld = () => {
  const [visible, setVisible] = useState(false); // Declare visible state
  useEffect(() => {
    // Add any necessary logic here
  }, []); // Properly close the useEffect function

  return (
    <div>
      <button onClick={() => setVisible((prev) => !prev)}>Show / Hide</button>
      {visible && <div>Hello World</div>}
    </div>
  );
};
  event.preventDefault();
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("https://technigo-thoughts.herokuapp.com/", {
      method: "POST",
      body: JSON.stringify({
        message: "Hello world",
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((newThought) => {
        setThoughts((previousThoughts) => [newThought, ...previousThoughts]);
      })
      .catch((error) => console.error("Error posting thought:", error));
  };
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
// Removed invalid console.log statement
