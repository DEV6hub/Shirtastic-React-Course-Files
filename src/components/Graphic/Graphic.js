import React from 'react';
import './Graphic.css';
import { Row } from 'reactstrap';
import classnames from 'classnames';
import { graphics } from '../../constants/graphics';

const Graphic = ({selectedGraphic, selectGraphic}) => (
    <div className="graphic-container">
        <div className="graphic-title">Choose a graphic</div>
        <Row className="graphic-row">
            {graphics.map((graphic, index) => (
                <div key={index} >
                    <div className={"graphic-div " + classnames({ active: selectedGraphic === graphic.image })} onClick={() => selectGraphic(graphic.image)}>
                        <img src={require(`../../images/${graphic.image}`)} alt="graphic" />
                    </div>
                </div>
            ))}
        </Row>
    </div>
);

export default Graphic;