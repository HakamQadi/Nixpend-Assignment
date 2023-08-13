import React, { useContext, useState, useEffect } from 'react';
import Column from './Column';
import axios from 'axios';
import { dataContext } from '../../context/DataProvider';
import './style.css'

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [newColumnName, setNewColumnName] = useState('');
  const { status, setStatus } = useContext(dataContext); // Assuming setStatus is a function to update status

  useEffect(() => {
    // Fetch and update status here if needed
  }, []);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setNewColumnName('');
  };

  const addColumn = () => {
    axios.post('http://localhost:8080/home/add-column', { title: newColumnName }).then((res) => {
      console.log("post column res ", res.data);
      setShowModal(false);
      setNewColumnName('');
      // Update status with the new column data
      setStatus(prevStatus => [...prevStatus, { title: newColumnName }]);
    });
  };

  const handleInputChange = (event) => {
    setNewColumnName(event.target.value);
  };

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap overflow-auto h-100">
        {status.map((col, index) => (
          <div key={index} className="col-md">
            <Column name={col.title} />
          </div>
        ))}
        <div className="col-md">
          <div id='add_btn_container'>
            <button
              onClick={openModal}
              className="btn h-100 w-100"
              style={{
                backgroundColor: '#f8f9fa'
              }}
            >
              Add Column
            </button>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="modal d-flex justify-content-center align-items-center"
          style={{ display: 'block', background: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Column</h5>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  value={newColumnName}
                  onChange={handleInputChange}
                  className="form-control mb-2"
                  placeholder="Column Name"
                />
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-success"
                  onClick={addColumn}
                >
                  OK
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
