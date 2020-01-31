import React from "react";
import DatePicker from "react-datepicker";
import {addDays} from 'date-fns';
import {formatDate, maxDate, minDate} from "../configuration";

const Datepicker = ({setDate, date}) => {

    return (
        <div className="calendar-wrapper">
            <div>
                Calendar:
            </div>
            <DatePicker
                selected={date}
                onChange={date => setDate(date)}
                minDate={addDays(new Date(), -minDate)}
                maxDate={addDays(new Date(), maxDate)}
                dateFormat={formatDate}
                placeholderText="Select a date"
            />
        </div>
    )
};

export default Datepicker;