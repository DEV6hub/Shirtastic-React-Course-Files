import React, { useState } from 'react';
import './ColorPicker.css';
import { Row } from 'reactstrap';
import classnames from 'classnames';

const listOfColors = [{ name: 'White', color: '#FFFFFF' }, { name: 'Grey', color: '#CDCDCD' }, { name: 'Black', color: '#444444' }, { name: 'Blue', color: '#2674A8' }, { name: 'Green', color: '#44A265' }, { name: 'Yellow', color: '#F4DA70' }, { name: 'Purple', color: '#6E5BD6' }, { name: 'Red', color: '#A7386B' }]

function ColorPicker(props) {
    const [colors, setColors] = useState(listOfColors)

    const selectColor = (color) => {
        setColors({ selectedColor: color});
        props.selectColor(color, props.attribute);
    }

        return (
            <div className="color-picker-container">
                <div className="color-picker-title">{props.title}</div>
                <Row className="color-picker-row">
                    {listOfColors.map((color, index) => (
                        <div key={index} >
                            <div className={"color-div " + classnames({ active: props.selectedColor.name.toLowerCase() === color.name.toLowerCase() })} onClick={() => { selectColor(color); }} style={{ backgroundColor: color.color }}>
                            </div>
                            <div className="color-name">{color.name}</div>
                        </div>
                    ))}
                </Row>
            </div>
        );
}

export default ColorPicker;