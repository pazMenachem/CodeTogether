const express = require('express');
const connectDB = require('./config/db');

const app = express()

// connect database
connectDB();

//init middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

// define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/project', require('./routes/api/project'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server started on port 5000'));