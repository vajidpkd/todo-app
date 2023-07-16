import React, { useState } from "react";
import "./TodoApp.css";
// svg files
import DeleteIcon from "../TodoApp/assets/delete.svg";
import EditIcon from "../TodoApp/assets/edit-button.svg";
import CompliteIcon from "../TodoApp/assets/complite.svg";

function TodoApp() {
  const [todo, setTodo] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editId, setEditId] = useState(0);

  //take todo
  const handleChange = (event) => {
    setNewTodo(event.target.value);
  };

  // add
  const handleAddTodo = (event) => {
    event.preventDefault();
    if (newTodo != "") {
      setTodo([...todo, { item: newTodo, id: Date.now(), status: false }]);
      setNewTodo("");
    }
    // edit
    if (editId) {
      const updateTod = todo.map((todo) =>
        todo.id === editId ? { ...todo, item: newTodo } : todo
      );
      setTodo(updateTod);
      setEditId(0);
      setNewTodo("");
    }
  };

  // complite
  const handleCompliteTodo = (id) => {
    let complite = todo.map((todo) =>
      todo.id === id ? { ...todo, status: !todo.status } : todo
    );
    setTodo(complite);
  };

  // delet
  const handleDeleteTodo = (id) => {
    setTodo(todo.filter((todo) => todo.id !== id))
    if (editId == id) {
      setEditId(0);
      setNewTodo("");
    }
  };

  // edit
  const handleEditTodo = (id) => {
    const editTodo = todo.find((todo) => todo.id === id);
    setNewTodo(editTodo.item);
    setEditId(editTodo.id);
  };

  return (
    <div className="TodoApp">
      <div className="input-section">
        <h1>Todo App</h1>
        <form aria-autocomplete="none">
          <input
            onChange={handleChange}
            type="text"
            id="inputs"
            placeholder="Enter Items.."
            value={newTodo}
          />
          <button onClick={handleAddTodo}>{editId ? "EDIT" : "ADD"}</button>
        </form>
      </div>

      <ul>
        {todo.map((todo) => (
          <li key={todo.id}>
            <div id={todo.status ? "complite" : ""}>{todo.item}</div>
            <span>
              <img
                src={CompliteIcon}
                onClick={() => handleCompliteTodo(todo.id)}
              />
              <img src={EditIcon} onClick={() => handleEditTodo(todo.id)} />
              <img src={DeleteIcon} onClick={() => handleDeleteTodo(todo.id)} />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default TodoApp;
