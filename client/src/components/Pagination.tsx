import type React from "react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {

  if(!totalPages) return  // * won't show the pagination if the data is n't there
  
  return (
    <div className="flex justify-center items-center mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-l transition duration-300 disabled:opacity-50"
      >
        Previous
      </button>
      <span className="bg-gray-200 text-gray-800 font-bold py-2 px-4">
        {currentPage} of {totalPages}
      </span>
      <button
        onClick={(e) =>{
          e.preventDefault()
          if(currentPage !== totalPages)
            onPageChange(currentPage + 1)
        }}
        disabled={currentPage > totalPages}
        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-r transition duration-300 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  )
}

export default Pagination

