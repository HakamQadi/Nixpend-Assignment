import axios from 'axios';
import React, { useEffect } from 'react'
import { createContext, useContext } from "react";

export const dataContext = createContext();

const DataProvider = () => {

    const { setData } = useContext(dataContext);
    // setData("hakam")

    useEffect(() => {
        const getColumns = async () => {
            await axios.get('http://localhost:8080/home/column').then((res) => {
                setData(res.data.column);
            });
        };
        getColumns();
    }, [setData]);
    return (
        <div>

        </div>
    )
}

export default DataProvider

