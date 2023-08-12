import React, { useEffect, useState } from 'react';
import Card from './Card';
import axios from 'axios';

const Column = (props) => {
    // const data = props.data
    // const text = props.text
    // const desc = props.desc
    const name = props.name
    // console.log("data ", data)
    // console.log("text ", text)



    const [cards, setCards] = useState([])

    useEffect(() => {
        const getCards = async () => {
            await axios.get('http://localhost:8080/home/all-cards').then((res) => {
                // console.log(res.data.cards)
                const data = res.data.cards
                // console.log(data)

                const filteredCards = data.filter((card) => name === card.status)
                // console.log(filteredCards)

                setCards(filteredCards)
                // setCards(res.data.column)
            })
        }
        getCards()
    },)
    return (
        <div style={{
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            padding: '10px',
            border: '1px solid #ccc',
            marginRight: '10px',
            minWidth: '200px',
        }}>
            <h4 style={{
                fontSize: '20px',
                marginBottom: '10px',
            }}>{name}</h4>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
            }}>
                {cards.length > 0 ? (
                    cards.map((card, index) => (
                        <div key={index} style={{
                            border: '1px solid #ccc',
                            borderRadius: '8px',
                            padding: '10px',
                            backgroundColor: '#ffffff',
                            marginBottom: '10px',
                            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                        }}>
                            <Card desc={card.description} text={card.title} />
                        </div>
                    ))
                ) : (
                    <div style={{
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        padding: '10px',
                        backgroundColor: '#ffffff',
                        marginBottom: '10px',
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                    }}>
                        <hr />
                        <Card desc={'No cards'} text={'No cards'} />
                    </div>
                )}
            </div>
        </div>

    );

}

export default Column;






// import React from 'react';
// import Card from './Card';

// const Column = ({ status, data }) => {
//   const filteredData = data.filter(task => task.status === status);

//   return (
//     <div style={columnStyle}>
//       <h4>{status}</h4>
//       <div>
//         {filteredData.map((task, index) => (
//           <div key={index} style={cardStyle}>
//             <Card text={task.text} desc={task.desc} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const columnStyle = {
//   border: '1px solid #ccc',
//   borderRadius: '8px',
//   padding: '10px',
//   backgroundColor: '#f8f9fa',
// };

// const cardStyle = {
//   border: '1px solid #ccc',
//   borderRadius: '8px',
//   padding: '10px',
//   backgroundColor: '#fff',
//   marginBottom: '10px',
// };

// export default Column;
