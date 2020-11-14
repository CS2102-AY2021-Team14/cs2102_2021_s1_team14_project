import React from 'react';
import './Job.css';

const Job = ({jobs}) => {

    return (
        <div className="jobcontainer">
            <h2>Current jobs</h2>
            <div className="jobsitems">
                {jobs.map(job => {
                    const startDate = new Date(job.start_date);
                    const endDate = new Date(job.end_date);
                    const differenceInTime = endDate.getTime() - startDate.getTime();
                    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
                    const daysLeft = (
                        <div className="daysLeft">
                            <h5>Days to finish</h5>
                            <h1>{differenceInDays}</h1>
                        </div>
                    );
                    return (
                        <div className="jobcardContainer">
                            <div className="jobcard">
                                <h2>Caring {job.pet} for {job.owner}</h2>
                                <h3>Pet information</h3>
                                <p>Category: {job.pet_type}</p>
                                <p>Period: {startDate.toDateString().split(' ').slice(1).join(' ')} to {endDate.toDateString().split(' ').slice(1).join(' ')}</p>
                            </div>
                            <div>
                                {daysLeft}
                            </div>
                        </div>
                    );
                })}
            </div>  
        </div>
    )
}

export default Job;
