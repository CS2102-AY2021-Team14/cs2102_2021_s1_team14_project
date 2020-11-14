import React from 'react';
import './Salary.css';

const Salary = ({jobs}) => {

    return (
        <div><h1>{JSON.stringify(jobs)}</h1></div>
    )

}

export default Salary;