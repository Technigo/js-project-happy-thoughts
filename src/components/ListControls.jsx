import { useState } from "react"
import SortOption from "./SortOption"
import FilterOption from "./FilterOption"

const ListControls = ({ sortBy, filterOn, onSort, onFilter }) => {
  const [sorting, setSorting] = useState(sortBy)
  const [filter, setFilter] = useState(filterOn)

  const sortOptions = [
    { id: "createdAt", label: "Recent" },
    { id: "hearts", label: "Popular" }
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

        <fieldset className="flex items-center gap-8">
          <legend className="float-left" >Sort on:</legend>
          <div className="flex gap-5">
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
          </div>
        </fieldset>

        <div className="flex items-center gap-6">
          <label className="" htmlFor="tags">Filter on:</label>
          <select
            className="w-40 bg-[#ffeded] border border-(--color-accent) rounded-lg focus:outline-2 focus:outline-(--color-primary) p-1 cursor-pointer"
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

export default ListControls