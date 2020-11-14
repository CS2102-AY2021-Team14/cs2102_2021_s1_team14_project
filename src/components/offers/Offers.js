import React from 'react';
import './Offers.css';
import OfferCard from "./OfferCard";


const Offers = ({ activeBids }) => {

    if (activeBids.length === 0) {
        return (
            <div className="offercontainer">
                <h2>Current offers</h2>
                <div className="offersitems">
                    <h3 className="nojob">There are no offers currently!</h3>
                </div>
            </div>
        )
    } else {
        return (
            <div className="offercontainer">
                <h2>Current offers</h2>
                <div className="offersitems">
                    {activeBids.map(offer => {
                        return (
                            <OfferCard pet={offer.pet} owner={offer.owner} caretaker={offer.care_taker} price={offer.price} pettype={offer.pet_type} startdate={offer.start_date} enddate={offer.end_date} />
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default Offers;
