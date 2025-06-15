import { useState } from "react"

const Tag = ({ tag, onSelect, onFilter }) => {
  const [selected, setSelected] = useState(false)

  const handleClick = (event) => {
    event.preventDefault()
    if (onSelect) {
      setSelected(!selected)
      onSelect(tag)
      return
    }
    if (onFilter) {
      onFilter(tag)
    }
  }

  return (
    <li
      className={`px-3 py-2 text-xs ${selected ? "bg-(--color-primary)" : "bg-[#ffeded]"}`}
    >
      <button type="button" onClick={handleClick} className="cursor-pointer">
        {tag}
      </button>
    </li>
  )
}

export default Tag