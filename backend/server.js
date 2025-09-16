require('dotenv').config();
const express = require('express');

const connectDB = require('./database/db');

const eventRoutes = require('./event-routes/event-routes');

const cors = require('cors');

const app = express();
const port = process.env.PORT || 1997;

app.use(express.json());

app.use(cors()); 


// Connect to the database
connectDB();

// Sample route
app.use('/api/manageEvents', eventRoutes);


// Start the server
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});