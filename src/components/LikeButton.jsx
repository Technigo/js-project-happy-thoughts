const LikeButton = ({ likes, onLike }) => {
  return (
    <button
      className={`bg-(--color-secondary) ${likes > 0 && 'bg-[#ffadad]'} rounded-full focus:outline-2 focus:outline-(--color-primary) p-2 transition duration-300 hover:scale-115 active:scale-90 cursor-pointer`}
      type="button"
      onClick={onLike}
      aria-label="Like thought"
    >
      ❤️
    </button>
  )
}

export default LikeButton