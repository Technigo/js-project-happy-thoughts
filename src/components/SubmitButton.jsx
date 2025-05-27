import { motion } from "motion/react"

const SubmitButton = ({ isActive }) => {
  return (
    <motion.button
      className={`bg-[#ffadad] rounded-full py-2 px-5 ${isActive ? 'cursor-pointer' : 'opacity-50'}`}
      type="submit"
      disabled={!isActive}
      whileHover={isActive ? { scale: 1.05 } : { scale: 1 }}
      whileTap={isActive ? { scale: 0.95 } : { scale: 1 }}
    >
      <p>
        ❤️ Send Happy Thought ❤️
      </p>
    </motion.button>
  )
}

export default SubmitButton