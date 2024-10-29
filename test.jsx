{isExpanded && (
  <div
    className="fixed inset-0 bg-black bg-opacity-50 z-20"
    onClick={toggleExpand}
  ></div>
)}
<div
  onClick={toggleExpand}
  className={relative p-4 w-full rounded-lg transition-all duration-300 ease-in-out cursor-pointer 
    ${isExpanded ? 'scale-110 z-30' : 'z-10'}}
>