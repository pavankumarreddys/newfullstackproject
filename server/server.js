const express = require('express')
const app = express()

const tasks = [];

app.get('/api',(req,res)=>{
    res.json({"users":["userOne","userTwo","userThree","userFour","pavan"]})
})

// Endpoint to create a new task
app.post('/tasks', (req, res) => {
    const { title, description } = req.body;
    const newTask = { title, description };
    tasks.push(newTask);
    res.status(201).json(newTask);
  });

app.listen(5000,()=>{
console.log("server has started at 5000 port")
})
