

export const MessageCard = ({ message }) => {
  return (
    <div className="flex flex-col gap-5 bg-white p-5 border rounded-xs shadow-[10px_10px] shadow-black">
      <p>{message}</p>
      <div>
        <p>icon</p>
        <p>sekunder</p>
      </div>
    </div>

  )
}