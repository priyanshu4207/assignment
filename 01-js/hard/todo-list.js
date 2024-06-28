/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
*/

class Todo {
  constructor(){
    this.todols= [];
  }

  add(todo){
    this.todols.push(todo);
  }

  remove(indexOfTodo){
    this.todols.splice(indexOfTodo,1)
  }
  getAll(){
    return this.todols
  }
  update(index, updatedTodo){
    if(index<this.todols.length){
      this.todols[index]=updatedTodo;}
  }
  get(indexOfTodo){
    if(indexOfTodo>=this.todols.length){
      return null
    }
    else{
    return this.todols[indexOfTodo]}

  }
  clear(){
    return this.todols=[]
  }
}

module.exports = Todo;
