const express = require('express');
const path = require('path');

const connectDB = require('./config/db');

const app = express();

connectDB();

app.use(express.json());

app.use('/api/posts', require('./routes/api/posts'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Express listening on port ${port}`));
