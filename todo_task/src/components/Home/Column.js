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
        <div id='column_container'>
            <h4 style={{
                fontSize: '20px',
                marginBottom: '10px',
            }}>{name}</h4>
            <div>
                {
                    cards.map(
                        (card, index) =>
                        (
                            <div key={index}>
                                <Card progress={'0 out of 3'} cardData={card} />
                            </div>
                        )
                    )
                }

            </div>
        </div>
    );
}

export default Column;
