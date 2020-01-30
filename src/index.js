import React, {useRef, useState} from 'react';
import ReactDOM from 'react-dom';
import {format} from 'date-fns';

import "react-datepicker/dist/react-datepicker.min.css";
import "./style.css";

import "./data";

import Datepicker from "./components/datepicker";
import ShowSessionsByDate from "./components/showSessionsByDate";

const App = () => {
    const [date, setDate] = useState(format(new Date(), 'dd.MM.yyyy'));
    const aboutDemo = useRef(null);

    const handleSetDate = (date) => {
        setDate(date);
    };

    const toggleShowHide = () => aboutDemo.current.classList.toggle('active');

    return (
        <>
            <div className="about-demo" ref={aboutDemo}>
                <div className="show" onClick={toggleShowHide}>About demo application</div>
                <div className="hide">
                    <div className="arrow" onClick={toggleShowHide}>&#8592;</div>
                    <p>
                        Реализовать одностраничное приложение резервирования билетов в кинотеатр. Время начала сеансов
                        10.00,
                        время последнего сеанса 20.00. Шаг каждые - 2 часа. Таким образом в течение дня может быть 6
                        сеансов.
                        Интерфейс должен отображать доступные даты для бронирования, сеансы для выбранной даты,
                        свободные и
                        забронированные места. При выборе даты и сеанса меньше текущего времени и даты, должны
                        отображаться
                        архивные данные без возможности их изменения.
                    </p>
                    <p>
                        Для хранения дат использовать LocalStorage, и при перезагрузке страницы считывать данные из
                        LocalStorage.
                    </p>
                    <p>
                        Глубина архива: одна неделя до текущей даты. Максимальный период бронирования: одна неделя от
                        текущей
                        даты.
                    </p>
                </div>
            </div>
            <div className="toolbar">
                <Datepicker setDate={handleSetDate} date={new Date()}/>
                <ShowSessionsByDate date={date}/>
            </div>
        </>
    )
};

ReactDOM.render(<App/>, document.getElementById('root'));
