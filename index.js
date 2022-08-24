import app from './app.js';
import path from 'path';
import express from 'express';
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/mui-react/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/mui-react/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log('server running on localhost:5000'));
