const SubmitButton = ({ text, isActive }) => {
  return (
    <button
      className={`bg-[#ffadad] rounded-full py-2 px-5 focus:outline-2 focus:outline-(--color-primary) transition duration-300 ${isActive ? 'cursor-pointer hover:scale-105 active:scale-95' : 'opacity-50'}`}
      type="submit"
      disabled={!isActive}
    >
      <p>
        {text}
      </p>
    </button>
  )
}

export default SubmitButton