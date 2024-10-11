import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:3000/api/issues";

export default function Home() {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      const response = await axios.get(BASE_URL);
      setIssues(response.data);
    } catch (error) {
      console.error("Error fetching issues:", error);
    }
  };

  return (
    <div>
      <h1>Issues</h1>
      <ul>
        {issues.map((issue) => (
          <li key={issue.id}>
            <h2>{issue.title}</h2>
            <p>{issue.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
