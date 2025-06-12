import { useState } from "react"
import SortOption from "./SortOption"
import FilterOption from "./FilterOption"

const ControlsCard = ({ sortBy, filterOn, onSort, onFilter }) => {
  const [sorting, setSorting] = useState(sortBy)
  const [filter, setFilter] = useState(filterOn)

  const sortOptions = [
    { id: "createdAt", label: "Recent thoughts" },
    { id: "hearts", label: "Popular thoughts" }
  ]
  const filterOptions = ["all", "travel", "food", "family", "friends", "humor", "nature", "wellness", "home", "entertainment", "work", "other"]

  const onSortingChange = (event) => {
    setSorting(event.target.value)
    onSort(event.target.value)
  }

  const onFilterChange = (event) => {
    setFilter(event.target.value)
    onFilter(event.target.value)
  }

  return (
    <article
      className="px-5 text-sm"
    >
      <form className="flex flex-col gap-3">

        <fieldset className="flex items-center justify-between">
          <legend className="float-left" >Sort on:</legend>
          {sortOptions.map(({ id, label }) => (
            <SortOption
              key={id}
              radioGroup="sortBy"
              id={id}
              label={label}
              isChecked={sorting === id}
              onChange={onSortingChange}
            />
          ))}
        </fieldset>

        <div className="flex items-center gap-2">
          <label className="w-25" htmlFor="tags">Filter on:</label>
          <select
            className="bg-[#ffeded] border border-(--color-accent) rounded-lg focus:outline-2 focus:outline-(--color-primary) w-full p-1 cursor-pointer"
            name="tags"
            id="tags"
            value={filter}
            onChange={onFilterChange}
          >
            {filterOptions.map((option) => (
              <FilterOption key={option} value={option} />
            ))}
          </select>
        </div>
      </form>
    </article>
  )
}

export default ControlsCard