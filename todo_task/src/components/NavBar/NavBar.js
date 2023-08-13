import React, { useContext, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './NavBar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import axios from 'axios';
import { dataContext } from '../../context/DataProvider';

const NavBar = () => {
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [subtasks, setSubtasks] = useState([]);
    const [subtask, setSubtask] = useState('');
    const [selectedOption, setSelectedOption] = useState('');

    const { status } = useContext(dataContext);
    const uniqueStatus = [...new Set(status.map(option => option.title))];
    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setTitle('');
        setDescription('');
        setSubtasks([]);
        setSubtask('');
        setSelectedOption('');
    };

    const addTask = async () => {
        await axios.post('http://localhost:8080/home/add-card',
            {
                title,
                description,
                subtasks: subtasks,
                status: selectedOption,
            }
        ).then((res) => {
            console.log(res.data.message)
        })
        closeModal();
    };

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleSubtaskChange = (event) => {
        setSubtask(event.target.value);
    };

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };
    const location = useLocation();
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container d-flex justify-content-between">
                <NavLink className="navbar-brand" to="/"><h3>My Platform</h3></NavLink>
                <div className='d-flex' id="navbarNav">
                    {location.pathname === '/marketing-plan' ? null : (
                        <button onClick={openModal} className="btn btn-primary">+ Add new task </button>
                    )}
                </div>
            </div>
            {showModal && (
                <div id='popUp_dialog'>
                    <div id='popUp_dialog_container'>
                        <h3 style={{ marginBottom: '10px' }}>Add Task</h3>
                        <input className='input'
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={handleTitleChange} />
                        <textarea className='input'
                            placeholder="Description"
                            value={description}
                            onChange={handleDescriptionChange} />
                        <div>
                            {subtasks.map((subtask, index) => (
                                <div key={index} style={{ marginBottom: '5px' }}>{subtask}</div>
                            ))}
                            <input
                                className='input'
                                type="text"
                                placeholder="Subtask"
                                value={subtask}
                                onChange={handleSubtaskChange} />
                            <button
                                id='add_subtask_btn'
                                onClick={() => {
                                    if (subtask) {
                                        setSubtasks([...subtasks, subtask]);
                                        setSubtask('');
                                    }
                                }}
                            >
                                Add Subtask
                            </button>
                        </div>
                        <select
                            className='input'
                            value={selectedOption}
                            onChange={handleOptionChange}
                        >
                            <option value="select">Select an option</option>
                            {uniqueStatus.map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                        <button
                            className='action_btn'
                            style={{ backgroundColor: 'green' }}
                            onClick={addTask}
                        >
                            OK
                        </button>
                        <button
                            className='action_btn'
                            style={{ backgroundColor: 'gray' }}
                            onClick={closeModal}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </nav>
    )
}

export default NavBar;

