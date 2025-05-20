import { useState, useEffect } from "react"
import { Loader } from "../components/Loader"
import { CardContainer, MessageBoard, BoardDetails } from "./Form"
import HeartsButton from "./HeartsButton"
import TimeStamp from "../components/TimeStamp"


export const MsgBoard = () => {
  const [thoughts, setThoughts] = useState([])
  const [loading, setLoading] = useState(false)

  const url = "https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts"

  // 1. Fetch Data
  const fetchAPI = async () => {
    setLoading(true)
    try {
      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        // set the state
        console.log(data)
        setThoughts(data)
      }
    } catch(error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAPI()
  }, [])

  if (loading) {
    return <Loader />
  } 

  return (
    <MessageBoard>
      {thoughts.map((e) => (
        <CardContainer key={e} >{e.message}
          <BoardDetails>
              <HeartsButton />
              <TimeStamp />
          </BoardDetails>
        </CardContainer>
      ))}
    </MessageBoard>
  )
}

