import React from 'react'

const PopupModal = ({ toggleModal }) => {
  return (
    <div className='w-full h-full fixed'>
      <div 
      onClick={toggleModal}
      className='w-full h-full top-0 right-0 left-0 bottom-0 backdrop-blur-sm bg-slate-800/50 flex justify-center'
      >
        <div className='mt-10 absolute p-4 max-w-60 max-h-60 bg-slate-400'>
          <h1>hello</h1>
          <button
          onClick={toggleModal}
          >
            close
          </button>
        </div>
      </div>
    </div>
  )
}

export default PopupModal;
