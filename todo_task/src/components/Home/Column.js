import React, { useEffect, useState } from 'react';
import Card from './Card';
import axios from 'axios';

const Column = (props) => {
    const name = props.name;
    const [cards, setCards] = useState([]);

    useEffect(() => {
        const getCards = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/home/cards-by-column/${name}`);
                const columnData = response.data;
                setCards(columnData.cards);
            } catch (error) {
                console.error('Error fetching cards:', error);
            }
        };
        getCards();
    }, [name]);

    return (
        <div style={{
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            padding: '10px',
            border: '1px solid #ccc',
            // marginRight: '10px',
            minWidth: '200px',
        }}>
            <h4 style={{
                fontSize: '20px',
                marginBottom: '10px',
            }}>{name}</h4>
            <div style={{
                // display: 'flex',
                // flexDirection: 'column',
            }}>
                {cards.length > 0 ? (
                    cards.map((card, index) => (
                        <div key={index} 
                        // style={{
                        //     border: '1px solid #ccc',
                        //     borderRadius: '8px',
                        //     padding: '10px',
                        //     backgroundColor: '#ffffff',
                        //     marginBottom: '10px',
                        //     boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                        // }}
                        >

                            <Card progress={'0 out of 3'} title={card.title} />
                        </div>
                    ))
                ) : (
                    <div 
                    // style={{
                        // border: '1px solid #ccc',
                        // borderRadius: '8px',
                        // padding: '10px',
                        // backgroundColor: '#ffffff',
                        // marginBottom: '10px',
                        // boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                    // }}
                    >
                        {/* <hr /> */}
                        <Card progress={'0 out of 0'} title={'No cards'} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Column;
