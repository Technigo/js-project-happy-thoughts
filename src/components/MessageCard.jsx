import { MessageText } from "./MessageText"

export const MessageCard = () => {
  return (
    <div className="flex flex-col gap-5 bg-white p-5 border rounded-xs shadow-[10px_10px] shadow-black">
      <MessageText/>
      <div>
        <p>icon</p>
        <p>sekunder</p>
      </div>
    </div>

  )
}