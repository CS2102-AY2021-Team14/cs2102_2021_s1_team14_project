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
                    return (
                        <div className="jobcard">
                            <div className="ownerinfo">
                                <h4>Caring {job.pet} for</h4>
                                <div className = "ownername">
                                    <h4>{job.owner}</h4>
                                </div>
                            </div>
                            <h3>Pet information</h3>
                            <p>Category: {job.pet_type}</p>
                            <p>Period: {startDate.toDateString().split(' ').slice(1).join(' ')} to {endDate.toDateString().split(' ').slice(1).join(' ')}</p>
                        </div>
                    );
                })}
            </div>  
        </div>
    )
}

export default Job;
