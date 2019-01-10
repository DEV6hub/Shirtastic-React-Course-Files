import React from 'react';
import './Cart.css';
import { Row, Col } from 'reactstrap';

import ShirtInCart from '../ShirtInCart/ShirtInCart';

function Cart(props) {

    const openShipping = () => {
        props.openShipping();
    }

    const closeCart = () => {
        props.closeCart();
    }

    const calculateTotal = () => {
        let total = 0;
        props.shirtsInCart.forEach((shirt) => {
            total += shirt.subtotal;
        });
        return Math.round(total * 100) / 100;
    }

        return (
            <div>
                <div className="cart-container">
                    <Row className="cart-header">
                        <Col className="cart-title" xs="8">Shopping Cart</Col>
                        <Col className="cart-btn" xs="3" onClick={() => { closeCart(); }}>
                            <Row className="cart-btn-row">
                                <div className="nav-icon-basket"></div>
                                <div className="cart-count">{props.shirtsInCart.length}</div>
                            </Row>
                        </Col>
                    </Row>
                    <hr />
                    {props.shirtsInCart.map((shirt, index) => (
                        <div key={index}>
                            <ShirtInCart shirt={shirt} removeFromCart={props.removeFromCart} updateQuantity={props.updateQuantity} />
                            <hr />
                        </div>
                    ))}
                    {props.shirtsInCart.length > 0 ? <div className="subtotal">Subtotal:  <span>${calculateTotal()}</span></div> : null}
                    <button type="button" className="primary-btn" onClick={() => { openShipping(); }}>GO TO SHIPPING -></button>
                </div>
            </div>

        );
}

export default Cart;