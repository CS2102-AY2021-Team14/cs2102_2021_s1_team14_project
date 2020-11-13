import React from 'react';
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
            return item.getTime() == value.getTime();
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

const Calendar = ({ caretakerAvailability }) => {

    const leaveDays = caretakerAvailability.leaveDays;

    // Day started working change to API calls
    const startDate = caretakerAvailability.startDate;
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

    return (
        <div className="calendarContainer">
            <h2>Available days</h2>
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
