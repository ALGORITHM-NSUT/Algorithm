import React, { useState } from 'react';

const AddProject = ({ refreshProjects }) => {
  const [showForm, setShowForm] = useState(false);
  const [projectData, setProjectData] = useState({
    title: '',
    description: '',
    lead: '',
    contributors: [],
    githubUrl: '',
  });

  // Reset project data
  const resetProjectData = () => {
    setProjectData({
      title: '',
      description: '',
      lead: '',
      contributors: [],
      githubUrl: '',
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/addProject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify({
          projectData
        })
      });
      refreshProjects();
      setShowForm(false); // Close the form after submission
      // resetProjectData();
      const data = await response.json();
      console.log('Response data:', data);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  // Add a contributor field
  const handleAddContributor = () => {
    setProjectData((prevData) => ({
      ...prevData,
      contributors: [...prevData.contributors, '']
    }));
  };

  // Handle contributor input change
  const handleContributorChange = (index, value) => {
    const updatedContributors = [...projectData.contributors];
    updatedContributors[index] = value;
    setProjectData((prevData) => ({
      ...prevData,
      contributors: updatedContributors
    }));
  };

  // Remove a contributor field
  const handleRemoveContributor = (index) => {
    const updatedContributors = [...projectData.contributors];
    updatedContributors.splice(index, 1);
    setProjectData((prevData) => ({
      ...prevData,
      contributors: updatedContributors
    }));
  };

  // Handle form cancel (close form and reset)
  const handleCancel = () => {
    setShowForm(false); // Close form
    resetProjectData(); // Reset fields
  };

  return (
    <div className="relative flex items-center">
      {/* Plus card to open form */}
      <div
        className="bg-gray-700/30 w-full p-4 h-[680px] rounded-lg shadow-lg cursor-pointer flex items-center justify-center text-white align-middle hover:bg-gray-700/60 backdrop-blur-xl"
        onClick={() => setShowForm(!showForm)}
      >
        <span className="text-5xl">+</span>
      </div>

      {showForm && (
        <span onClick={(e) => e.stopPropagation()}>
          <div className="absolute w-full top-0 left-0 bg-gray-700/30 p-4 min-h-[680px] rounded-lg shadow-lg z-10 h-fit backdrop-blur-xl">
            <h3 className="text-3xl font-bold mb-4 md:text-3xl md:text-wrap">Add New Project</h3>

            {/* Project form */}
            <form onSubmit={handleSubmit} className="bg-gray-800 p-4 rounded-lg shadow-lg min-h-[590px]">
              <div className="mb-4">
                <label className="block text-gray-300">Title:</label>
                <input
                  type="text"
                  value={projectData.title}
                  onChange={(e) => setProjectData({ ...projectData, title: e.target.value })}
                  className="w-full p-2 rounded text-black"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-300">Description:</label>
                <textarea
                  value={projectData.description}
                  onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
                  className="w-full p-2 rounded text-black"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-300">Lead:</label>
                <input
                  type="text"
                  value={projectData.lead}
                  onChange={(e) => setProjectData({ ...projectData, lead: e.target.value })}
                  className="w-full p-2 rounded text-black"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-300">GitHub URL:</label>
                <input
                  type="text"
                  value={projectData.githubUrl}
                  onChange={(e) => setProjectData({ ...projectData, githubUrl: e.target.value })}
                  className="w-full p-2 rounded text-black"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-300">Contributors:</label>
                <div className="max-h-[96px] overflow-y-auto scrollbar-blue">
                  {projectData.contributors.map((contributor, index) => (

                    <div key={index} className="flex items-center mb-2">
                      <input
                        type="text"
                        value={contributor}
                        onChange={(e) => handleContributorChange(index, e.target.value)}
                        className="w-full p-2 rounded text-black"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveContributor(index);
                        }}
                        className="ml-2 text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddContributor();
                  }}
                  className="text-blue-500"
                >
                  Add Contributor
                </button>
              </div>

              {/* Form buttons */}
              < div className="flex justify-end" >
                <button type="button" onClick={handleCancel} className="text-gray-500 mr-4">
                  Cancel
                </button>
                <button type="submit" className="bg-green-500 text-white p-2 rounded-lg">
                  Add Project
                </button>
              </div>
            </form>
          </div>
        </span>
      )}
    </div>
  );
};

export default AddProject;
