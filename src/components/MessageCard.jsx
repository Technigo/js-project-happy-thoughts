import { formatDistanceToNow } from "date-fns"
import { LikeButton } from "./LikeButton"

export const MessageCard = ({ message, onLike, onDelete }) => {

  return (
    <div className="flex flex-col gap-5 bg-white p-5 border rounded-xs shadow-[10px_10px] shadow-black h-max break-words">
      <div className="flex justify-between">
        <p className="max-w-full">{message.message}</p>
        <div className="flex gap-3">
          <button
            className="p-2 bg-blue-100 rounded-xl"
            type="button"
          >
            <img
              className="w-5 h-5"
              src="assets/edit.png"
              alt=""
            />
          </button>
          <button
            className="p-2 bg-blue-100 rounded-xl"
            type="button"
            onClick={onDelete}>
            <img
              className="w-5 h-5"
              src="assets/set.png"
              alt="" />
          </button>
        </div>


      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2" >
          <LikeButton
            onLike={onLike}
            likes={message.hearts}
          />
          <p className="text-gray-400 text-sm">x {message.hearts}</p>
        </div>

        <p className="text-gray-300 text-sm max-w-1/2 text-right" >{formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}</p>
      </div>
    </div>
  )
}