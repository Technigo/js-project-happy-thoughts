const ArrowButton = ({ icon, isActive, onClick, ariaLabel }) => {
  return (
    <button
      className={`bg-[#ffadad] w-10 aspect-square rounded-full focus:outline-2 focus:outline-(--color-primary) ${isActive ? 'hover:bg-(--color-primary) cursor-pointer' : 'opacity-50'}`}
      type="button"
      onClick={onClick}
      disabled={!isActive}
      aria-label={ariaLabel}
    >
      {icon}
    </button>
  )
}

export default ArrowButton

