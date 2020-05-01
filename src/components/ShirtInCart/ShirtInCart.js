import React, { useCallback } from 'react';
import './ShirtInCart.css';

import { Row, Col } from 'reactstrap';

const ShirtInCart = ({ shirt, updateQuantity, removeFromCart }) => {
    
    const updateQuantityHandler = useCallback(
        (event) => {
            let quantity = parseInt(event.target.value, 10);
            shirt.quantity = isNaN(quantity) ? 0 : quantity;
            updateQuantity(shirt);
        },
        [updateQuantity],
    );

    return (
        <Row className="shirt-in-cart-container">
            <Col xs="4">
                {shirt.graphic ?
                    <img className="img-fluid cart-shirt-graphic-img" src={shirt.graphic ? require(`../../images/${shirt.graphic}`) : ''} alt="shirt graphic" /> : null}
                {shirt.text ?
                    <div className="cart-shirt-text-final" style={{ color: shirt.textColor.color, fontFamily: shirt.font }}>{shirt.text}</div> : null}
                <img className="img-fluid shirt-in-cart-img" src={require(`../../images/${shirt.image}.jpg`)} alt="shirt in cart" />
            </Col>
            <Col xs="7" className="shirt-in-cart-middle">
                <div className="shirt-in-cart-title">{shirt.name}</div>
                <div className="shirt-in-cart-description">{shirt.description}</div>
                <select className="form-control form-control-sm size-select">
                    <option value="">Select</option>
                    <option value="S">Small</option>
                    <option value="M">Medium</option>
                    <option value="L">Large</option>
                </select>
                <Row className="quantity-row">
                    <input type="text" maxLength="3" className="form-control form-control-sm quantity" value={shirt.quantity} onChange={updateQuantityHandler} />
                    <div className="price-txt">@{shirt.price}</div>
                </Row>
            </Col>
            <Col xs="1">
                <div className="text-center">
                    <button type="submit" className="primary-btn btn-close" onClick={removeFromCart}>X</button>
                </div>
            </Col>
        </Row>
    )
}

export default ShirtInCart;