import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Subjects from './components/Subjects';
import Test from './components/Test';
import Scores from './components/Scores';
import Payment from './components/Payment';
import Admin from './components/Admin';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Subjects />} />
          <Route path="/test/:subjectId" element={<Test />} />
          <Route path="/scores" element={<Scores />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;