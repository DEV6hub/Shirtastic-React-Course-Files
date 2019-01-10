import React, { useRef } from 'react';
import './ShirtInCart.css';

import { Row, Col } from 'reactstrap';

function ShirtInCart(props) {
    const updateQuantity = (event) => {
        let shirt = props.shirt;
        let quantity = parseInt(event.target.value, 10);
        shirt.quantity = isNaN(quantity) ? 0 : quantity;
        props.updateQuantity(shirt);
    }

    const removeFromCart = () => {
        props.removeFromCart(props.shirt);
    }

    const reCalculate = (pixels, parameter) => {
        let newPixels;
        pixels = pixels.substring(0, pixels.length - 2);
        switch (parameter) {
            case 'left':
                newPixels = (parseInt(pixels, 10) / 678) * 100 + 10 + "%";
                break;
            case 'top':
                newPixels = (parseInt(pixels, 10) / 813) * 100 + 10 + "%";
                break;
            default:
                newPixels = "100px";
        }
        return newPixels;
    }

    const graphicImageRef = useRef();
    const textRef = useRef();

        return (
            <Row className="shirt-in-cart-container">
                <Col xs="4">
                    {props.shirt.graphic ?
                        <img ref={graphicImageRef} className="img-fluid cart-shirt-graphic-img" src={props.shirt.graphic ? require(`../../images/${props.shirt.graphic}`) : ''} alt="shirt graphic" /> : null}
                    {props.shirt.text ?
                        <div ref={textRef} className="cart-shirt-text-final" style={{ color: props.shirt.textColor.color, fontFamily: props.shirt.font }}>{props.shirt.text}</div> : null}
                    <img className="img-fluid shirt-in-cart-img" src={require(`../../images/${props.shirt.image}.jpg`)} alt="shirt in cart" />
                </Col>
                <Col xs="7" className="shirt-in-cart-middle">
                    <div className="shirt-in-cart-title">{props.shirt.name}</div>
                    <div className="shirt-in-cart-description">{props.shirt.description}</div>
                    <select className="form-control form-control-sm size-select">
                        <option value="">Select</option>
                        <option value="S">Small</option>
                        <option value="M">Medium</option>
                        <option value="L">Large</option>
                    </select>
                    <Row className="quantity-row">
                        <input type="text" maxLength="3" className="form-control form-control-sm quantity" value={props.shirt.quantity} onChange={updateQuantity} />
                        <div className="price-txt">@{props.shirt.price}</div>
                    </Row>
                </Col>
                <Col xs="1">
                    <div className="text-center">
                        <button type="submit" className="primary-btn btn-close" onClick={() => { removeFromCart(); }}>X</button>
                    </div>
                </Col>
            </Row>
        )
}

export default ShirtInCart;