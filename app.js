const express = require('express')
const app = express()
const port = 3000

const db = require('./models')
const Todo = db.Todo

app.get('/',(req,res)=>{
    res.send('hello world')
})

app.get('/todos',(req,res)=>{
    return Todo.findAll()
        .then ((todos)=>res.send({todos}))
        .catch((err)=>res.status(422).json(err))
})

app.get('/todos/new',(req,res)=>{
    res.send('create todo')
})

app.get('/todos/:id',(req,res)=>{
    res.send(`get todo:${res.params.id}`)
})

app.get('/todos/:id/edit',(req,res)=>{
    res.send(`get todo edit:${res.params.id}`)
})

app.post('/todos',(req,res)=>{
    res.send('add todo')
})

app.put('todos/id',(req,res)=>{
    res.send('modify todo')
})

app.delete('todos/:id',(req,res)=>{
    res.send('delete todo')
})

app.listen(3000,()=>{
    console.log('App is running on port 3000')
})