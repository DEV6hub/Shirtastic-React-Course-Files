import React, { Component } from 'react';
import './Catalog.css';

import { Row, Navbar, NavbarToggler } from 'reactstrap';

import Cart from '../Cart/Cart';
import SidenavShipping from '../SidenavShipping/SidenavShipping';
import Payment from '../Payment/Payment';
import Confirmation from '../Confirmation/Confirmation';
import Design from '../Design/Design';
import CatalogTabs from '../CatalogTabs/CatalogTabs';

import { shirtList } from '../Models/ShirtListModel';

const navLogo = require('../../images/navlogo.png');

class Catalog extends Component {

    constructor() {
        super();

        this.openCart = this.openCart.bind(this);
        this.closeCart = this.closeCart.bind(this);
        this.openShipping = this.openShipping.bind(this);
        this.openPayment = this.openPayment.bind(this);
        this.checkout = this.checkout.bind(this);
        this.goToCatalog = this.goToCatalog.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.editShirt = this.editShirt.bind(this);
        this.removeFromCart = this.removeFromCart.bind(this);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
        this.newShirtDesign = this.newShirtDesign.bind(this);
        this.setShirtTitle = this.setShirtTitle.bind(this);
        this.saveShirtDesign = this.saveShirtDesign.bind(this);
        this.selectStyle = this.selectStyle.bind(this);
        this.selectColor = this.selectColor.bind(this);
        this.selectGraphic = this.selectGraphic.bind(this);
        this.addShirtText = this.addShirtText.bind(this);
        this.changeTextFont = this.changeTextFont.bind(this);

        this.state = {
            activeTab: '1',
            showConfirmation: false,
            shirtList: shirtList,
            shirtsInCart: [],
            total: 0,
            openDesign: false,
            shirtToEdit: {
                name: 'untitled_design',
                price: 18.99,
                quantity: 0,
                subtotal: 0,
                shirtStyle: 'MensShirt',
                shirtColor: { name: 'white', color: '#FFFFFF' },
                text: '',
                textColor: { name: 'white', color: '#FFFFFF' },
                font: "'Montserrat', sans-serif",
                graphic: '',
                graphicColor: { name: 'white', color: '#FFFFFF' },
            },
            action: ''
        };
    }

    handleOutsideClick = (e) => {
        // ignore clicks on the component itself
        if ((e.target.className !== 'overlay')) {
            return;
        }
        this.closeCart();
    }

    openCart = () => {
        console.log('Cart Open');
        this.refs.cart.style.width = "100%";
        this.refs.overlay.style.display = "block";

        document.addEventListener('click', this.handleOutsideClick, false);
    }

    closeCart = () => {
        console.log('Cart Closed');
        this.refs.cart.style.width = "0";
        this.refs.overlay.style.display = "none";
        this.refs.shipping.style.width = "0";
        this.refs.cart.style.right = "0";
        this.refs.shipping.style.right = "0";
        this.refs.shippingOverlay.style.display = "none";
        this.refs.cartOverlay.style.display = "none";
        this.refs.payment.style.width = "0";
        this.setState({
            showConfirmation: false
        });
        document.removeEventListener('click', this.handleOutsideClick, false);
    }

    openShipping = () => {
        console.log('Go To Shipping');
        this.refs.cart.style.right = "385px";
        this.refs.shipping.style.width = "100%";
        this.refs.cartOverlay.style.display = "block";
        this.refs.cartOverlay.style.right = "385px";
    }

    openPayment = () => {
        console.log('Go To Payment');
        this.refs.cart.style.right = "770px";
        this.refs.cartOverlay.style.right = "770px";
        this.refs.payment.style.width = "100%";
        this.refs.shipping.style.right = "385px";
        this.refs.shippingOverlay.style.display = "block";
    }

    checkout = () => {
        console.log('Go To Checkout');
        shirtList.forEach(shirt => {
            shirt.quantity = 0;
        });
        this.setState({
            showConfirmation: true,
            shirtsInCart: [],
            shirtList: shirtList
        });
        this.refs.payment.style.width = "100%";
        this.refs.cart.style.width = "0";
        this.refs.shipping.style.width = "0";
        this.refs.shippingOverlay.style.display = "none";
        this.refs.cartOverlay.style.display = "none";
    }

    goToCatalog = () => {
        console.log('Go Back To Catalog');
        // Reset fixed positioning for all 3 side nav components and set showConfirmation to false 
        this.refs.payment.style.width = "0";
        this.refs.overlay.style.display = "none";
        this.refs.cart.style.width = "0";
        this.refs.cart.style.right = "0";
        this.refs.shipping.style.width = "0";
        this.refs.shipping.style.right = "0";
        this.setState({
            showConfirmation: false,
        });
    }

    addToCart = (shirt) => {
        console.log('Add to Cart');
        let cartItems = this.state.shirtsInCart;
        let index = cartItems.findIndex(item => {
            return shirt.image === item.image;
        });
        if (index !== -1) {
            // If shirt exists in cart, update its quantity in cart
            cartItems[index].quantity += 1;
            cartItems[index].subtotal = cartItems[index].quantity * cartItems[index].price;

        } else {
            // Update the shirt quantity and add it to cart
            shirt.quantity += 1;
            shirt.subtotal = shirt.quantity * shirt.price;
            cartItems.push(shirt);
        }
        // Update the state with new list
        this.setState({
            shirtsInCart: cartItems
        });
    }

    editShirt = (shirt) => {
        console.log('Edit Shirt');
        this.setState({
            openDesign: true,
            shirtToEdit: shirt,
            action: 'edit'
        });
    }

    removeFromCart = (shirt) => {
        console.log('Remove');
        shirt.quantity = 0;
        let cartItems = this.state.shirtsInCart;
        let index = cartItems.findIndex(item => {
            return shirt.image === item.image;
        });
        cartItems.splice(index, 1);
        this.setState({
            shirtsInCart: cartItems
        });
    }

    updateQuantity = (shirt) => {
        // Update the quantity from the input text box
        console.log('Update');
        let cartItems = this.state.shirtsInCart;
        let index = cartItems.findIndex(item => {
            return shirt.image === item.image;
        });
        if (index !== -1) {
            cartItems[index].quantity = shirt.quantity;
            cartItems[index].subtotal = cartItems[index].quantity * cartItems[index].price;
        }
        this.setState({
            shirtsInCart: cartItems
        });
    }

    newShirtDesign = () => {
        this.setState({
            openDesign: true,
            action: 'new'
        });
    }

    setShirtTitle = (event) => {
        let shirt = this.state.shirtToEdit;
        shirt.name = event.target.value;
        this.setState({
            shirtToEdit: shirt
        });
    }

    saveShirtDesign = () => {
        let newShirt = this.state.shirtToEdit;
        console.log('Shirt Save');

        let list = this.state.shirtList;
        newShirt.image = newShirt.shirtStyle + '-' + newShirt.shirtColor.name.toLowerCase();
        newShirt.gender = newShirt.shirtStyle[0];

        if (this.state.action === 'new') {
            newShirt.id = list.length + 1;
            newShirt.description = 'Custom Shirt Design';
            list.push(newShirt);
        } else {
            list[newShirt.id - 1] = newShirt;
        }

        let blankShirt = {
            name: 'untitled_design',
            price: 18.99,
            quantity: 0,
            subtotal: 0,
            shirtStyle: 'MensShirt',
            shirtColor: { name: 'white', color: '#FFFFFF' },
            text: '',
            textColor: { name: 'white', color: '#FFFFFF' },
            font: "'Montserrat', sans-serif",
            graphic: '',
            graphicColor: { name: 'white', color: '#FFFFFF' },
        };

        this.setState({
            openDesign: false,
            shirtList: list,
            action: '',
            // Reset to a blank shirt
            shirtToEdit: blankShirt
        });
    }

    selectStyle(style) {
        let shirt = this.state.shirtToEdit;
        shirt.shirtStyle = style;
        this.setState({
            shirtToEdit: shirt
        });
    }

    selectColor(color, attribute) {
        let shirt = this.state.shirtToEdit;
        switch (attribute) {
            case 'shirt':
                shirt.shirtColor = color;
                break;
            case 'text':
                shirt.textColor = color;
                break;
            case 'graphic':
                shirt.graphicColor = color;
                break;
            default:
                break;
        }
        this.setState({
            shirtToEdit: shirt
        })
    }

    selectGraphic = (graphic) => {
        let shirt = this.state.shirtToEdit;
        shirt.graphic = graphic;
        this.setState({ shirtToEdit: shirt });
    }

    addShirtText = (text) => {
        let shirt = this.state.shirtToEdit;
        shirt.text = text;
        this.setState({ shirtToEdit: shirt });
    }

    changeTextFont = (font) => {
        let shirt = this.state.shirtToEdit;
        shirt.font = font;
        this.setState({ shirtToEdit: shirt });
    }

    render() {
        return (
            <div>
                <div id="cart" className="sidenav-cart" ref="cart">
                    <div className="cart-overlay" ref="cartOverlay"></div>
                    <Cart openShipping={this.openShipping} closeCart={this.closeCart} shirtsInCart={this.state.shirtsInCart} removeFromCart={this.removeFromCart} updateQuantity={this.updateQuantity} />
                </div>
                <div className="sidenav-shipping" ref="shipping">
                    <div className="shipping-overlay" ref="shippingOverlay"></div>
                    <SidenavShipping openPayment={this.openPayment} />
                </div>
                <div className={!this.state.showConfirmation ? "sidenav-payment" : "sidenav-confirmation"} ref="payment">
                    {!this.state.showConfirmation ? <Payment checkout={this.checkout} /> : <Confirmation goToCatalog={this.goToCatalog} />}
                </div>
                <Navbar color="faded" light>
                    <Row className="nav-toggle-btn">
                        <NavbarToggler className="mr-2" />
                        <div className="vr"></div>
                        <img className="nav-logo" src={navLogo} alt="logo" />
                    </Row>
                    <Row className="cart-btn-container">
                        {this.state.openDesign ?
                            <div>
                                <input className="input-shirt-title" type="text" value={this.state.shirtToEdit.name} onChange={this.setShirtTitle} />
                                <button className="primary-btn nav-btn" onClick={() => { this.saveShirtDesign(); }}>SAVE DESIGN</button>
                            </div> :
                            <button className="primary-btn nav-btn" onClick={() => { this.newShirtDesign(); }}>NEW DESIGN</button>}


                        <div className="vr"></div>
                        <Row className="cart-btn" onClick={() => { this.openCart(); }}>
                            <div className="nav-icon-basket"></div>
                            <div className="cart-count">{this.state.shirtsInCart.length}</div>
                        </Row>
                    </Row>
                </Navbar>
                <div>
                    <div className="overlay" ref="overlay"></div>
                    {this.state.openDesign ? <Design action={this.state.action} shirtToEdit={this.state.shirtToEdit} saveShirtDesign={this.saveShirtDesign} selectStyle={this.selectStyle} selectColor={this.selectColor} selectGraphic={this.selectGraphic} addShirtText={this.addShirtText} changeTextFont={this.changeTextFont} /> : <CatalogTabs shirtList={this.state.shirtList} addToCart={this.addToCart} editShirt={this.editShirt} />}
                </div>
            </div>
        );
    }
}

export default Catalog;