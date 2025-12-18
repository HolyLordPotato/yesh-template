import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function Test() {
  const { subjectId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(`/exam/questions/${subjectId}`);
        setQuestions(res.data);
      } catch (error) {
        alert('Error fetching questions');
      }
    };
    fetchQuestions();
  }, [subjectId]);

  const handleSubmit = async () => {
    try {
      await axios.post(`/exam/submit/${subjectId}`, { answers });
      navigate('/scores');
    } catch (error) {
      alert('Error submitting test');
    }
  };

  return (
    <div className="test">
      <h2>Test</h2>
      {questions.map(q => (
        <div key={q.id}>
          <p>{q.question}</p>
          {q.options.map((opt, i) => (
            <label key={i}>
              <input
                type="radio"
                name={q.id}
                value={opt}
                onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
              />
              {opt}
            </label>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default Test;