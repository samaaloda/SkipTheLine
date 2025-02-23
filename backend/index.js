const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes-services/userRoutes')
const rideRouter = require('./routes-services/rideRoutes')
const queueRouter = require('./routes-services/quequesRoutes')
require('dotenv').config();
const cors = require("cors");
const app = express();

app.use(cors({
  origin: "*",  // Allow all origins
  methods: ["GET", "POST", "PUT", "DELETE"],  // Restrict allowed HTTP methods
}));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

app.use(express.json());


app.use('/', userRouter)
app.use('/', rideRouter)
app.use('/', queueRouter)





app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});