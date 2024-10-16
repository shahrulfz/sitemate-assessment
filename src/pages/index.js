import { useEffect, useState } from "react";
import axios from "axios";
import IssueModal from "@/components/IssueModal"; // Adjust the path if necessary

const BASE_URL = "http://localhost:3000/api/issues";

export default function Home() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [currentIssue, setCurrentIssue] = useState(null);

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      const response = await axios.get(BASE_URL);
      setIssues(response.data);
    } catch (error) {
      console.error("Error fetching issues:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (newIssue) => {
    try {
      await axios.post(BASE_URL, newIssue);
      fetchIssues();
    } catch (error) {
      console.error("Error creating issue:", error);
    }
  };

  const handleUpdate = async (updatedIssue) => {
    try {
      await axios.put(`${BASE_URL}/${updatedIssue.id}`, updatedIssue);
      fetchIssues();
    } catch (error) {
      console.error("Error updating issue:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      fetchIssues(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting issue:", error);
    }
  };

  const openCreateModal = () => {
    setIsUpdateMode(false);
    setShowModal(true);
  };

  const openUpdateModal = (issue) => {
    setCurrentIssue(issue);
    setIsUpdateMode(true);
    setShowModal(true);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Issues</h1>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">ID</th>
                <th className="px-4 py-2 border-b">Title</th>
                <th className="px-4 py-2 border-b">Description</th>
                <th className="px-4 py-2 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {issues.map((issue) => (
                <tr key={issue.id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border-b">{issue.id}</td>
                  <td className="px-4 py-2 border-b">{issue.title}</td>
                  <td className="px-4 py-2 border-b">{issue.description}</td>
                  <td className="px-4 py-2 border-b">
                    <button
                      onClick={() => handleDelete(issue.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => openUpdateModal(issue)}
                      className="ml-2 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <button
        onClick={openCreateModal}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Create New Issue
      </button>

      <IssueModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setCurrentIssue(null); // Reset current issue
        }}
        onSubmit={isUpdateMode ? handleUpdate : handleCreate}
        initialIssue={currentIssue}
      />
    </div>
  );
}
