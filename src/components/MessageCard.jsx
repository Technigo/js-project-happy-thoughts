import { formatDistanceToNow } from 'date-fns'
import { LikeButton } from './LikeButton'
import { useState } from 'react'




export const MessageCard = ({ message, onLike }) => {

  return (
    <div className="flex flex-col gap-5 bg-white p-5 border rounded-xs shadow-[10px_10px] shadow-black">
      <p>{message.text}</p>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-2' >
          <LikeButton onClick={onLike} />
          <p className='text-gray-400'>x {message.likes}</p>
        </div>
        <p className='text-gray-300 text-sm' >{formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}</p>
      </div>
    </div>

  )
}