import { useState } from "react";
import LoginModal from "./LoginModal";

const LoginButton = () => {
  const [open, setOpen] = useState(false)
  // const login = useAuthStore((state) => state.login)

  const handleClick = (e) => {
    e.preventDefault()
    setOpen(true)
  }

  return (
    <>
      <button onClick={handleClick}>Login</button>
      <LoginModal open={open} onClose={() => setOpen(false)} onLogin={login} />
    </>
  )
}

export default LoginButton