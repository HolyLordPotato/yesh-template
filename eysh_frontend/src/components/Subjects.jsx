import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Subjects() {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await axios.get('/exam/subjects');
        setSubjects(res.data);
      } catch (error) {
        alert('Error fetching subjects');
      }
    };
    fetchSubjects();
  }, []);

  return (
    <div className="subjects">
      <h2>Subjects</h2>
      <ul>
        {subjects.map(subject => (
          <li key={subject.id}>
            <Link to={`/test/${subject.id}`}>{subject.name}</Link>
          </li>
        ))}
      </ul>
      <Link to="/scores">View Scores</Link>
      <Link to="/payment">Purchase Access</Link>
      <Link to="/admin">Admin Panel</Link>
    </div>
  );
}

export default Subjects;