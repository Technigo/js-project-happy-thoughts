import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserForm from "../components/UserForm"

const Register = () => {
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const navigate = useNavigate()

  const url = "http://localhost:8080/users"

  const signUp = async (userName, password) => {
    setError('')
    setMessage('')
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
        if (response.status === 409) {
          setError("Username already exists. Please choose a different one.")
          return
        }
        setError("Registration failed." + data.error)
        return
      }
      setMessage("Registration succsessful! You will be redirected to the log in page shortly.")
      window.scrollTo(0, 0)
      setTimeout(() => navigate("/login"), 3000)
    } catch (error) {
      setError(error.message || "Registration failed.")
    }
  }

  return (
    <section className="flex flex-col items-stretch gap-10 py-10 min-h-screen">
      <UserForm title="Sign up" onSubmit={signUp} error={error} message={message} />
    </section>
  )
}

export default Register