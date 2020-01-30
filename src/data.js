import {amountPlaces, formatDate, maxDate, maxTime, minDate, minTime, storageName} from "./configuration";
import {addDays, format, getTime} from "date-fns";
import faker from "faker";

const checkActualData = () => {
    const data = JSON.parse(localStorage.getItem(storageName));

    if (data) {
        return !(Object.keys(data)[0] === format(addDays(new Date(), -minDate), formatDate));
    }

    return true;
};

const createFakeData = () => {

    if (!checkActualData()) return;

    const data = {};
    const times = [];
    const places = [];

    for (let i = minTime; i <= maxTime; i += 2) {
        times.push(`${i}:00 - ${i + 2}:00`);
    }

    for (let i = 1; i <= amountPlaces; i++) {
        places.push(i);
    }

    for (let i = -minDate; i <= maxDate; i++) {
        const date = format(addDays(new Date(), i), formatDate);
        data[date] = {};

        times.map(time => {
            data[date][time] = {};

            return (
                places.map((place) => {
                    let splitTime = time.split(' - ');
                    splitTime = splitTime[1].split(':');

                    let splitDate = date.split('.');

                    return (
                        data[date][time][place] = {
                            timestamp: getTime(new Date(splitDate[2], splitDate[1] - 1, splitDate[0], splitTime[0], splitTime[1])),
                            place,
                            reserve: faker.random.boolean(),
                        }
                    )
                })
            )
        });
    }

    localStorage.setItem(storageName, JSON.stringify(data))
};

createFakeData();
