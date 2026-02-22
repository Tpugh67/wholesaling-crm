const express = require('express');
const path = require('path');
const fs = require('fs'); // for JSON persistence
const app = express();
const PORT = process.env.PORT || 3000;

// Allow JSON parsing
app.use(express.json());

// Serve static files from 'public'
app.use(express.static('public'));

// Path to leads.json
const leadsFile = path.join(__dirname, '../leads.json');

// Load leads from file at startup
let leads = [];
if (fs.existsSync(leadsFile)) {
  leads = JSON.parse(fs.readFileSync(leadsFile));
}

// Get all leads
app.get('/leads', (req, res) => {
  res.json(leads);
});

// Add a new lead
app.post('/leads', (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Prevent duplicate emails
  if (leads.some(l => l.email === email)) {
    return res.status(400).json({ error: 'Lead already exists' });
  }

  const newLead = { id: leads.length + 1, name, email, phone };
  leads.push(newLead);

  // Save leads to file
  fs.writeFileSync(leadsFile, JSON.stringify(leads, null, 2));

  res.status(201).json(newLead);
});

// Serve homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

