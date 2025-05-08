import Message from "./Message";
import { motion, AnimatePresence } from "framer-motion";

const Messages = (props) => {
  return (
    <div className="flex flex-col gap-12">
      {props.messages.map((message) => (
        <motion.div
          key={message._id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <Message
            id={message._id}
            message={message.message}
            time={message.createdAt}
            likes={message.hearts}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default Messages;
