import React, { useState } from 'react';

const DeleteRequestModal = ({ isOpen, project, onClose, onDelete }) => {
  const [message, setMessage] = useState('');

  if (!isOpen) return null; // If modal is not open, don't render anything

  const handleSend = (e) => {
    onDelete(message); // Call the parent's onSend function with the message
    setMessage(''); // Reset message
    onClose(e); // Close the modal
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-[400px] shadow-lg">
        <h2 className="text-2xl text-black font-bold mb-4">Are you sure you want to request to delete: <br /> {project.title}</h2>
        <button
          className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 mr-3"
          onClick={(e) => {// Prevent button click from toggling card
            handleSend(e);
          }}
        >
          Delete
        </button>
        <button
          className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 mt-2"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteRequestModal;
