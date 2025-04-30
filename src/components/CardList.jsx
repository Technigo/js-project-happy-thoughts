import Card from "./Card.jsx"

//CardList renders a list of cards, one for each message. No styling only data
const CardList = ({ messages }) => {
  return (
    <>
      {messages.map((msg) => (
        <Card key={msg.id} message={msg.text} />
      ))}
    </>
  )
}

export default CardList


