import React from 'react'

const Pagination = ({ totalMembers, membersPerPage, currentPage, setCurrentPage }) => {
  let pages = [];
  for (let i = 1; i <= Math.ceil(totalMembers / membersPerPage); i++) {
    pages.push(i);
  }

  return (
    <div className='flex flex-row justify-between'>
      {
        pages.map((page, index) => {
          return <button 
          key={index} 
          onClick={() => {setCurrentPage(page)}}
          className={`${page === currentPage ? "bg-blue-500 hover:bg-blue-400 active:bg-blue-600" : "bg-gray-600 hover:bg-gray-500 active:bg-gray-700"} w-10 h-10 mx-1 rounded`}
          >
            {page}
          </button>
        })
      }
    </div>
  )
}

export default Pagination
