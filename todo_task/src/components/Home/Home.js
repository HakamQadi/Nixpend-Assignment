import React, { useEffect, useState } from 'react';
import Column from './Column';
import axios from 'axios';

const Home = () => {
  const [columnss, setColumnss] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newColumnName, setNewColumnName] = useState('');

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setNewColumnName('');
  };

  const addColumn = () => {
    if (newColumnName.trim() !== '') {
      setColumnss([...columnss, <Column name={newColumnName} />]);
      closeModal();
    }
  };

  const handleInputChange = (event) => {
    setNewColumnName(event.target.value);
  };

  const [columns, setColumns] = useState([]);
  const getColumns = async () => {
    await axios.get('http://localhost:8080/home/column').then((res) => {
      setColumns(res.data.column);
    });
  };
  useEffect(() => {
    getColumns();
  }, []);

  return (
    <>
      {columns.map((col, index) => (
        <div key={index}>
          <Column name={col} />
        </div>
      ))}
      {columnss.map((col, index) => (
        <div key={index}> {col}</div>
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



    // <div style={{ width: '100%', padding: '20px' }}>

    //   <div style={{ display: "flex", gap: '20px' }}>
    //     {
    //       data.map((da, index) => {
    //         return (
    //           <div key={index}>
    //             {columns.map((datda,index) => {
    //               return (
    //                 <div key={index}>
    //                   <Column decs={datda.desc} text={da.text} data={data} />
    //                 </div>
    //               )
    //             })}
    //           </div>
    //         )
    //       })
    //     }
    //     <button onClick={addColumn} style={{
    //       backgroundColor: 'red',
    //       color: 'white',
    //       border: 'none',
    //       padding: '8px 12px',
    //       cursor: 'pointer',
    //       height: '100vh'
    //     }}>Add Column</button>
    //   </div>
    // </div>





// import React, { useState } from 'react';
// import Column from './Column';

// const Home = () => {
//   const data = [
//     {
//       text: "task one",
//       desc: "desc one",
//       subTask: "sub one",
//       status: 'To Do',
//     },
//     {
//       text: "task Two",
//       desc: "desc Two",
//       subTask: "sub Two",
//       status: 'Doing',
//     },
//     {
//       text: "task three",
//       desc: "desc three",
//       subTask: "sub three",
//       status: 'Done',
//     },
//   ];

//   const uniqueStatuses = [...new Set(data.map(task => task.status))];

//   const [columns, setColumns] = useState([]);

//   const addColumn = (status) => {
//     setColumns([...columns, <Column key={status} status={status} data={data} />]);
//   };

//   return (
//     <div style={{ width: '100%', padding: '20px' }}>
//       <div style={{ display: "flex", gap: '20px' }}>
//         {columns}
//         {uniqueStatuses.map((status, index) => (
//           <button key={index} onClick={() => addColumn(status)} style={buttonStyle}>
//             Add '{status}' Column
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// const buttonStyle = {
//   backgroundColor: 'red',
//   color: 'white',
//   border: 'none',
//   padding: '8px 12px',
//   cursor: 'pointer',
// };

// export default Home;
