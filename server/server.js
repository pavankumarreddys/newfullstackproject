const express = require('express');
const mysql = require('mysql')
const cors = require('cors'); // Import the cors middleware
const app = express();
const bcrypt = require('bcrypt')

app.use(cors()); // Enable CORS for all routes
app.use(express.json());

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"signup" // this is name of database name php my-admin lo new ni click cesi database name eekada undala
})

const tasks = [];

app.get('/api', (req, res) => {
  res.json({ "users": ["userOne", "userTwo", "userThree", "userFour", "pavan"] });
});

// app.get('/tasks', (req, res) => {
//   res.json(tasks); // Send all tasks to the client
// });

app.post('/tasks', (req, res) => {
  const { title, description } = req.body;
  if(!title || !description){
    res.status(400).json({ error: "Title and description are required" });
  }else{
      const newTask = { title, description };
      tasks.push(newTask);
      res.status(201).json(tasks);
    }
});

app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const selectedQuery = "SELECT * FROM userlogin WHERE email = ?";
    const values = [email];

    // Use a promise-based approach to query the database
    const dbuser = await new Promise((resolve, reject) => {
        db.query(selectedQuery, values, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results[0]); // Assuming you expect only one matching record
            }
        });
    });

    if (dbuser === undefined) {
        const sql = "INSERT INTO userlogin (`name`, `email`, `password`) VALUES (?, ?, ?)";
        const insertValues = [
            name,
            email,
            hashedPassword
        ];

        db.query(sql, insertValues, (err, data) => {
            if (err) {
                console.error("Error:", err);
                return res.json("Error");
            }
            console.log("Insert Successful. Data:", data);
            return res.json(data);
        });
    } else {
        res.status(400).send("Email already exists");
    }
});



app.post('/login', async (req, res) => {
    const sql = "SELECT * FROM userlogin WHERE `email` = ?";
    db.query(sql, [req.body.email], async (err, data) => {
        if (err) {
            return res.json("Error");
        }

        if (data.length === 0) {
            return res.json("Login Failed");
        }

        const user = data[0];
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if (isPasswordValid) {
            // Passwords match, user is authenticated
            return res.json("Login Successful");
        } else {
            // Passwords do not match, login failed
            return res.json("Login Failed");
        }
    });
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
