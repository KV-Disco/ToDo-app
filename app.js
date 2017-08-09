const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const moment = require('moment-strftime')
const app = express()
const PORT = 3001

let toDoList = []
let finishTask = []
let count = 0

app.set('view engine', 'pug')
app.locals.pretty = true
app.use(express.static(path.join(__dirname, 'public'))) // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })) // parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.render('pages/todo', {toDoList})
})

app.post('/toDoRequest', (req, res) => {
  const time = moment().strftime('%I:%M %p on date %m/%d/%y')
  toDoList.push({
    id: count++,
    task: req.body.todo,
    time: `(Task set at ${time})`})
  // console.log(toDoList)
  res.redirect('/')
})

app.delete('/toDoRequest/:id', (req, res) => {
  const id = +req.params.id
  toDoList = toDoList.filter((toDoList) => toDoList.id !== id)

  res.send('todo ha ido ok')
})

app.put('/compleated/:id', (req, res) => {
  const id = +req.params.id
  const task = toDoList.filter((toDoList) => toDoList.id === id)
  finishTask.push(task[0])
  console.log(finishTask)
  toDoList = toDoList.filter((toDoList) => toDoList.id !== id)
  res.send('PUT is working...')
})

app.get('/compleated', (req, res) => {
  res.render('pages/compleated', {finishTask})
  console.log(finishTask)
})

app.listen(PORT)
