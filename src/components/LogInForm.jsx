import { FormInput } from "./FormInput"

export const LogInForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault()
    
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 m-4 border p-4 shadow-[10px_10px] shadow-black bg-gray-100 rounded-xs">

 
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
        autoFocus={autoFocus}
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