import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Scores() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const res = await axios.get('/exam/scores');
        setScores(res.data);
      } catch (error) {
        alert('Error fetching scores');
      }
    };
    fetchScores();
  }, []);

  const data = {
    labels: scores.map(s => s.name),
    datasets: [{
      label: 'Scores',
      data: scores.map(s => (s.score / s.total) * 100),
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }]
  };

  return (
    <div className="scores">
      <h2>Your Scores</h2>
      <Bar data={data} />
    </div>
  );
}

export default Scores;