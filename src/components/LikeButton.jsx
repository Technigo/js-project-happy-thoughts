
export const LikeButton = ({ onLike }) => {
  return (
    <button
      type='button' 
      onClick={onLike}
      className="bg-gray-200 rounded-4xl p-4">❤️</button>
  )
}