import React, { Component } from 'react';
import './Text.css';

export default class Text extends Component {

    constructor() {
        super();
        this.addShirtText = this.addShirtText.bind(this);
        this.changeTextFont = this.changeTextFont.bind(this);

        this.state = {
            fonts: [
                { name: 'Montserrat', font: "'Montserrat', sans-serif" },
                { name: 'Dancing Script', font: "'Dancing Script', cursive" },
                { name: 'Kaushan Script', font: "'Kaushan Script', cursive" },
                { name: 'Sacramento', font: "'Sacramento', cursive" },
                { name: 'Roboto', font: "'Roboto', sans-serif" },
                { name: 'Open Sans', font: "'Open Sans', sans-serif" },
                { name: 'Barcode', font: "'Libre Barcode 39', cursive" },
                { name: 'Orbitron', font: "'Orbitron', sans-serif" },
                { name: 'Lora', font: "'Lora', serif" },
                { name: 'Indie Flower', font: "'Indie Flower', cursive" },
                { name: 'Gloria Hallelujah', font: "'Gloria Hallelujah', cursive" },
                { name: 'Pacifico', font: "'Pacifico', cursive" },
                { name: 'Caveat', font: "'Caveat', cursive" },
                { name: 'Cookie', font: "'Cookie', cursive" }
            ]
        }
    }

    addShirtText = (event) => {
        this.props.addShirtText(event.target.value);
    }

    changeTextFont = (event) => {
        this.props.changeTextFont(event);

    }

    render() {
        return (
            <div className="text-container">
                <div className="form-group">
                    <label htmlFor="email" className="text-lbl">Enter text</label>
                    <input type="email" className="form-control" value={this.props.text} onChange={this.addShirtText} />
                </div>
                <hr />
                <div className="form-group">
                    <label htmlFor="pwd" className="text-lbl">Change font</label>
                    <br />
                    <select className="form-control form-control-sm" onChange={this.changeTextFont} value={this.props.font}>
                        <option value="">Select</option>
                        {this.state.fonts.map((font, index) => (
                            <option key={index} value={font.font}>{font.name}</option>
                        ))}
                    </select>
                </div>
                <hr />
            </div>
        );
    }
}