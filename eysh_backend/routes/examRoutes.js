const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get subjects
router.get('/subjects', async (req, res) => {
  try {
    const subjects = await pool.query('SELECT * FROM subjects');
    res.json(subjects.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get questions for a subject
router.get('/questions/:subjectId', async (req, res) => {
  const { subjectId } = req.params;
  try {
    const questions = await pool.query('SELECT * FROM questions WHERE subject_id = $1', [subjectId]);
    res.json(questions.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Submit answers
router.post('/submit/:subjectId', async (req, res) => {
  const { subjectId } = req.params;
  const { answers } = req.body;

  try {
    let score = 0;
    const total = Object.keys(answers).length;

    for (const [questionId, answer] of Object.entries(answers)) {
      const correct = await pool.query('SELECT correct_answer FROM questions WHERE id = $1', [questionId]);
      if (correct.rows[0].correct_answer === answer) score++;
    }

    res.json({ score, total });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get scores for chart
router.get('/scores', async (req, res) => {
  res.json([]);
});

module.exports = router;