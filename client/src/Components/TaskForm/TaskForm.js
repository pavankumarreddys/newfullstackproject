import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';


function TaskForm() {
  const [formData, setFormData] = useState({ title: '', description: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    // Make a POST request to your API
    
    const formData1 ={
        name:"pavan",
        email:"fehgfd@gmail.com",
        password:"123456789"
    }
console.log("first",formData1)
    axios.post('http://localhost:5000/signup', formData1)
      .then((response) => {
        console.log('New task created:', response.data);
        toast.success('Task created successfully', {
            position: toast.POSITION.TOP_CENTER
          });
        // Add logic to handle the response, e.g., show a success message.
      })
      .catch((error) => {
        console.error('Error creating a task:', error.message);
        toast.error('Error creating a task', {
            position: toast.POSITION.TOP_CENTER
          });
        // Handle errors, e.g., show an error message.
      });
  };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Make a POST request to your API
//     console.log("firststart",formData)
    
//     axios.post('http://localhost:5000/tasks', formData)
//       .then((response) => {
//         console.log('New task created:', response.data);
//         toast.success('Task created successfully', {
//             position: toast.POSITION.TOP_CENTER
//           });
//         // Add logic to handle the response, e.g., show a success message.
//       })
//       .catch((error) => {
//         console.error('Error creating a task:', error.message);
//         toast.error('Error creating a task', {
//             position: toast.POSITION.TOP_CENTER
//           });
//         // Handle errors, e.g., show an error message.
//       });
//   };

  return (
    <div>
        <ToastContainer />
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
