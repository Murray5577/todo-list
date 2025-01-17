const express = require('express')
const app = express()
const port = 3000
const {engine} = require('express-handlebars')
const methodOverride = require('method-override')

const db = require('./models')
const Todo = db.Todo

app.engine('.hbs',engine({extname:'.hbs'}))
app.set('view engine','.hbs')
app.set('views','./views')

app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))

app.get('/',(req,res)=>{
    res.render('index')
})

app.get('/todos',(req,res)=>{
    return Todo.findAll({
        attributes:['id','name','isComplete'],
        raw: true
    })
        .then ((todos)=>res.render('todos',{todos}))
        .catch((err)=>res.status(422).json(err))
})

app.get('/todos/new',(req,res)=>{
    return res.render('new')
})

app.get('/todos/:id',(req,res)=>{
    const id = req.params.id

    return Todo.findByPk(id,{
        attributes: ['id', 'name', 'isComplete'],
        raw:true
    })
        .then((todo)=>res.render('todo',{todo}))
        .catch((err)=>console.log(err))
})

app.get('/todos/:id/edit',(req,res)=>{
    const id = req.params.id

    return Todo.findByPk(id, {
        attributes: ['id', 'name', 'isComplete'],
        raw: true
    })
        .then((todo) => res.render('edit', { todo }))   
})

app.post('/todos',(req,res)=>{
    const name = req.body.name

    return Todo.create({ name })
        .then(()=>res.redirect('/todos'))
        .catch((err) => console.log(err))
})

app.put('/todos/:id',(req,res)=>{
    const {name,isComplete} = req.body
    const id = req.params.id

    return Todo.update({name,isComplete:isComplete ==='completed'}, { where: { id } })
        .then(() => res.redirect(`/todos/${id}`))
})

app.delete('/todos/:id',(req,res)=>{
    const id = req.params.id

    return Todo.destroy({where:{id}})
        .then(()=>res.redirect('/todos'))
})

app.listen(3000,()=>{
    console.log('App is running on port 3000')
})