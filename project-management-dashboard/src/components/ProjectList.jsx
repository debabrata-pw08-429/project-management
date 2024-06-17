import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProjectList = () => {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    const storedProjects = JSON.parse(localStorage.getItem('projects')) || [];
    const project = storedProjects.find(project => project.id === Number(id));
    if (project) {
      setTasks(project.tasks || []); // Assuming tasks are stored within each project object
    }
  }, [id]);

  const handleAddTask = () => {
    if (task && description) {
      const newTask = { task, description };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      updateProjectTasks(updatedTasks); // Update tasks in local storage
      setTask("");
      setDescription("");
    }
  };

  const handleDeleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
    updateProjectTasks(newTasks); // Update tasks in local storage
  };

  const handleUpdateTask = () => {
    if (currentIndex >= 0 && task && description) {
      const updatedTasks = tasks.map((item, index) =>
        index === currentIndex ? { task, description } : item
      );
      setTasks(updatedTasks);
      updateProjectTasks(updatedTasks); // Update tasks in local storage
      setTask("");
      setDescription("");
      setCurrentIndex(-1);
    }
  };

  const handleEditTask = (index) => {
    setTask(tasks[index].task);
    setDescription(tasks[index].description);
    setCurrentIndex(index);
  };

  const handleDeleteAllTasks = () => {
    setTasks([]);
    updateProjectTasks([]); // Clear tasks in local storage
  };

  const updateProjectTasks = (updatedTasks) => {
    const storedProjects = JSON.parse(localStorage.getItem('projects')) || [];
    const updatedProjects = storedProjects.map(project => (
      project.id === Number(id) ? { ...project, tasks: updatedTasks } : project
    ));
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
  };

  return (
    <div>
      <h1>Project Details</h1>
      <label>Project's Associated Task</label>
      <input
        type="text"
        value={task}
        placeholder="Enter Your Task"
        onChange={(e) => setTask(e.target.value)}
      />
      <br /><br />
      <label>Project Task Description</label>
      <input
        type="text"
        value={description}
        placeholder="Enter the description"
        onChange={(e) => setDescription(e.target.value)}
      />
      <br /><br /><br />
      <button onClick={handleAddTask}>Add Task</button>
      <button onClick={handleUpdateTask} disabled={currentIndex === -1}>Update Task</button>
      <button onClick={handleDeleteAllTasks}>Delete All Tasks</button>
      <br /><br />
      <ol>
        {tasks.map((item, index) => (
          <li key={index}>
            <strong>{item.task}</strong>: {item.description}
            <button onClick={() => handleEditTask(index)}>Edit</button>
            <button onClick={() => handleDeleteTask(index)}>Delete</button>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default ProjectList;
