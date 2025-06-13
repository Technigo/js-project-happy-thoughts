import { FormInput } from "./FormInput"

export const LogInForm = () => {
  // const url = "https://js-project-api-mk0z.onrender.com/users"
  // Local API
  const url = "http://localhost:8080/users/login"

  const handleSubmit = (event) => {
    event.preventDefault()

  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 m-4 border p-4 shadow-[10px_10px] shadow-black bg-gray-100 rounded-xs">
      <h1 className="text-2xl font-bold text-center mb-2">
        Login to your account
      </h1>
      <FormInput
        id={"email"}
        type={"email"}
        name={"Email"}
        label={"email"}
        placeholder={"Bob@test.com"}
        value={""}
        onChange={() => { }}
        required={true}
        autoComplete="off"
        autoFocus={true}
      />
      <FormInput
        id={"password"}
        type={"password"}
        name={"Password"}
        label={"password"}
        placeholder={"********"}
        value={""}
        onChange={() => { }}
        required={true}
        autoComplete="new-password"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Sign In
      </button>
    </form>
  )
}