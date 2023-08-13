import React, { useContext, useEffect, useState } from 'react'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { dataContext } from '../../context/DataProvider';
// import faker from 'faker';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Marketing Plan',
        },
    },
    scales: {
        y: {
            min: 0,   
            max: 10,  
        },
    },
};
const DataChart = () => {
    const { status } = useContext(dataContext);
    const titles = status.map(val => val.title);
    const numOfCards = status.map(val => val.cards.length);
    const data = {
        labels: titles,
        datasets: [
            {
                label: 'Cards',
                data: numOfCards.map((val) => val),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    };

    return (
        <div>
            <Line options={options} data={data} />
        </div>
    )
}

export default DataChart
