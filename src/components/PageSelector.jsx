import ArrowButton from "./ArrowButton"

const PageSelector = ({ page, maxPages, onChangePage }) => {

  const nextPage = () => {
    onChangePage(page + 1)
  }

  const previousPage = () => {
    onChangePage(page - 1)
  }

  return (
    <div className="flex gap-4 items-center self-center text-sm">
      <ArrowButton icon="<" isActive={(page > 1) ? true : false} onClick={previousPage} ariaLabel="Previous page" />
      <p>Page {page} of {maxPages}</p>
      <ArrowButton icon=">" isActive={page < maxPages} onClick={nextPage} ariaLabel="Next page" />
    </div>
  )
}

export default PageSelector