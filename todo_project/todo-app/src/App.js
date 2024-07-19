import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('medium');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/tasks/');
    setTasks(response.data);
  };

  const addTask = async () => {
    await axios.post('http://127.0.0.1:8000/api/tasks/', {
      title,
      description,
      due_date: dueDate,
      completed: false,
      priority,
      category,
      tags,
    });
    fetchTasks();
    setTitle('');
    setDescription('');
    setDueDate('');
    setPriority('medium');
    setCategory('');
    setTags('');
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://127.0.0.1:8000/api/tasks/${id}/`);
    fetchTasks();
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container">
      <div className="form-container">
        <h1>To-Do List</h1>
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-button">Search</button>
        </div>
        <div className="input-group">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <input
            type="text"
            placeholder="Tags (comma separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
          <button onClick={addTask}>Add Task</button>
        </div>
      </div>
      <div className="tasks-container">
        <ul>
          {filteredTasks.map(task => (
            <li key={task.id}>
              <div className="task-details">
                <span className="task-title">{task.title}</span>
                <span className="task-meta">{task.description}</span>
                <span className="task-meta">{task.due_date}</span>
                <span className="task-meta">{task.priority}</span>
                <span className="task-meta">{task.category}</span>
                <span className="task-meta">{task.tags}</span>
              </div>
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
