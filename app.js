const express = require('express')
const app = express()
const port = 3000
const {engine} = require('express-handlebars')

const db = require('./models')
const Todo = db.Todo

app.engine('.hbs',engine({extname:'.hbs'}))
app.set('view engine','.hbs')
app.set('views','./views')

app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.render('index')
})

app.get('/todos',(req,res)=>{
    return Todo.findAll({
        attributes:['id','name'],
        raw: true
    })
        .then ((todos)=>res.render('todos',{todos}))
        .catch((err)=>res.status(422).json(err))
})

app.get('/todos/new',(req,res)=>{
    return res.render('new')
})

app.get('/todos/:id',(req,res)=>{
    res.send(`get todo:${res.params.id}`)
})

app.get('/todos/:id/edit',(req,res)=>{
    res.send(`get todo edit:${res.params.id}`)
})

app.post('/todos',(req,res)=>{
    const name = req.body.name

    return Todo.create({name})
        .then(()=>res.redirect('/todos'))
        .catch((err) => console.log(err))
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