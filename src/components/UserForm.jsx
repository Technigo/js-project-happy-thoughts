import { useState } from "react"
import { Link } from "react-router-dom"
import UserFormInput from "./UserFormInput"
import SubmitButton from "./SubmitButton"

const UserForm = ({ title, onSubmit, error, message }) => {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  })
  const [formError, setFormError] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault()
    setFormError("")
    if (!formData.userName || !formData.password) {
      setFormError("Please fill in both fields")
      return
    }
    onSubmit(formData.userName, formData.password)
    event.target.reset()
  }

  return (
    <article className="flex flex-col items-center gap-10 bg-white border border-black border-solid shadow-[10px_10px] shadow-black p-10">
      <form
        className="flex flex-col gap-8 w-full"
        onSubmit={handleSubmit}
      >
        <div>
          <h2 className="pb-1 text-(--color-text) text-xl font-semibold" >{title}</h2>
        </div>
        {error && <p className="font-mono text-red-500">{error}</p>}
        {message && <p className="font-mono text-green-600">{message}</p>}
        <UserFormInput
          type="userName"
          onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
          value={formData.userName}
        />
        <UserFormInput
          type="password"
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          value={formData.password}
        />
        {formError && <p className="text-red-500">{error}</p>}
        <SubmitButton text={title} isActive="true" />
      </form>

      <div className="flex flex-wrap justify-center gap-x-2 gap-y-1 text-sm text-center">
        <p>{title === 'Log in' ? "Don't have an account?" : 'Already have an account?'}</p>
        <Link
          className="text-(--color-text) underline cursor-pointer"
          to={title === 'Log in' ? '/register' : '/login'}
        >
          {title === 'Log in' ? 'Sign up' : 'Log in'}
        </Link>
      </div>
    </article>
  )
}

export default UserForm