import React from 'react';
import './Job.css';

const Job = ({jobs}) => {
    return (
        <div className="jobcontainer">
            <h2>Current jobs</h2>
            <div className="jobsitems">
                {jobs.map(job => {
                    return (
                        <div className="jobcard">
                            <div className="ownerinfo">
                                <h4>Caring for</h4>
                                <div className = "ownername">
                                    <h4>{job.owner}</h4>
                                </div>
                            </div>
                            <h3>Pet information</h3>
                            <p>Category: {job.pet}</p>
                            <p>Period: {job.start} - {job.end}</p>
                        </div>
                    );
                })}
            </div>  
        </div>
    )
}

export default Job;