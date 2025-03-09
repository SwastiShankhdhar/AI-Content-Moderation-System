const express = require('express');
const mongoose = require('mongoose');
const User = require('./database/models/User');
const Content = require('./database/models/Content');
const Report = require('./database/models/Reports');
const connectDB = require('./database/db_connection');

connectDB();
const app = express();
app.use(express.json());

app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  const user = new User({ username, email, password });
  await user.save();
  res.status(201).send('User registered');
});

app.post('/content', async (req, res) => {
  const { text } = req.body;
  const content = new Content({ text, flagged: false });
  await content.save();
  res.status(201).send('Content created');
});

app.post('/report', async (req, res) => {
  const { userId, contentId, reason } = req.body;
  const report = new Report({ userId, contentId, reason, resolved: false });
  await report.save();
  res.status(201).send('Report submitted');
});

app.get('/reports', async (req, res) => {
  const reports = await Report.find().populate('userId').populate('contentId');
  res.json(reports);
});

app.listen(5000, () => console.log('Server running on port 5000'));
