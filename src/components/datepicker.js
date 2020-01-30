import React, {useEffect, useState} from "react";
import DatePicker from "react-datepicker";
import { addDays, format } from 'date-fns';
import {formatDate, maxDate, minDate} from "../configuration";

const Datepicker = ({setDate, date = null }) => {
    const [startDate, setStartDate] = useState(date);

    useEffect(() => {
        if(!startDate) return;

        setDate(format(startDate, formatDate));
    }, [startDate, setDate]);

    return (
        <div className="calendar-wrapper">
            <div>
                Calendar:
            </div>
            <DatePicker
                selected={startDate}
                onChange={date => setStartDate(date)}
                minDate={addDays(new Date(), -minDate)}
                maxDate={addDays(new Date(), maxDate)}
                dateFormat={formatDate}
                placeholderText="Select a date"
            />
        </div>
    )
};

export default Datepicker;