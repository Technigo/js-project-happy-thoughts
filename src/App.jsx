import { MainSection } from "./section/MainSection"
import { useState } from "react";
import { MessageText } from "./components/MessageText";



export const App = () => {

  
  const [message, setMessage] = useState('');

  
  const handleSubmit = (e) => {
    e.preventDefault(); 
    setMessage(message);
  };

  const addText = (text) => {
    setMessage(text)
  }





  return (
    <>
      <MainSection/> 
    </>
  )
}
