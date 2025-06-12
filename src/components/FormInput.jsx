
export const FormInput = ({ id, type, name, label, value, onChange, placeholder, autoComplete, autoFocus }) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={label} className="">
        {name}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        required
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        className="p-2 border rounded bg-white border-gray-300 focus:outline-red-200"
      />
    </div>
  )
}