import BackToTop from "../components/BackToTop"
import HeartsButton from "../components/HeartsButton"
import { BoardDetails, CardContainer, MessageBoard } from "../components/Styled-Comps"
import TimeStamp from "../components/TimeStamp"

export const MsgBoard = ({ thoughts }) => {
  return (
    <MessageBoard>
      {thoughts.map((t) => (
        <CardContainer key={t._id}>{t.message}
          <BoardDetails>
              <HeartsButton  hearts={t.hearts} id={t._id}/>
              <TimeStamp timeSubmitted={t.createdAt} />
          </BoardDetails>
        </CardContainer>
      ))}
      <BackToTop />
    </MessageBoard>
  )
}

