import React from 'react';
import './History.css';
import { Popover, OverlayTrigger } from "react-bootstrap";
import StarRatings from "react-star-ratings";

const History = ({histories}) => {

    if(histories.length == 0) {
        return (
            <div className="historyContainer">
                <h2>History</h2>
                <div className="historyItems">
                    <h3 className="nohistory">There are no completed jobs!</h3>
                </div>
            </div>
        )
    } else {
        return(
            <div className="historyContainer">
                <h2>History</h2>
                <div className="historyItems">
                    {
                        histories.map((history) => {
                            const startDate = new Date(history.start_date);
                            const endDate = new Date(history.end_date);
                            const differenceInTime = endDate.getTime() - startDate.getTime();
                            const differenceInDays = differenceInTime / (1000 * 3600 * 24) + 1;
                            const petDaysGrammar = (differenceInDays > 1) ? " pet days" : " pet day";
                            const popover = (
                                <Popover id="popover-basic">
                                    <Popover.Title as="h3">Review description</Popover.Title>
                                    <Popover.Content>
                                        {history.review_text}
                                    </Popover.Content>
                                </Popover>
                            );
                            return (
                                <div className="historyCard">
                                    <div className="historyInformation">
                                        <h2>Cared for {history.owner}</h2>
                                        <p>Pet name: {history.pet}</p>
                                        <p>Category: {history.pet_type}</p>
                                        <p>Period: {startDate.toDateString().split(' ').slice(1).join(' ')} to {endDate.toDateString().split(' ').slice(1).join(' ')}</p>
                                    </div>
                                    <div className="petDayContainer">
                                        <h1>{differenceInDays}</h1>
                                        <h4>{petDaysGrammar}</h4>
                                    </div>
                                    <div>
                                        <StarRatings
                                            starDimension={"24px"}
                                            starSpacing={"4px"}
                                            starRatedColor="gold"
                                            rating={parseFloat(history.rating ?? 0)}
                                        />
                                        <OverlayTrigger trigger="click" placement="bottom" overlay={popover} trigger="hover">
                                            <h5 className="reviewButton">Read review</h5>
                                        </OverlayTrigger>
                                    </div>  
                                </div>
                            );
                        })
                    } 
                </div>
            </div>
        );
    }   
};

export default History;

