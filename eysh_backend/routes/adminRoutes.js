const express = require('express');
const router = express.Router();
const pool = require('../db');

// Add subject
router.post('/subjects', async (req, res) => {
  const { name } = req.body;

  try {
    await pool.query('INSERT INTO subjects (name) VALUES ($1)', [name]);
    res.json({ message: 'Subject added' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all subjects
router.get('/subjects', async (req, res) => {
  try {
    const subjects = await pool.query('SELECT * FROM subjects');
    res.json(subjects.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add question
router.post('/questions', async (req, res) => {
  const { subjectId, question, options, correctAnswer } = req.body;

  try {
    await pool.query('INSERT INTO questions (subject_id, question, options, correct_answer) VALUES ($1, $2, $3, $4)', [subjectId, question, JSON.stringify(options), correctAnswer]);
    res.json({ message: 'Question added' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all questions
router.get('/questions', async (req, res) => {
  try {
    const questions = await pool.query('SELECT * FROM questions');
    res.json(questions.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;