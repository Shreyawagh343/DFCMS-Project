import React , {useState , useEffect} from 'react';
import ProgressBar from './ProgressBar';
import { useParams } from 'react-router-dom';

const ProgressBarList = () => {

    const { officerCode } = useParams();
      const [cases, setCases] = useState([]); // State to store fetched cases
      const [error, setError] = useState(null); // State for error handling
    
      // Fetch cases from the backend
      useEffect(() => {
        const fetchCases = async () => {
          const token = localStorage.getItem('authtoken');
          try {
            const response = await fetch(`http://localhost:4001/cases/officer/${officerCode}`, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            });
    
            if (response.status === 401) {
              // Handle unauthorized access
              console.log("Unauthorized access - redirecting to login");
              localStorage.removeItem('authtoken');
              return;
            }
    
            if (!response.ok) {
              throw new Error('Failed to fetch cases');
            }
    
            const data = await response.json();
            console.log("Fetched Data:", data); // Debugging: Log the fetched data
            setCases(data.cases); // Set the fetched cases to state
          } catch (error) {
            console.error("Fetch Error:", error); // Debugging: Log the error
            setError(error.message); // Set error message if something goes wrong
          }
        };
    
        fetchCases();
      }, [officerCode]);
    
  return (
    <div className="task-item">
      <h3>{cases.title}</h3>
      <p>{cases.description}</p>
      <ProgressBar progress={cases.status} />
      <p><strong>Due Date:</strong> {new Date(cases.createdAt).toLocaleDateString()}</p>
    </div>
  );
};

export default ProgressBarList;