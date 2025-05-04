import { motion } from "framer-motion"

export const LikeButton = ({ onLike }) => {
  return (
    <motion.button
      type='button'
      onClick={onLike}
      whileTap={{ scale: 0.8 }}
      whileHover={{ scale: 1.2 }}
      className="bg-gray-200 rounded-4xl p-3">❤️
    </motion.button>
  )
}