import React, { Component } from 'react';
import './Payment.css';
import { Row, Col } from 'reactstrap';

class Payment extends Component {

    checkout = () => {
        this.props.checkout();
    }
    render() {
        return (<div className="payment-container">
            <div className="payment-title">Payment Method</div>
            <hr />
            <form>
                <Row className="row-item">
                    <Col className="form-group">
                        <label htmlFor="card">Credit Card Number</label>
                        <input type="text" className="form-control form-control-sm" placeholder="**** **** **** 1234" />
                    </Col>
                </Row>
                <Row className="row-item">
                    <Col className="form-group">
                        <label htmlFor="exp">Expiration</label>
                        <input type="text" className="form-control form-control-sm" placeholder="MM/YY" />
                    </Col>
                    <Col className="form-group">
                        <label htmlFor="ccv">CCV</label>
                        <input type="text" className="form-control form-control-sm" placeholder="123" />
                    </Col>
                </Row>
            </form>
            <hr />
            <div>
                <Row className="price-row">
                    <Col className="sub-title">Subtotal:</Col>
                    <Col className="amount">$61.94</Col>
                </Row>
                <Row className="price-row">
                    <Col className="sub-title">Tax:</Col>
                    <Col className="amount">$61.94</Col>
                </Row>
                <Row className="price-row">
                    <Col className="sub-title">Shipping:</Col>
                    <Col className="amount">$61.94</Col>
                </Row>
            </div>
            <hr />
            <Row className="price-row">
                <Col className="total-title">Total:</Col>
                <Col className="total-price">$61.94</Col>
            </Row>
            <div>
                <button type="button" className="primary-btn float-right" onClick={() => { this.checkout(); }}>CHECKOUT</button>
            </div>
        </div>
        )
    }

}

export default Payment;