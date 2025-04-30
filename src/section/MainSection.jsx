import { FormCard } from "../components/FormCard"
import { MessageCard } from "../components/MessageCard"


export const MainSection = () => {
  return (
    <section className="bg-lime-200 max-w-md min-h-screen px-5 py-10 mx-auto">
      <FormCard/> 
      <MessageCard />
    </section>
  )
}

