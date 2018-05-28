import React, { Component } from 'react';
import './ColorPicker.css';
import { Row } from 'reactstrap';
import classnames from 'classnames';

class ColorPicker extends Component {

    constructor() {
        super();

        this.state = {
            colors: [{ name: 'White', color: '#FFFFFF' }, { name: 'Grey', color: '#CDCDCD' }, { name: 'Black', color: '#444444' }, { name: 'Blue', color: '#2674A8' }, { name: 'Green', color: '#44A265' }, { name: 'Yellow', color: '#F4DA70' }, { name: 'Purple', color: '#6E5BD6' }, { name: 'Red', color: '#A7386B' }]
        }
        this.selectColor = this.selectColor.bind(this);
    }

    selectColor(color) {
        this.setState({ selectedColor: color });
        this.props.selectColor(color, this.props.attribute);
    }

    render() {
        return (
            <div className="color-picker-container">
                <div className="color-picker-title">{this.props.title}</div>
                <Row className="color-picker-row">
                    {this.state.colors.map((color, index) => (
                        <div key={index} >
                            <div className={"color-div " + classnames({ active: this.props.selectedColor.name.toLowerCase() === color.name.toLowerCase() })} onClick={() => { this.selectColor(color); }} style={{ backgroundColor: color.color }}>
                            </div>
                            <div className="color-name">{color.name}</div>
                        </div>
                    ))}
                </Row>
            </div>
        );
    }
}

export default ColorPicker;