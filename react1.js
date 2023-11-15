import React, { useState, useEffect } from 'react';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    showTasks();
  }, []);

  const addTask = () => {
    if (inputValue === '') {
      alert('You must write something!');
    } else {
      setTasks((prevTasks) => [...prevTasks, inputValue]);
      saveData();
    }
    setInputValue('');
  };

  const toggleTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = !updatedTasks[index];
    setTasks(updatedTasks);
    saveData();
  };

  const removeTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
    saveData();
  };

  const saveData = () => {
    localStorage.setItem('data', JSON.stringify(tasks));
  };

  const showTasks = () => {
    const storedData = localStorage.getItem('data');
    if (storedData) {
      setTasks(JSON.parse(storedData));
    }
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map((task, index) => (
          <li
            key={index}
            onClick={() => toggleTask(index)}
            className={task ? 'checked' : ''}
          >
            {task}
            <span onClick={() => removeTask(index)}>&times;</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
