import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:3000/api/issues";

export default function Home() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newIssue, setNewIssue] = useState({
    id: "",
    title: "",
    description: "",
  });

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

  const handleCreate = async () => {
    try {
      const latestIssues = await axios.post(BASE_URL, newIssue);
      setNewIssue({ id: "", title: "", description: "" });
      setShowModal(false);
      fetchIssues();
    } catch (error) {
      console.error("Error creating issue:", error);
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
                    <a
                      href={`/update/${issue.id}`}
                      className="ml-2 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                    >
                      Update
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <button
        onClick={() => setShowModal(true)}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Create New Issue
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">Create New Issue</h2>
            <input
              type="text"
              placeholder="ID"
              value={newIssue.id}
              onChange={(e) => setNewIssue({ ...newIssue, id: e.target.value })}
              className="w-full px-3 py-2 mb-2 border rounded"
            />
            <input
              type="text"
              placeholder="Title"
              value={newIssue.title}
              onChange={(e) =>
                setNewIssue({ ...newIssue, title: e.target.value })
              }
              className="w-full px-3 py-2 mb-2 border rounded"
            />
            <textarea
              placeholder="Description"
              value={newIssue.description}
              onChange={(e) =>
                setNewIssue({ ...newIssue, description: e.target.value })
              }
              className="w-full px-3 py-2 mb-2 border rounded"
            ></textarea>
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
