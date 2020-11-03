import React, { useState } from 'react';
import DayPicker from 'react-day-picker';
import './Calendar.css';

// Marking all the working days for that month
const FindWorkingDays = (leaveDays, date, startDate) => {

    // Days that the pet owner are working
    let workingDays = [];
    const theDate = date; // Used to find month and year
    const startOfTheYear = startDate;
    const endOfNextYear = new Date(theDate.getFullYear() + 2, 0, 0);

    let dateIterator = startOfTheYear; // Iterator to mark the month

    const isInArray = (array, value) => {
        return !!array.find(item => {
            return item.getTime() == value.getTime()
        });
    }

    // Filling up the days that the person is working
    while (startOfTheYear <= endOfNextYear) {
        // If it is a sick day
        if (!isInArray(leaveDays, dateIterator)) {
            workingDays = [...workingDays, new Date(dateIterator)];       
        }
        dateIterator.setDate(dateIterator.getDate() + 1);
    }

    return workingDays;
}

const Calendar = () => {
    
    // TODO change to API calls
    const leaveDays = [
        new Date(2020, 8, 22),
        new Date(2020, 8, 28),
        new Date(2020, 8, 29),
        new Date(2020, 9, 10),
        new Date(2020, 9, 12),
        new Date(2020, 9, 23),
        new Date(2020, 10, 19),
        new Date(2020, 10, 20),
        new Date(2020, 10, 21),
        new Date(2020, 10, 22),
        new Date(2020, 11, 20),
        new Date(2020, 11, 1),
        new Date(2020, 11, 4),
        new Date(2020, 11, 10)
    ]

    // Day started working change to API calls
    const startDate = new Date(2020, 8, 18);
    const startMonth = new Date(startDate.getFullYear(), startDate.getMonth());

    // Setting the style of the highlighted objects
    const modifierStyles = {
        highlighted: {
            backgroundColor: 'purple',
            color: 'white',
        },
        outside: {
            backgroundColor: 'transparent',
        },
        today: {
            backgroundColor: 'red',
            color: 'white'
        }
    }

    let workingDays = FindWorkingDays(leaveDays, new Date() /*today*/, startDate);

    let modifier = {
        highlighted: workingDays
    }
 
    return(
        <div className="calendarContainer">
            <h2>Working days</h2>
            <div className="availabilitystats">

            </div>
            <div className="calendar">
                <DayPicker 
                    fromMonth={startMonth}
                    modifiers={modifier}
                    modifiersStyles={modifierStyles}
                    todayButton={"Jump to today"}
                />
            </div>
        </div>
    );
};

export default Calendar;