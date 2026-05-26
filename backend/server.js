const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const store = {
  users: [
    { id: 1, email: 'demo@style.ai', password: 'demo123', name: 'Alex Chen' }
  ],
  sessions: {},
  swipes: {},
  saved: {},
};

app.use('/api/auth', require('./routes/auth')(store));
app.use('/api/products', require('./routes/products'));
app.use('/api/swipe', require('./routes/swipe')(store));
app.use('/api/recommendations', require('./routes/recommendations')(store));
app.use('/api/chat', require('./routes/chat')(store));

const { savedRouter, dashboardRouter } = require('./routes/saved-dashboard');
app.use('/api/saved', savedRouter(store));
app.use('/api/dashboard', dashboardRouter(store));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});

module.exports = { app, store };