import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import { createUser } from '../../actions';
import './SidenavShipping.css';
import { Row, Col } from 'reactstrap';
import { countries, regions } from '../Models/CountriesAndRegions';


function SidenavShipping(props){
    const [state, setState] = useState({name: '', email: '', address1: '', address2: '', phone: '', city: '', country: '', province: '', zip: ''});

    
    // componentWillReceiveProps(nextProps) {
    //     this.setState({
    //         name: nextProps.user.name,
    //         email: nextProps.user.email,
    //         address1: nextProps.user.address1,
    //         address2: nextProps.user.address2,
    //         phone: nextProps.user.phone,
    //         city: nextProps.user.city,
    //         country: nextProps.user.country,
    //         province: nextProps.user.province,
    //         zip: nextProps.user.zip
    //     });
    // }

    useEffect(() => {
        setState({
            name: props.user.name,
            email: props.user.email,
            address1: props.user.address1,
            address2: props.user.address2,
            phone: props.user.phone,
            city: props.user.city,
            country: props.user.country,
            province: props.user.province,
            zip: props.user.zip
        })
    }, [props])

    const handleInputChange = event => {
        // const value = target.type === 'checkbox' ? target.checked : target.value;
        setState({
            ...state,
            [event.target.name]: event.target.value
        });
    }

    // const updateShippingInfo = event => {
    //     const field = event.currentTarget;
    //     const val = field.value;
    //     this.setState({
    //         [field.id]: val
    //     });

    //     if (field.id === 'country') {
    //         setRegion('');
    //     }
    // }
    const updateUser = event => {
        props.createUser(state);
    }

    const openPayment = () => {
        props.openPayment();
    }

    let regionsForSelectedCountry = regions[props.user.country];
        return (
            <div>
                <div className="sidenav-shipping-container">
                    <div className="sidenav-shipping-title">Shipping Info</div>
                    <hr />
                    <form onSubmit={updateUser}>
                        <Row className="row-item">
                            <Col className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text" name="name" value={state.name} className="form-control form-control-sm" onChange={handleInputChange} />
                            </Col>
                        </Row>
                        <Row className="row-item">
                            <Col className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="text" name= "email" value={state.email} className="form-control form-control-sm" onChange={handleInputChange}/>
                            </Col>
                        </Row>
                        <Row className="row-item">
                            <Col className="form-group">
                                <label htmlFor="phone">Phone Number</label>
                                <input type="text" name="phone" value={state.phone} className="form-control form-control-sm" onChange={handleInputChange}/>
                            </Col>
                        </Row>
                        <Row className="row-item">
                            <Col className="form-group">
                                <label htmlFor="address1">Address 1</label>
                                <input type="text" name="address1" value={state.address1} className="form-control form-control-sm" onChange={handleInputChange}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="form-group">
                                <label htmlFor="address2">Address 2</label>
                                <input type="text" name="address2"  value={state.address2} className="form-control form-control-sm" onChange={handleInputChange}/>
                            </Col>
                        </Row>
                        <Row className="row-item">
                            <Col className="form-group">
                                <label htmlFor="city">City</label>
                                <input type="text" name="city" value={state.city} className="form-control form-control-sm" onChange={handleInputChange}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="form-group shipping-col">
                                <label htmlFor="country">Country</label>
                                <br />
                                <select className="form-control form-control-sm" value={state.country} name="country" onChange={handleInputChange} id="country">
                                    <option value="">Select Option</option>
                                    {countries.map(country => (
                                        <option key={country.id} value={country.id}>
                                            {country.name}
                                        </option>
                                    ))}
                                </select>
                            </Col>
                        </Row>
                        <Row className="row-item">
                            <Col className="form-group shipping-col">
                                <label htmlFor="province">Province</label>
                                <br />
                                <select className="form-control form-control-sm" value={state.province} name="province" onChange={handleInputChange} id="region">
                                    <option value="">Select</option>
                                    {regionsForSelectedCountry && regionsForSelectedCountry.length > 0
                                        ? regionsForSelectedCountry.map(region => (
                                            <option key={region} value={region}>
                                                {region}
                                            </option>
                                        ))
                                        : null}
                                </select>
                            </Col>
                            <Col className="form-group shipping-col">
                                <label htmlFor="zip">Postal Code</label>
                                <input type="text" className="form-control form-control-sm" value={state.zip} name="zip" onChange={handleInputChange}/>
                            </Col>
                        </Row>
                        <div>
                            <button type="button" className="primary-btn float-right" onClick={() => { openPayment(); }}>GO TO PAYMENT -></button>
                        </div>
                    </form>
                </div>
            </div>
        );
}
function mapStateToProps(state) {
    return {
        user: state.user.user
    }
}
export default connect(mapStateToProps, {createUser})(SidenavShipping);