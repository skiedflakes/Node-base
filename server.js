require('dotenv').config();
const multer = require('multer');
const express = require('express');
const oracledb = require('oracledb');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const ssoRouter = require('./routes/ssoRoutes')

const app = express();

//json parser
app.use(bodyParser.json());

const upload = multer();

// Middleware to handle JSON requests
app.use(express.json());

// Middleware to handle form-data (multipart/form-data)
app.use(upload.none()); // This will parse form-data without files


// Routes
app.use('/api/auth', authRoutes);

app.use('/api/sso',ssoRouter)

app.use('/api',userRoutes);
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

