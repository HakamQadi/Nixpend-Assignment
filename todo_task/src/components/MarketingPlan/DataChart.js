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
            min: 0,    // Set the minimum value of the Y-axis to 0
            max: 10,   // Set the maximum value of the Y-axis to 10
            // You can add more Y-axis customization options here
        },
    },
};

// const labels = ['January', 'February', 'March'];
// const num = [1, 2, 3];

const DataChart = () => {

    const { status } = useContext(dataContext);
    // console.log(status);
    const titles = status.map(val => val.title);
    const num = status.map(val => val.cards.length);
    // console.log(num)

    const data = {
        labels: titles,
        datasets: [
            {
                label: 'Dataset',
                data: num.map((val) => val),
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
