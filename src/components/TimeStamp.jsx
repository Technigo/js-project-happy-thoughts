import moment from "moment"
import styled from "styled-components"

const TimeStyle = styled.p`
  color: #a2a3a4;
`

const TimeStamp = ({ timeSubmitted }) => {
  const msgTimeStamp = moment(timeSubmitted).fromNow()

  return  <TimeStyle>{msgTimeStamp}</TimeStyle>
}

export default TimeStamp