const express = require('express');
const cors = require('cors'); // Import the cors middleware

const app = express();

app.use(cors()); // Enable CORS for all routes

app.use(express.json());

const tasks = [];

app.get('/api', (req, res) => {
  res.json({ "users": ["userOne", "userTwo", "userThree", "userFour", "pavan"] });
});

// app.get('/tasks', (req, res) => {
//   res.json(tasks); // Send all tasks to the client
// });

app.post('/tasks', (req, res) => {
  const { title, description } = req.body;
  const newTask = { title, description };
  tasks.push(newTask);
  //res.status(201).json(newTask);
  res.status(201).json(tasks);

});

app.listen(5000, () => {
  console.log("Server has started at port 5000");
});


// const express = require('express');
// const cors = require('cors'); // Import the cors middleware

// const app = express();

// app.use(cors()); // Enable CORS for all routes

// app.use(express.json());

// const tasks = [];

// app.get('/api', (req, res) => {
//   res.json({ "users": ["userOne", "userTwo", "userThree", "userFour", "pavan"] });
// });

// app.post('/tasks', (req, res) => {
//   const { title, description } = req.body;
//   const newTask = { title, description };
//   tasks.push(newTask);
//   res.status(201).json(newTask);
// });

// app.listen(5000, () => {
//   console.log("Server has started at port 5000");
// });
