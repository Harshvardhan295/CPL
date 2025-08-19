const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;
mongoose.connect(uri)
  .then(() => console.log("MongoDB database connection established successfully!"))
  .catch(err => {
    console.error("MongoDB connection error:");
    console.error(err);
  });

const auctionRouter = require('./routes/auction');
app.use('/api/auction', auctionRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});