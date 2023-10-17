import React, { useState } from 'react';
import axios from 'axios';

function TaskForm() {
  const [formData, setFormData] = useState({ title: '', description: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();

    // Make a POST request to your API
    console.log("firststart")
    
    axios.post('http://localhost:5000/tasks', formData)
      .then((response) => {
        console.log('New task created:', response.data);
        // Add logic to handle the response, e.g., show a success message.
      })
      .catch((error) => {
        console.error('Error creating a task:', error.message);
        // Handle errors, e.g., show an error message.
      });
  };

  return (
    <div>
      <h2>Create a New Task</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
}

export default TaskForm;
