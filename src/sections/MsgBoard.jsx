import { CardContainer, MessageBoard, BoardDetails } from "../components/Styled-Comps"
import HeartsButton from "./HeartsButton"
import TimeStamp from "../components/TimeStamp"
import BackToTop from "../components/BackToTop"


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

