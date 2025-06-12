import UserForm from "../components/UserForm"

const Home = () => {
  return (
    <section className="flex flex-col gap-10 py-10 min-h-screen">
      <h1 className="pb-2 text-(--color-text) text-center text-2xl font-bold">
        Welcome to Happy Thoughts!
      </h1>
      <UserForm title="Log in" />
    </section>
  )
}

export default Home