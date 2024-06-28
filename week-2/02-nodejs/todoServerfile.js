const express = require('express');
const bodyParser = require('body-parser');
const fs = require("fs")

const app = express();
app.use(express.json())

//promises method and asyn await 
function readTodoList() {
  return new Promise((resolve, reject) => {
    fs.readFile("Todolist.json", (err, data) => {
      {
        resolve(JSON.parse(data));
      }
    });
  });
}

async function initializeTodoList() {
    const data = await readTodoList();
    return data;
}

let TodoList;

initializeTodoList()
  .then(todoList => {
    TodoList = todoList;
    console.log("TodoList initialized:", TodoList);
  })

// function readtodolist(){
//   try {
//       const Todo = fs.readFileSync('Todolist.json', 'utf8');
//       return Todo
//   } catch (err) {
//       console.error('Error reading file:', err);
//   }}

//   const TodoList=JSON.parse(readtodolist())

function getObjectByFormedID(formedID) {
  for (let obj of TodoList) {
    if (obj.formedID == formedID) {
      return obj;
    }
  }
  return null;
}

app.get("/todos", (req, res) => {
  fs.readFile("Todolist.json", (err, data) => {
    res.status(200).json(JSON.parse(data))
  })
})

app.get("/todos/:id", (req, res) => {
  const todo = getObjectByFormedID(Number(req.params.id))
  if (!todo) {
    res.status(404).json({ msg: "put id correctly" })
  }
  else {
    fs.readFile("Todolist.json", (err, data) => {
      res.status(200).json(todo)
    })
  }
})


app.post("/todos", (req, res) => {
  const newTodo = {
    formedID: Math.floor(Math.random() * 1000000),
    title: req.body.title,
    description: req.body.description

  }
  TodoList.push(newTodo)
  fs.writeFile("Todolist.json", JSON.stringify(TodoList), (err) => {
  })
  res.status(201).json(newTodo)
})

app.put("/todos/:id", (req, res) => {
  const changeTodo = getObjectByFormedID(Number(req.params.id))
  if (!changeTodo) {
    res.status(404).json({ msg: "put id correctly" })
  }
  else {
    changeTodo.description = req.body.description
    fs.writeFile("Todolist.json", JSON.stringify(TodoList), (err) => {
      res.status(200).send()
    })
  }
})

app.delete("/todos/:id", (req, res) => {
  const todo = getObjectByFormedID(Number(req.params.id))
  if (!todo) {
    res.status(404).json({ msg: "put id correctly" })
  }
  else {
    function removeItemFromArray(arr, value) {
      return arr.filter((item) => item !== value);
    }
    TodoList = removeItemFromArray(TodoList, todo);
    fs.writeFile("Todolist.json", JSON.stringify(TodoList), (err) => {
      res.status(200).send()
    })

  }
})

app.use(bodyParser.json());
app.all("*", function (req, res) {
  res.status(404);
});

app.listen(3000)
module.exports = app;