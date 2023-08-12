import React from 'react';

const Card = (props) => {
    const title = props.title
    const progress= props.progress

    return (
        <div style={{
            backgroundColor: '#fff',
            borderRadius: '8px',
            padding: '10px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            marginBottom: '10px',
            width: "20rem"
        }}>
            <h5 style={{
                fontSize: '18px',
                marginBottom: '8px',
            }}>{title}</h5>
            <p style={{
                fontSize: '14px',
                color: '#555',
            }}>{progress}</p>
        </div>
    );
}

export default Card;
