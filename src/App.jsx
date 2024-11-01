import { useState } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([]);
  const [undo, setUndo] = useState([]);
  const handleTodos = (e) => {
    if (e.key === "Enter") {
      if (e.target.value) {
        const newTodos = todos.filter((todo) => todo != e.target.value)
        setTodos([...newTodos, e.target.value]);
        e.target.value = "";
      }
      else {
        setTodos([...todos, "Empty todo list"]);
      }
    }
  }
  const removeFromTodos = (todo, index) => {
    setTodos(todos.filter((todoFromList, indexFromList) => indexFromList != index));
    setUndo([...undo, todo]);
  }
  const editFromTodos = (todo, index) => {
    var editedTodoList = [...todos];
    const newTodo = prompt("Edit todo: ", todo);
    if (newTodo !== null) {
      editedTodoList[index] = newTodo;
      setTodos(editedTodoList);
    }
  }
  const Undo = () => {
    if (undo.length) {
      setTodos([...todos, undo[undo.length - 1]])
      setUndo(undo.filter((undoFromUndo) => undo[undo.length - 1] != undoFromUndo));
    }
  }
  return (
    <>
      <div className="container">
        <header>Todo's {todos.length}</header>
        <div className="input-data">
          <input placeholder='Enter your Todo' onKeyUp={(e) => handleTodos((e))} id='todo' type="text" />
          <button style={{ color: "#ffff", backgroundColor: "royalblue", height: "100%" }} onClick={Undo}>{"UNDO"}</button>
        </div>
        <div className="todos">
          {
            todos.map((todo, index) => (
              <div key={index} className="main">
                <p>{new Date().toLocaleDateString()}</p>
                <ul key={index}>
                  <li>{todo}</li>
                  <div className="features">
                    <button style={{ color: "#ffff", backgroundColor: "yellowgreen", padding: "2px 10px" }} onClick={() => editFromTodos(todo, index)}>Edit</button>
                    <button style={{ color: "#fff", backgroundColor: "tomato", padding: "2px 10px" }} onClick={() => { removeFromTodos(todo, index) }}>Remove</button>
                  </div>
                </ul>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default App;
