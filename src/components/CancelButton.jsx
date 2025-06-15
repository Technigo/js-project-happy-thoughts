const CancelButton = ({ onClick }) => {
  return (
    <button
      className="bg-[#ffadad] rounded-full focus:outline-2 focus:outline-(--color-primary) py-2 px-5 text-sm cursor-pointer"
      type="button"
      onClick={onClick}
    >
      <p>
        Cancel
      </p>
    </button >
  )
}

export default CancelButton