import React, { useState } from 'react';

const JoinRequestModal = ({ isOpen, project, onClose, onSend }) => {
  const [message, setMessage] = useState('');

  if (!isOpen) return null; // If modal is not open, don't render anything

  const handleSend = () => {
    onSend(message); // Call the parent's onSend function with the message
    setMessage(''); // Reset message
    onClose(); // Close the modal
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-[400px] shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Request to Join: {project.title}</h2>
        <textarea
          placeholder="Write your message here..."
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />
        <button
          className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
          onClick={handleSend}
        >
          Send Request
        </button>
        <button
          className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 mt-2"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default JoinRequestModal;
