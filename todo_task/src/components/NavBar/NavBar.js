import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './NavBar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { dataContext } from '../../context/DataProvider';

const NavBar = () => {
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [subtask, setSubtask] = useState('');
    const [selectedOption, setSelectedOption] = useState('');

    const { data } = useContext(dataContext);
    // console.log("nav ", data)
    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setTitle('');
        setDescription('');
        setSubtask('');
        setSelectedOption('');
    };

    const addTask = async () => {
        // Perform the necessary action to add the task
        // For now, just close the modal
        // console.log(title)
        // console.log(description)
        // console.log(subtask)
        // console.log(selectedOption)

        await axios.post('http://localhost:8080/home/add-card',
            {
                title,
                description,
                subtasks: [
                    subtask
                ],
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

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container d-flex justify-content-between">
                <NavLink className="navbar-brand" to="/">My App</NavLink>
                <div className='d-flex' id="navbarNav">
                    <button onClick={openModal} className="btn btn-primary">+ Add new task </button>
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item dropdown">
                            {/* Dropdown content */}
                        </li>
                    </ul>
                </div>
            </div>
            {showModal && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        background: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <div
                        style={{
                            background: '#fff',
                            padding: '20px',
                            borderRadius: '8px',
                            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
                        }}
                    >
                        <h3 style={{ marginBottom: '10px' }}>Add Task</h3>
                        <input
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={handleTitleChange}
                            style={{
                                width: '100%',
                                padding: '8px',
                                marginBottom: '10px',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                            }}
                        />
                        <textarea
                            placeholder="Description"
                            value={description}
                            onChange={handleDescriptionChange}
                            style={{
                                width: '100%',
                                padding: '8px',
                                marginBottom: '10px',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                            }}
                        />
                        <input
                            type="text"
                            placeholder="Subtask"
                            value={subtask}
                            onChange={handleSubtaskChange}
                            style={{
                                width: '100%',
                                padding: '8px',
                                marginBottom: '10px',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                            }}
                        />
                        <select
                            value={selectedOption}
                            onChange={handleOptionChange}
                            style={{
                                width: '100%',
                                padding: '8px',
                                marginBottom: '10px',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                            }}
                        >
                            <option value="select">Select an option</option>
                            {
                                data.map((status, index) => {
                                    return (
                                        <option key={index} value={status}>{status}</option>
                                    )
                                })
                            }
                            {/* Add your dropdown options here */}
                        </select>
                        <button style={{
                            backgroundColor: 'green',
                            color: 'white',
                            border: 'none',
                            padding: '8px 12px',
                            cursor: 'pointer',
                            marginRight: '10px',
                            borderRadius: '4px',
                        }}
                            onClick={addTask}
                        >OK</button>
                        <button style={{
                            backgroundColor: 'gray',
                            color: 'white',
                            border: 'none',
                            padding: '8px 12px',
                            cursor: 'pointer',
                            borderRadius: '4px',
                        }}
                            onClick={closeModal}
                        >Cancel</button>
                    </div>
                </div>
            )}
        </nav>
    )
}

export default NavBar;
