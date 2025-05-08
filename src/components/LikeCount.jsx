import { motion } from "framer-motion"
import { heartTransition, heartVariants } from "./Loader"

export const LikeCount = ({ likeCount }) => {
  return (
    <div className="flex justify-center items-center my-5 border bg-red-100 rounded-xs shadow-[10px_10px] shadow-black p-4">
      <p className="flex items-center text-center">
        <motion.span
          className="inline-block tect-2xl"
          initial="initial"
          animate="animate"
          variants={heartVariants}
          transition={heartTransition}
        > ❤️
        </motion.span>
        You have liked {likeCount} messages
        <motion.span
          className="inline-block tect-2xl"
          initial="initial"
          animate="animate"
          variants={heartVariants}
          transition={heartTransition}
        > ❤️
        </motion.span>
      </p>
    </div>
  )
} 