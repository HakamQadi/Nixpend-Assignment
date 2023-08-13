import React, { useState } from 'react';

const Card = (props) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [subtaskStatus, setSubtaskStatus] = useState(
        props.cardData.subtasks.map(() => false) // Initialize with false for each subtask
    );
    const card = props.cardData;
    const progress = props.progress;

    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    const handleSubtaskToggle = (index) => {
        const newSubtaskStatus = [...subtaskStatus];
        newSubtaskStatus[index] = !newSubtaskStatus[index];
        setSubtaskStatus(newSubtaskStatus);
    };

    return (
        <div id='card_body' style={{ cursor: 'pointer' }}>
            <div onClick={openPopup}>
                <h5 style={{
                    fontSize: '18px',
                    marginBottom: '8px',
                }}>{card.title}</h5>
                <p style={{
                    fontSize: '14px',
                    color: '#555',
                }}>{progress}</p>
            </div>

            {isPopupOpen && (
                <div className="popup-overlay d-flex justify-content-center align-items-center">
                    <div className="popup p-4 bg-light rounded shadow">
                        <div className="container mt-3">
                            <div className="mb-3">
                                <h5 className="card-title d-flex ">{card.title}</h5>
                            </div>
                            <div className=" mb-3">
                                <p className="text-start text-secondary">{card.description}</p>
                            </div>
                            <h6 className='text-start'>Sub Tasks:</h6>
                            {card.subtasks.map((subtask, index) => (
                                <div key={index} className="card my-1">
                                    <div className="card-body">
                                        <div className="status-buttons d-flex gap-2">
                                            <input
                                                type="checkbox"
                                                checked={subtaskStatus[index]}
                                                onChange={() => handleSubtaskToggle(index)}
                                            />
                                            <h6
                                                style={{
                                                    textDecoration: subtaskStatus[index] ? 'line-through' : 'none',
                                                }}
                                            >
                                                {subtask.title}
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <h6 className='text-start my-2'>Status:</h6>
                            <div className="card my-2">
                                <div className="card-body">
                                    <div className="status-buttons d-flex">
                                        <h6>{card.status}</h6>
                                    </div>
                                </div>
                            </div>
                            <button className="btn btn-secondary" onClick={closePopup}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Card;
