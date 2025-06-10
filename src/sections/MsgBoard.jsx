import { useTheme } from "styled-components"
import BackToTop from "../components/BackToTop"
import DeleteButton from "../components/DeleteButton"
import HeartsButton from "../components/HeartsButton"
import { BoardDetails, CardContainer, MessageBoard } from "../components/Styled-Comps"
import TimeStamp from "../components/TimeStamp"
import { useThoughtStore } from "../store/useThoughtStore"

export const MsgBoard = () => {
  const thoughts = useThoughtStore(state => state.thoughts)

  return (
    <MessageBoard>
      {thoughts.map((t) => (
        <CardContainer key={t._id}>{t.message}
          <BoardDetails>
              <HeartsButton  hearts={t.hearts} id={t._id} />
              <TimeStamp timeSubmitted={t.createdAt} />
              <DeleteButton id={t._id} />
          </BoardDetails>
        </CardContainer>
      ))}
      <BackToTop />
    </MessageBoard>
  )
}

