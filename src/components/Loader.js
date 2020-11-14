import React from 'react';
import { Spinner } from 'react-bootstrap';
import './Loader.css';

const Loader = () => {
    return (
        <div className="loaderContainer">
            <h1>Give Yogapets a minute!</h1>
            <Spinner animation="border" variant="primary" />
        </div>
    )
}

export default Loader;
