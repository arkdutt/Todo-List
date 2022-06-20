import React, { useState } from "react";
import "./App.css";
import axios from 'axios';

function App() {
  // State Hook - `useState`
  const [newItem, setNewItem] = useState(""); //This sets the item. It is an empty string initially
  const [items, setItems] = useState([]);

  const [showEdit, setShowEdit] = useState(-1);
  const [updatedText, setUpdatedText] = useState("");


  state = {
    task: "", //current user entered task
    taskList: [] //hold all my tasks
  }
  getTaskList = () => {
    axios.get('http://localhost:4000/tasks')
    .then((response) => response.data)
    .then(response => this.setState({taskList: response}))
    
    this.getTaskList();
  }

  // Helper Functions

  /* Adds a new item to the list array*/
  function addItem() {

    axios.post('http://localhost:4000/addTask',{
      task: this.state.task   //making a post request to the addTask. This stores the task into the sql data

    })
    // console.log(newItem)

    // ! Check for empty item
    if (!newItem) {
      alert("Press enter an item to your Todo List!");
      return;
    }

    // The id which can sort the list
    const item = {
      id: Math.floor(Math.random() * 1000),
      value: newItem,
    };

    // Add new item to the old items array
    setItems((oldList) => [...oldList, item]);

    // Reset newItem back to original state
    setNewItem("");
  }

  /* Deletes an item based on the `item.id` key */
  function deleteItem(id) {
    axios.delete(`http://localhost:4000/task/${taskid}`, {
        method: 'DELETE',
      })
      .then(() => getTaskList()); // fetching the updated list
    
    const newArray = items.filter((item) => item.id !== id);
    setItems(newArray);

    this.getTaskList();
  }

  /* Edit an item text after creating it. */
  function editItem(id, newText) {

    // Get the current item
    const currentItem = items.filter((item) => item.id === id);

    // Create a new item with same id
    const newItem = {
      id: currentItem.id,
      value: newText,
    };

    deleteItem(id);

    // Replace item in the item list
    setItems((oldList) => [...oldList, newItem]);
    setUpdatedText("");
    setShowEdit(-1);
  }

  // Main function of the app
  return (
    <div className="app">
      {/* 1. Header  */}
      <h1>My Todo List</h1>

      {/* 2. Add new item (input) */}
      <input
        type="text"
        placeholder="Add an item..."
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)} //updates the space box
      />

      {/* Add (button) */}
      <button onClick={() => addItem()}>Add</button>

      {/* 3. List of todos (unordered list) */}
      <ul>
        {items.map((item) => {
          return (   // returns the list of items entered
            <div>
              <li key={item.id} onClick={() => setShowEdit(item.id)}>
                {item.value}
                <button
                  className="delete-button"
                  onClick={() => deleteItem(item.id)}
                >
                  ❌
                </button>
              </li>

              {showEdit === item.id ? (
                <div>
                  <input
                    type="text"
                    value={updatedText}
                    onChange={(e) => setUpdatedText(e.target.value)}
                  />
                  <button onClick={() => editItem(item.id, updatedText)}>
                    Update
                  </button>
                </div>
              ) : null}
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default App;