const UserFormInput = ({ type, onChange, value }) => {
  return (
    <div className="flex flex-col gap-2" >
      <label htmlFor={type}>{type === "userName" ? "User name" : "Password"}</label>
      <input
        className="bg-white border border-gray-400 w-full p-2 font-mono focus:outline-(--color-accent)"
        type={type === "password" ? { type } : "text"}
        name={type}
        id={type}
        placeholder={type === "userName" ? "user name" : "password"}
        onChange={onChange}
        value={value}
        required
      />
    </div>
  )
}

export default UserFormInput