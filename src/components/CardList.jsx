import Card from "./Card.jsx"

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


