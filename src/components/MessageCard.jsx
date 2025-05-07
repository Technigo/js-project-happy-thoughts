import { formatDistanceToNow } from 'date-fns'
import { LikeButton } from './LikeButton'

export const MessageCard = ({ message, onLike }) => {


  return (
    <div className="flex flex-col gap-5 bg-white p-5 border rounded-xs shadow-[10px_10px] shadow-black h-max break-words">
      <p className='max-w-full'>{message.message}</p>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-2' >
          <LikeButton
            onLike={onLike}
            likes={message.hearts}
          />
          <p className='text-gray-400 text-sm'>x {message.hearts}</p>
        </div>
        <p className='text-gray-300 text-sm max-w-1/2 text-right' >{formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}</p>
      </div>
    </div>

  )
}