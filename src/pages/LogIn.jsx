import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import UserForm from "../components/UserForm"

const LogIn = () => {
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const navigate = useNavigate()
  const { login } = useAuth()

  const url = "http://localhost:8080/users/login"

  const handleLogIn = async (userName, password) => {
    setError("")
    setMessage("")
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ userName, password }),
        headers: {
          "Content-Type": "application/json"
        }
      })
      const data = await response.json()
      if (!response.ok) {
        if (response.status === 404) {
          setError("Username not found. Please check your username and try again.")
          return
        }
        if (response.status === 401) {
          setError("Incorrect password. Please try again.")
          return
        }
        setError("Login failed." + data.error)
        return
      }
      const user = data.response
      login({ id: user.id, username: user.userName }, user.accessToken)
      setMessage("Login successful! You will be redirected to the home page shortly.")
      window.scrollTo(0, 0)
      navigate("/")
    } catch (error) {
      setError(error.message || "Failed to log in.")
    }
  }

  return (
    <section className="flex flex-col items-stretch gap-10 py-10 min-h-screen">
      <UserForm title="Log in" onSubmit={handleLogIn} error={error} message={message} />
    </section>
  )
}

export default LogIn