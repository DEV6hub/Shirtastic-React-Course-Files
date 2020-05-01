import React from 'react';
import './Text.css';
import { fonts } from '../../constants/fonts';

const Text = ({ addShirtText, changeTextFont, text, font }) => (
    <div className="text-container">
        <div className="form-group">
            <label htmlFor="email" className="text-lbl">Enter text</label>
            <input type="email" className="form-control" value={text} onChange={e => addShirtText(e.target.value)} />
        </div>
        <hr />
        <div className="form-group">
            <label htmlFor="pwd" className="text-lbl">Change font</label>
            <br />
            <select className="form-control form-control-sm" onChange={(e) => changeTextFont(e.target.value)} value={font}>
                <option value="">Select</option>
                {fonts.map((font, index) => (
                    <option key={index} value={font.font}>{font.name}</option>
                ))}
            </select>
        </div>
        <hr />
    </div>
);

export default Text;