import React, { useState, useEffect, useRef } from 'react';
import './Catalog.css';

import { Row, Navbar, NavbarToggler } from 'reactstrap';

import Cart from '../Cart/Cart';
import SidenavShipping from '../SidenavShipping/SidenavShipping';
import Payment from '../Payment/Payment';
import Confirmation from '../Confirmation/Confirmation';
import Design from '../Design/Design';
import CatalogTabs from '../CatalogTabs/CatalogTabs';

const navLogo = require('../../images/navlogo.png');

export default function Catalog(props) {
    // the below useState(s) replace the initial state
    const [activeTab, setActiveTab] = useState('1');
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [shirtsInCart, setShirtsInCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [openDesign, setOpenDesign] = useState(false);
    const [shirtToEdit, setShirtToEdit] = useState(
        {
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
            graphicColor: { name: 'white', color: '#FFFFFF' }
        }
    );
    const [action, setAction] = useState('');

    useEffect(() => { //This replaces the lifecycle hooks
        props.actions.fetchShirts();
      }, []); //we pass an empty array as a 2nd arg to only run once
      //else if we pass a variable/props, component will re-render again if the value changes

    const cartRef = useRef();
    const overlayRef = useRef();
    const shippingRef = useRef();
    const shippingOverlayRef = useRef();
    const cartOverlayRef = useRef();
    const paymentRef = useRef();

    const handleOutsideClick = (event) => {
        // ignore clicks on the component itself
        if ((event.target.className !== 'overlay')) {
            return;
        }
        closeCart();
    }

    const openCart = () => {
        console.log('Cart Open');
        cartRef.current.style.width = "100%";
        overlayRef.current.style.display = "block";

        document.addEventListener('click', handleOutsideClick, false);
    }

    const closeCart = () => {
        console.log('Cart Closed');
        cartRef.current.style.width = "0";
        overlayRef.current.style.display = "none";
        shippingRef.current.style.width = "0";
        cartRef.current.style.right = "0";
        shippingRef.current.style.right = "0";
        shippingOverlayRef.current.style.display = "none";
        cartOverlayRef.current.style.display = "none";
        paymentRef.current.style.width = "0";
        setShowConfirmation(false);
        document.removeEventListener('click', handleOutsideClick, false);
    }

    const openShipping = () => {
        console.log('Go To Shipping');
        cartRef.current.style.right = "385px";
        shippingRef.current.style.width = "100%";
        cartOverlayRef.current.style.display = "block";
        cartOverlayRef.current.style.right = "385px";
    }

    const openPayment = () => {
        console.log('Go To Payment');
        cartRef.current.style.right = "770px";
        cartOverlayRef.current.style.right = "770px";
        paymentRef.current.style.width = "100%";
        shippingRef.current.style.right = "385px";
        shippingOverlayRef.current.style.display = "block";
    }

    const checkout = () => {
        console.log('Go To Checkout');
        props.shirts.forEach(shirt => {
            shirt.quantity = 0;
        });
        setShowConfirmation(true);
        setShirtsInCart([]);
        paymentRef.current.style.width = "100%";
        cartRef.current.style.width = "0";
        shippingRef.current.style.width = "0";
        shippingOverlayRef.current.style.display = "none";
        cartOverlayRef.current.style.display = "none";
    }

    const goToCatalog = () => {
        console.log('Go Back To Catalog');
        // Reset fixed positioning for all 3 side nav components and set showConfirmation to false 
        paymentRef.current.style.width = "0";
        overlayRef.current.style.display = "none";
        cartRef.current.style.width = "0";
        cartRef.current.style.right = "0";
        shippingRef.current.style.width = "0";
        shippingRef.current.style.right = "0";
        setShowConfirmation(false);
    }

    const addToCart = (shirt) => {
        console.log('Add to Cart');
        let cartItems = shirtsInCart;
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
        setShirtsInCart(cartItems);
    }

    const editShirt = (shirt) => {
        console.log('Edit Shirt');
        setOpenDesign(true);
        setShirtToEdit(shirt);
        setAction('edit');
    }

    const removeFromCart = (shirt) => {
        console.log('Remove');
        shirt.quantity = 0;
        let cartItems = shirtsInCart;
        let index = cartItems.findIndex(item => {
            return shirt.image === item.image;
        });
        cartItems.splice(index, 1);
        setShirtsInCart(cartItems);
    }

    const updateQuantity = (shirt) => {
        // Update the quantity from the input text box
        console.log('Update');
        let cartItems = shirtsInCart;
        let index = cartItems.findIndex(item => {
            return shirt.image === item.image;
        });
        if (index !== -1) {
            cartItems[index].quantity = shirt.quantity;
            cartItems[index].subtotal = cartItems[index].quantity * cartItems[index].price;
        }
        setShirtsInCart(cartItems);
    }

    const newShirtDesign = () => {
        setOpenDesign(true);
        setAction('new');
    }

    const setShirtTitle = (event) => {
        let shirt = shirtToEdit;
        shirt.name = event.target.value;
        setShirtToEdit(shirt);
    }

    const saveShirtDesign = () => {
        let newShirt = shirtToEdit;
        console.log('Shirt Save');

        let list = props.shirts;
        newShirt.image = newShirt.shirtStyle + '-' + newShirt.shirtColor.name.toLowerCase();
        newShirt.gender = newShirt.shirtStyle[0];

        if (action === 'new') {
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

        setOpenDesign(false);
        setAction('');
        setShirtToEdit(blankShirt); //Reset to blank shirt
    }

    const selectStyle = (style) => {
        let shirt = shirtToEdit;
        shirt.shirtStyle = style;
        setShirtToEdit(shirt);
    }

    const selectColor = (color, attribute) => {
        let shirt = shirtToEdit;
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
        setShirtToEdit(shirt);
    }

    const selectGraphic = (graphic) => {
        let shirt = shirtToEdit;
        shirt.graphic = graphic;
        setShirtToEdit(shirt);
    }

    const addShirtText = (text) => {
        let shirt = shirtToEdit;
        shirt.text = text;
        setShirtToEdit(shirt);
    }

    const changeTextFont = (font) => {
        let shirt = shirtToEdit;
        shirt.font = font;
        setShirtToEdit(shirt);
    }

        return (
            <div>
                <div id="cart" className="sidenav-cart" ref={cartRef}>
                    <div className="cart-overlay" ref={cartOverlayRef}></div>
                    <Cart openShipping={openShipping} closeCart={closeCart} shirtsInCart={shirtsInCart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />
                </div>
                <div className="sidenav-shipping" ref={shippingRef}>
                    <div className="shipping-overlay" ref={shippingOverlayRef}></div>
                    <SidenavShipping openPayment={openPayment} />
                </div>
                <div className={!showConfirmation ? "sidenav-payment" : "sidenav-confirmation"} ref={paymentRef}>
                    {!showConfirmation ? <Payment checkout={checkout} /> : <Confirmation goToCatalog={goToCatalog} />}
                </div>
                <Navbar color="faded" light>
                    <Row className="nav-toggle-btn">
                        <NavbarToggler className="mr-2" />
                        <div className="vr"></div>
                        <img className="nav-logo" src={navLogo} alt="logo" />
                    </Row>
                    <Row className="cart-btn-container">
                        {openDesign ?
                            <div>
                                <input className="input-shirt-title" type="text" value={shirtToEdit.name} onChange={setShirtTitle} />
                                <button className="primary-btn nav-btn" onClick={() => { saveShirtDesign(); }}>SAVE DESIGN</button>
                            </div> :
                            <button className="primary-btn nav-btn" onClick={() => { newShirtDesign(); }}>NEW DESIGN</button>}


                        <div className="vr"></div>
                        <Row className="cart-btn" onClick={() => { openCart(); }}>
                            <div className="nav-icon-basket"></div>
                            <div className="cart-count">{shirtsInCart.length}</div>
                        </Row>
                    </Row>
                </Navbar>
                <div>
                    <div className="overlay" ref={overlayRef}></div>
                    {openDesign ? 
                    <Design 
                        action={action} 
                        shirtToEdit={shirtToEdit} 
                        saveShirtDesign={saveShirtDesign} 
                        selectStyle={selectStyle} 
                        selectColor={selectColor} 
                        selectGraphic={selectGraphic} 
                        addShirtText={addShirtText} 
                        changeTextFont={changeTextFont} 
                    /> 
                    : 
                    <div>
                        {props.fetchingShirts ? <h1 style={{color: 'red'}}>FETCHING SHIRTS</h1> : ''}
                        <CatalogTabs 
                            shirtList={props.shirts} 
                            addToCart={addToCart} 
                            editShirt={editShirt}
                        />
                    </div>
                    }
                </div>
            </div>
        );
}
