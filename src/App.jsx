import Header from "./sections/Header"
import MainSection from "./sections/MainSection"
import Footer from "./sections/Footer"

const App = () => {
  return (
    <>
      <div
        className="max-w-md px-4 mx-auto"
      >
        <Header />
        <MainSection />
        <Footer />
      </div>

    </>
  )
}

export default App
