import React, { Component } from 'react';
import './Confirmation.css';

const shirtIcon = require(`../../images/ShirtIcon.svg`);
function Confirmation(props) {

    const goToCatalog = () => {
        props.goToCatalog();
    }
        return (
            <div className="confirmation-container">
                <div className="confirmation-shirt-icon">
                    <img className="img-fluid" src={shirtIcon} alt="Shirt Icon" />
                </div>
                <div className="confirmation-title">Your order is complete.</div>
                <div className="text-center">
                    <button type="submit" className="primary-btn" onClick={() => { goToCatalog(); }}>SHOP SOME MORE</button>
                </div>
            </div>
        )
}

export default Confirmation;