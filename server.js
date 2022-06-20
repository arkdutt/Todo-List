const express = require('express'); //imports express
const cors = require('cors');

const connection = require('./db')

const app = express() //containing express in a constant named app

app.use(cors());

//The three routes:

//1: shows the list of all the tasks the user has submitted
app.get('/tasks', (req,res) => { //request and response
    res.send('list of all tasks') //sends the response of all the tasks
})

//2: adds any task
app.post('/api/insert/addTask',(req,res) => {
    const ADD_QUERY = "INSERT INTO todoDB.tasks (tasks) values ('${req.body.task}');"
    connection.query(ADD_QUERY, (err) => 
    if(err) console.log(err)
    else res.send('task has been added')
    })


//3: deleting the task
app.get('/deleteTask', (req, res) => {
    res.send('deleted tasks')
})

app.listen(4000, () => {
    console.log("running on port 4000" )
})

//nodemon is used to save the changes