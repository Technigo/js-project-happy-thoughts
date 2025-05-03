import { MainSection } from "./section/MainSection"
import { useState } from "react";
import { MessageCard } from "./components/MessageCard";






export const App = () => {

  const [message, setMessage] = useState('');


  return (
    <>
      <MainSection
        message={message}
        setMessage={setMessage} />
    </>
  )
}
