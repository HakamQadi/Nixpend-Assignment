import axios from 'axios';
import React, { useEffect } from 'react'
import { createContext, useContext } from "react";

export const dataContext = createContext();

const DataProvider = () => {

    const { setStatus } = useContext(dataContext);
    useEffect(() => {
        const getColumns = async () => {
            await axios.get('http://localhost:8080/home/column').then((res) => {
                setStatus(res.data.columns);
            });
        };
        getColumns();
    });
    return (
        <div>

        </div>
    )
}

export default DataProvider

