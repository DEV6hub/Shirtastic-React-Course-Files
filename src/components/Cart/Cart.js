import React, { useCallback } from 'react';
import './Cart.css';
import { Row, Col } from 'reactstrap';

import ShirtInCart from '../ShirtInCart/ShirtInCart';

const Cart = ({
    openShipping, closeCart, shirtsInCart, 
    removeFromCart, updateQuantity
}) => {

    const calculateTotal = useCallback(
        () => {
            let total = 0;
            shirtsInCart.forEach((shirt) => {
                total += shirt.subtotal;
            });
            return Math.round(total * 100) / 100;
        },
        [shirtsInCart],
    );

    return (
        <div>
            <div className="cart-container">
                <Row className="cart-header">
                    <Col className="cart-title" xs="8">Shopping Cart</Col>
                    <Col className="cart-btn" xs="3" onClick={closeCart}>
                        <Row className="cart-btn-row">
                            <div className="nav-icon-basket"></div>
                            <div className="cart-count">{shirtsInCart.length}</div>
                        </Row>
                    </Col>
                </Row>
                <hr />
                {shirtsInCart.map((shirt, index) => (
                    <div key={index}>
                        <ShirtInCart shirt={shirt} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />
                        <hr />
                    </div>
                ))}
                {shirtsInCart.length > 0 ? <div className="subtotal">Subtotal:  <span>${calculateTotal()}</span></div> : null}
                <button type="button" className="primary-btn" onClick={openShipping}>GO TO SHIPPING -></button>
            </div>
        </div>
    );  
}

export default Cart;