import { GlobalStyles } from './GlobalStyles'
import { Message } from './components/Message'
import { TextBox } from './components/TextBox'
import { LikeCounter } from './components/LikeCounter'
import { Loader } from './components/Loader'
import { useThoughts } from './hooks/useThoughts'

export const App = () => {
  const { thoughts, loading, error, newMessageId, addThought } = useThoughts()

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <div className='error-message'>{error}</div>
  }

  return (
    <div className='App'>
      <GlobalStyles />
      <TextBox onSubmit={addThought} />
      <LikeCounter />
      {Array.isArray(thoughts) &&
        thoughts.map((thought) => {
          // Extract the proper ID, handling both API and local messages
          const messageId =
            thought._id || thought.id || Math.random().toString()

          return (
            <Message
              key={messageId}
              id={messageId}
              message={thought.message || ''}
              isNew={messageId === newMessageId}
              hearts={thought.hearts || 0}
              createdAt={thought.createdAt || thought.date || ''}
            />
          )
        })}
    </div>
  )
}
