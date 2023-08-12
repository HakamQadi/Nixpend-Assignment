import React, { useContext,useState } from 'react';
import Column from './Column';
import axios from 'axios';
import { dataContext } from '../../context/DataProvider';

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [newColumnName, setNewColumnName] = useState('');
  const { status } = useContext(dataContext);
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const addColumn = () => {
    axios.post('http://localhost:8080/home/add-column', { title: newColumnName }).then((res) => {
      console.log("post column res ", res.data);

    });

  };

  const handleInputChange = (event) => {
    setNewColumnName(event.target.value);
  };

  return (
    <>
      {status.map((col, index) => (
        <div key={index}>
          <Column name={col.title} />
        </div>
      ))}
      <button
        onClick={openModal}
        style={{
          backgroundColor: 'red',
          color: 'white',
          border: 'none',
          padding: '8px 12px',
          cursor: 'pointer',
          height: '100vh',
        }}
      >
        Add Column
      </button>
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
            <h3 style={{ marginBottom: '10px' }}>Add Column</h3>
            <input
              type="text"
              value={newColumnName}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '8px',
                marginBottom: '10px',
                borderRadius: '4px',
                border: '1px solid #ccc',
              }}
            />
            <button style={{
              backgroundColor: 'green',
              color: 'white',
              border: 'none',
              padding: '8px 12px',
              cursor: 'pointer',
              marginRight: '10px',
              borderRadius: '4px',
            }} onClick={addColumn}>OK</button>
            <button style={{
              backgroundColor: 'gray',
              color: 'white',
              border: 'none',
              padding: '8px 12px',
              cursor: 'pointer',
              borderRadius: '4px',
            }} onClick={closeModal}>Cancel</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;