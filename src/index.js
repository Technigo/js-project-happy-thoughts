import React. { useState } from "react";
import ReactDOM from "react-dom";
const HelloWorld = () => {
  useEffect(() => {})
console.log("Mounted!");
return () => {
  console.log("Unmounted");
};
});
return <p>Hello world!</p>
};
const App = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    console.log("app effect:", visible;
    });
    return (
      <div>
        button onClick={() => setVisible(prev => !prev)}>Show / Hide</button>
        {visible && <HelloWorld />}
      
      </div>
    )
  })
}
const [thoughts, setThoughts] = useState([])
const handleFormSubmit = (event) => {
  event.preventDefault()
  fetch("<https://technigo-thoughts.herokuapp.com/>", {
    method: "POST",
    body: JSON.stringify({
      message: "Hello world",
    }),
    headers: { "Content-Type": "application/json" },
      })
  }
    .then((res) => res.json())
    .then((newThought) => {
        setThoughts((previousThoughts) => [newThought, ...previousThoughts])

        setNewThought("id 123456")
        setMessage("My happy thought")
        setHearts(0)
        setVisible
        (false)
        {
          "_id": "123456",
          "message": "My happy thought",
          "hearts": 0,
          "createdAt": "2019-11-21T11:31:28.547Z",
          "__v": 0
        }
    })

    const rootelement = document.getElementById("root");