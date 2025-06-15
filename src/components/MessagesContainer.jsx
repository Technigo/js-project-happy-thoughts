import MessageCard from "./MessageCard"
import PageSelector from "./PageSelector"

const MessagesContainer = ({ messages, page, maxPages, onChangePage, onFilter, update }) => {

  return (
    <div
      className="flex flex-col gap-10"
    >
      {messages.map((message) => {
        return (
          <MessageCard
            key={message._id}
            message={message}
            onFilter={onFilter}
            update={update}
          />
        )
      })}
      <PageSelector page={page} maxPages={maxPages} onChangePage={onChangePage} />
    </div>
  )
}

export default MessagesContainer