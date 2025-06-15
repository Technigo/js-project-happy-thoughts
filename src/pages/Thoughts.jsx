import { useAuth } from "../context/AuthContext"

const Thoughts = () => {
  const { currentUser } = useAuth()

  return (
    <section className="flex flex-col gap-10 py-10 min-h-screen">
      <h1 className="pb-2 text-(--color-text) text-center text-2xl font-bold">
        Welcome {currentUser.username}!
      </h1>
      <p> A list of a logged in users thoughts and liked thoughts will be displayed here. </p>
    </section>
  )
}

export default Thoughts