import { motion } from "motion/react"

const LikeButton = ({ likes, onLike }) => {
  return (
    <motion.button
      className={`bg-(--color-secondary) ${likes > 0 && 'bg-[#ffadad]'} rounded-full p-2 cursor-pointer`}
      type="button"
      onClick={onLike}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
    >
      ❤️
    </motion.button>
  )
}

export default LikeButton