import React, { Component } from 'react';
import './ShirtInCart.css';

import { Row, Col } from 'reactstrap';

class ShirtInCart extends Component {

    constructor(props) {
        super(props);
        this.updateQuantity = this.updateQuantity.bind(this);
    }

    updateQuantity = (event) => {
        let shirt = this.props.shirt;
        let quantity = parseInt(event.target.value, 10);
        shirt.quantity = isNaN(quantity) ? 0 : quantity;
        this.props.updateQuantity(shirt);
    }

    removeFromCart = () => {
        this.props.removeFromCart(this.props.shirt);
    }

    reCalculate = (pixels, parameter) => {
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

    render() {
        return (
            <Row className="shirt-in-cart-container">
                <Col xs="4">
                    {this.props.shirt.graphic ?
                        <img ref="graphicImage" className="img-fluid cart-shirt-graphic-img" src={this.props.shirt.graphic ? require(`../../images/${this.props.shirt.graphic}`) : ''} alt="shirt graphic" /> : null}
                    {this.props.shirt.text ?
                        <div ref="text" className="cart-shirt-text-final" style={{ color: this.props.shirt.textColor.color, fontFamily: this.props.shirt.font }}>{this.props.shirt.text}</div> : null}
                    <img className="img-fluid shirt-in-cart-img" src={require(`../../images/${this.props.shirt.image}.jpg`)} alt="shirt in cart" />
                </Col>
                <Col xs="7" className="shirt-in-cart-middle">
                    <div className="shirt-in-cart-title">{this.props.shirt.name}</div>
                    <div className="shirt-in-cart-description">{this.props.shirt.description}</div>
                    <select className="form-control form-control-sm size-select">
                        <option value="">Select</option>
                        <option value="S">Small</option>
                        <option value="M">Medium</option>
                        <option value="L">Large</option>
                    </select>
                    <Row className="quantity-row">
                        <input type="text" maxLength="3" className="form-control form-control-sm quantity" value={this.props.shirt.quantity} onChange={this.updateQuantity} />
                        <div className="price-txt">@{this.props.shirt.price}</div>
                    </Row>
                </Col>
                <Col xs="1">
                    <div className="text-center">
                        <button type="submit" className="primary-btn btn-close" onClick={() => { this.removeFromCart(); }}>X</button>
                    </div>
                </Col>
            </Row>
        )
    }
}

export default ShirtInCart;