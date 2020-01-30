import React, {useEffect, useState} from "react";
import {formatDate, formatTime, minTime, storageName} from "../configuration";
import {format, getTime} from "date-fns";
import classNames from "classnames";

const findDefaultSession = (cinemaData, date, currentTime, currentDate) => {
    if (currentDate !== date) return {result: false};

    const result = Object.keys(cinemaData[date]).filter(item => {
        const period = item.split(' - ');
        return ((period[0] <= currentTime) && (currentTime <= period[1])) ? item : false;
    });

    return {result: result.length ? result[0] : false};
};

const ShowSessionsByDate = ({date}) => {

    const [currentTimeTimestamp] = useState(getTime(new Date()));
    const [currentTime] = useState(format(new Date(), formatTime));

    const [currentDate] = useState(format(new Date(), formatDate));
    const [cinemaData, setCinemaData] = useState(JSON.parse(localStorage.getItem(storageName)));

    const {result} = findDefaultSession(cinemaData, date, currentTime, currentDate);

    const [session, setSession] = useState(result ? result : `${minTime}:00 - ${minTime + 2}:00`);
    const [places, setPlaces] = useState(cinemaData[date][session]);
    const [fixSession, setFixSession] = useState(false);


    useEffect(() => {
        setFixSession(false);
    }, [date]);

    useEffect(() => {
        if (fixSession) return;
        const {result} = findDefaultSession(cinemaData, date, currentTime, currentDate);
        setSession(result ? result : `${minTime}:00 - ${minTime + 2}:00`);
    }, [cinemaData, date, currentTime, currentDate, fixSession]);

    useEffect(() => {
        setPlaces(cinemaData[date][session]);
    }, [cinemaData, date, session]);

    const selectSession = (session) => setSession(session);

    const selectPlace = (place) => {
        cinemaData[date][session][place].reserve = !cinemaData[date][session][place].reserve;
        localStorage.setItem(storageName, JSON.stringify(cinemaData));

        setFixSession(true);
        setCinemaData(JSON.parse(localStorage.getItem(storageName)));
    };

    return (
        <>
            <div className="sessions-wrapper">
                <div>Sessions by {date}:</div>
                <ul>
                    {
                        Object.keys(cinemaData[date])
                            .map((item, index) => {
                                if (item === 'timestamp') return false;
                                const classSession = classNames({
                                    active: item === session,
                                    disabled: currentTimeTimestamp > cinemaData[date][item][index + 1]['timestamp']
                                });

                                return <li className={classSession} key={item}
                                           onClick={() => selectSession(item)}>{item}</li>
                            })
                    }
                </ul>
            </div>
            <div className="places-wrapper">
                <div>Places:</div>
                <ul>
                    {
                        Object.keys(places)
                            .map((item, index) => {
                                const disabled = currentTimeTimestamp > cinemaData[date][session][index + 1]['timestamp'];
                                const classPlace = classNames({
                                    active: places[item].reserve,
                                    disabled
                                });
                                return <li className={classPlace} key={item}
                                           onClick={() => disabled || selectPlace(item)}>{item}</li>
                            })
                    }
                </ul>
            </div>
        </>
    )
};

export default ShowSessionsByDate;