import React, { useState, useEffect } from "react";

const IssueModal = ({ isOpen, onClose, onSubmit, initialIssue }) => {
  const [issue, setIssue] = useState({ id: "", title: "", description: "" });

  useEffect(() => {
    if (initialIssue) {
      setIssue(initialIssue);
    } else {
      setIssue({ id: "", title: "", description: "" });
    }
  }, [initialIssue]);

  const handleSubmit = () => {
    onSubmit(issue);
    onClose(); // Close modal after submission
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-bold mb-4">
          {initialIssue ? "Update Issue" : "Create New Issue"}
        </h2>
        <input
          type="text"
          placeholder="ID"
          value={issue.id}
          onChange={(e) => setIssue({ ...issue, id: e.target.value })}
          className="w-full px-3 py-2 mb-2 border rounded hidden"
        />
        <input
          type="text"
          placeholder="Title"
          value={issue.title}
          onChange={(e) => setIssue({ ...issue, title: e.target.value })}
          className="w-full px-3 py-2 mb-2 border rounded"
        />
        <textarea
          placeholder="Description"
          value={issue.description}
          onChange={(e) => setIssue({ ...issue, description: e.target.value })}
          className="w-full px-3 py-2 mb-2 border rounded"
        ></textarea>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            {initialIssue ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default IssueModal;
