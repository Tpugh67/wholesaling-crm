const express = require('express');
const path = require('path');  // 
const app = express();
const PORT = process.env.PORT || 3000;

// Allow JSON parsing
app.use(express.json());

// Serve static files from 'public'
app.use(express.static('public'));

// In-memory storage for leads
let leads = [];

// Get all leads
app.get('/leads', (req, res) => {
  res.json(leads);
});// Add a new lead
app.post('/leads', (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  const newLead = { id: leads.length + 1, name, email, phone };
  leads.push(newLead);
  res.status(201).json(newLead);
});

// Serve homepage at root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// Add a new lead
app.post('/leads', (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const newLead = { id: leads.length + 1, name, email, phone };
  leads.push(newLead);
  res.status(201).json(newLead);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:3000`);
});
