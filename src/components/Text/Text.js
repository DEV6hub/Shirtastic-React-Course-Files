import React, { useState } from 'react';
import './Text.css';

export default function Text(props) {
    const [fonts, setFonts] = useState(
        [
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
    );

    const addShirtText = (event) => {
        props.addShirtText(event.target.value);
    }

    const changeTextFont = (event) => {
        props.changeTextFont(event);
    }
        return (
            <div className="text-container">
                <div className="form-group">
                    <label htmlFor="email" className="text-lbl">Enter text</label>
                    <input type="email" className="form-control" value={props.text} onChange={addShirtText} />
                </div>
                <hr />
                <div className="form-group">
                    <label htmlFor="pwd" className="text-lbl">Change font</label>
                    <br />
                    <select className="form-control form-control-sm" onChange={changeTextFont} value={props.font}>
                        <option value="">Select</option>
                        {fonts.map((font, index) => (
                            <option key={index} value={font.font}>{font.name}</option>
                        ))}
                    </select>
                </div>
                <hr />
            </div>
        );
}
