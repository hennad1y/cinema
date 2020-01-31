import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {format} from 'date-fns';

import "react-datepicker/dist/react-datepicker.min.css";
import "./style.css";

import "./data";

import Datepicker from "./components/datepicker";
import ShowSessionsByDate from "./components/showSessionsByDate";
import About from "./components/about";
import {formatDate} from "./configuration";

const App = () => {
    const [date, setDate] = useState(new Date());

    const handleSetDate = (date) => setDate(date);

    return (
        <>
            <About />
            <div className="toolbar">
                <Datepicker setDate={handleSetDate} date={date}/>
                <ShowSessionsByDate date={format(date, formatDate)}/>
            </div>
        </>
    )
};

ReactDOM.render(<App/>, document.getElementById('root'));
