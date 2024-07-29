import React, { useState } from 'react';
import './App.css'; // Import the CSS file for styling

const ToDoList = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [isEditing, setIsEditing] = useState(null);
    const [currentTask, setCurrentTask] = useState('');

    const handleInputChange = (e) => {
        setNewTask(e.target.value);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (newTask.trim() !== '') {
            setTasks([...tasks, { text: newTask, completed: false }]);
            setNewTask('');
        }
    };

    const toggleTaskCompletion = (index) => {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
    };

    const handleEditClick = (index) => {
        setIsEditing(index);
        setCurrentTask(tasks[index].text);
    };

    const handleEditChange = (e) => {
        setCurrentTask(e.target.value);
    };

    const handleEditSave = (index) => {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, text: currentTask } : task
        );
        setTasks(updatedTasks);
        setIsEditing(null);
        setCurrentTask('');
    };

    const handleDeleteClick = (index) => {
        const updatedTasks = tasks.filter((task, i) => i !== index);
        setTasks(updatedTasks);
    };

    return (
        <div className="todo-container">
            <h1>To-Do List</h1>
            <form onSubmit={handleFormSubmit}>
                <input
                    type="text"
                    value={newTask}
                    onChange={handleInputChange}
                    placeholder="Enter a new task"
                />
                <button type="submit">Add Task</button>
            </form>
            <ul>
                {tasks.map((task, index) => (
                    <li
                        key={index}
                        style={{
                            textDecoration: task.completed ? 'line-through' : 'none',
                        }}
                    >
                        {isEditing === index ? (
                            <span>
                                <input
                                    type="text"
                                    value={currentTask}
                                    onChange={handleEditChange}
                                />
                                <button onClick={() => handleEditSave(index)}>Save</button>
                            </span>
                        ) : (
                            <span>
                                <span onClick={() => toggleTaskCompletion(index)}>
                                    {task.text}
                                </span>
                                <button className='editing' onClick={() => handleEditClick(index)}>Edit</button>
                                <button onClick={() => handleDeleteClick(index)}>Delete</button>
                            </span>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ToDoList;
