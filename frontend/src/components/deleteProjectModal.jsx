import React, { useState } from 'react';

const DeleteRequestModal = ({ isOpen, project, onClose, onDelete }) => {
  const [message, setMessage] = useState('');

  if (!isOpen) return null; // If modal is not open, don't render anything

  const handleDelete = (e) => {
    onDelete(message); // Call the parent's onDelete function with the message
    setMessage(''); // Reset message
    onClose(e); // Close the modal
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-8 w-[400px] shadow-lg">
        <h2 className="text-2xl text-[#330080] font-bold mb-4">
          Are you sure you want to request to delete: <br /> 
          <div className='text-[#141241] '>
          {project.title}?
          </div>
         
        </h2>
        <p className="text-gray-700 mb-4">
          This action cannot be undone. Please confirm your request.
        </p>
        <div className="flex justify-end">
          <button
            className="py-2 px-4 bg-[red] text-white rounded-lg hover:bg-red-900 transition-colors duration-200 mr-2"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
            className="py-2 px-4 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition-colors duration-200"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteRequestModal;
