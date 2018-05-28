import React, { Component } from 'react';
import './Graphic.css';
import { Row } from 'reactstrap';
import classnames from 'classnames';

class Graphic extends Component {

    constructor() {
        super();

        this.state = {
            graphics: [{ name: 'crown', image: 'graphic1.svg' },
            { name: 'smile', image: 'graphic2.svg' },
            { name: 'wolf', image: 'graphic3.svg' },
            { name: 'planet', image: 'graphic4.svg' },
            { name: 'maple', image: 'graphic5.svg' },
            { name: 'karate', image: 'graphic6.svg' },
            { name: 'rocket', image: 'graphic7.svg' },
            { name: 'falcon', image: 'graphic8.svg' },
            { name: 'eagle', image: 'graphic9.svg' },
            { name: 'heart', image: 'graphic10.svg' },
            { name: 'earth', image: 'graphic11.svg' },
            { name: 'afro', image: 'graphic12.svg' },
            { name: 'skeleton', image: 'graphic13.svg' },
            { name: 'hundred', image: 'graphic14.svg' },
            { name: 'vader', image: 'graphic15.svg' }]
        }
        this.selectGraphic = this.selectGraphic.bind(this);
    }

    selectGraphic(graphic) {
        this.props.selectGraphic(graphic);
    }

    render() {
        return (
            <div className="graphic-container">
                <div className="graphic-title">Choose a graphic</div>
                <Row className="graphic-row">
                    {this.state.graphics.map((graphic, index) => (
                        <div key={index} >
                            <div className={"graphic-div " + classnames({ active: this.props.selectedGraphic === graphic.image })} onClick={() => { this.selectGraphic(graphic.image); }}>
                                <img src={require(`../../images/${graphic.image}`)} alt="graphic" />
                            </div>
                        </div>
                    ))}
                </Row>
            </div>
        );
    }

}

export default Graphic;