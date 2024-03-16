// Imported required packages
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const routes = require("./routers/router");

// Created express server
const app = express();
mongoose.Promise = global.Promise;


// Connect MongoDB Database
const DB = process.env.MONGO_URI;

mongoose
  .connect(DB)
  .then(() => {
    console.log("Your Database is Connected Successfully !!!");
  })
  .catch((err) => {
    console.log("Something Error " + err);
  });

// Enabled CORS
app.use(cors());

// Convert Incoming Data to JSON Format
app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(`Method: ${req.method} Type: ${res.type}`);
  next();
})

app.use('/employee', routes);

// Setup for the Server Port Number
const PORT = process.env.PORT || 3030;

// Starting our Express Server
const server = app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} successfully`);
});
