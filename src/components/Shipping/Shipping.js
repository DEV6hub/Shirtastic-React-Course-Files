import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import './Shipping.css';
import { createUser } from '../../actions';
import {connect} from 'react-redux';
import { Row, Col } from 'reactstrap';
import { countries, regions } from '../Models/CountriesAndRegions';
import { FormWithConstraints, FieldFeedbacks, FieldFeedback, } from 'react-form-with-constraints';

const contactIntro = 'Welcome to the club, where can we ship your shirts to? You can always provide this information at checkout';

export default class Shipping extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            address1: '',
            address2: '',
            phone: '',
            city: '',
            country: '',
            province: '',
            zip: '',
            email: '',
            password: ''
        };
    }

    

    componentWillReceiveProps(nextProps) {
        this.setState({
            email: nextProps.signUpdata.email,
            password: nextProps.signUpdata.password
        });
    }
    shippingInfoSubmit = (event) => {
        event.preventDefault()
        this.signupForm.validateFields(event.currentTarget.name);
        if(this.signupForm.isValid()) {
           // this.props.createUser(this.state);
            this.props.history.push('/catalog');
        }  
    }//this.signupForm.validateFields(event.currentTarget.name);
    handleInputChange = event => {
        this.signupForm.validateFields(event.currentTarget.name);
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
        [name]: value
        });
    }

    render() {
        let postalZipProps = {};
        let regionsForSelectedCountry = regions[this.state.country];
        let provStateLabel = 'Region';
            switch (this.state.country) 
            { 
                case 'canada':
                    provStateLabel = 'Province';
                    postalZipProps = {
                        label: 'Postal Code (A0A 0A0 or A0A0A0)', minLength: 6,
                        maxLength: 7,
                        regex: '([A-Za-z][0-9][A-Za-z]\\s?[0-9][A-Za-z][0-9])',
                        title: 'Please provide a Canadian postal code (space is optional)', placeholder: 'A0A 0A0 or A0A0A0'
                        };
                    break;
                case 'usa':
                    provStateLabel = 'State'; 
                    postalZipProps = {
                        label: 'Zip Code (12345 or 12345-1234)',
                        minLength: 5,
                        maxLength: 10,
                        regex: '([0-9]{5}([-][0-9]{4})?)',
                        title: 'Please provide a 5-digit or 9-digit US zip code', placeholder: '12345 or 12345-1234'
                        };                        
                    break;
                default:
                postalZipProps = {
                    label: 'Postal/Zip Code', minLength: 0,
                    maxLength: 0, regex: '',
                    title: '', placeholder: ''
                    };                    
                    break;
            }

        return (
            <div>
                <h2>Awesome!</h2>
                <p>{contactIntro}</p>
                <FormWithConstraints  
                    onSubmit={this.shippingInfoSubmit.bind(this)} 
                    noValidate
                    ref={element => (this.signupForm = element)}
                >
                    <Row className="row-item">
                        <Col className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" name="name" value={this.state.name} minLength={5} required className="form-control form-control-sm" onChange={this.handleInputChange.bind(this)}/>
                            <FieldFeedbacks for="name">
                                <FieldFeedback when="valueMissing"> 
                                    You must provide name.
                                </FieldFeedback>
                                <FieldFeedback when="tooShort">
                                    Name should be at least 5 characters long.
                                </FieldFeedback>
                                <FieldFeedback when={value => /\d/.test(value)}>
                                    Shouldnot contain numbers
                                </FieldFeedback>
                            </FieldFeedbacks>

                        </Col>
                    </Row>
                    <Row className="row-item">
                        <Col className="form-group">
                            <label htmlFor="address1">Address 1</label>
                            <input type="text" required name="address1" value={this.state.address1} className="form-control form-control-sm" onChange={this.handleInputChange.bind(this)}/>
                        </Col>
                        <Col className="form-group">
                            <label htmlFor="address2">Address 2</label>
                            <input type="text" name="address2" className="form-control form-control-sm" onChange={this.handleInputChange.bind(this)}/>
                        </Col>
                    </Row>
                    <Row className="row-item">
                        <Col className="form-group">
                            <label htmlFor="phone">Phone Number</label>
                            <input type="text" required name="phone"  value={this.state.phone} className="form-control form-control-sm" onChange={this.handleInputChange.bind(this)}/>
                        </Col>
                        <Col className="form-group">
                            <label htmlFor="city">City</label>
                            <input type="text" required name="city" value={this.state.city} className="form-control form-control-sm" onChange={this.handleInputChange.bind(this)}/>
                        </Col>
                    </Row>
                    <Row className="row-item">
                        <Col className="form-group shipping-col" xs="6">
                            <label htmlFor="country">Country</label>
                            <br />
                            <select name="country" required className="form-control form-control-sm"value={this.state.country}  onChange={this.handleInputChange.bind(this)} id="country">
                                <option value="">Select</option>
                                {countries.map(country => (
                                    <option key={country.id} value={country.id}>
                                        {country.name}
                                    </option>
                                ))}
                            </select>
                        </Col>
                        <Col className="form-group shipping-col" xs="3">
                            <label htmlFor="province">{provStateLabel}</label>
                            <br />
                            <select name="province" required className="form-control form-control-sm" value={this.state.province} onChange={this.handleInputChange.bind(this)} id="region">
                                <option value="">Select a {provStateLabel.toLowerCase()}</option>
                                {regionsForSelectedCountry && regionsForSelectedCountry.length > 0
                                    ? regionsForSelectedCountry.map(region => (
                                        <option key={region} value={region}>
                                            {region}
                                        </option>
                                    ))
                                    : null}
                            </select>
                        </Col>
                        <Col className="form-group shipping-col" xs="3">
                            <label htmlFor="zip">{postalZipProps.label}</label>
                            <input 
                            value={this.state.zip}
                            name="zip" 
                            type="text" 
                            className="form-control form-control-sm"
                             onChange={this.handleInputChange.bind(this)}
                             required pattern={postalZipProps.regex}
                              minLength={postalZipProps.minLength}
                               maxLength={postalZipProps.maxLength}
                            placeholder={postalZipProps.placeholder} 
                            title={postalZipProps.title}
                             />
                        </Col>
                    </Row>
                    <div>
                        <Link to="/catalog">
                            <button type="button" className="primary-btn float-left">DO THIS LATER</button>
                        </Link>

                        <button type="submit" className="primary-btn float-right">SAVE</button>
                    </div>
                </FormWithConstraints >
            </div>
        );
    }
}



//export default connect(mapStateToProps, {createUser})(withRouter(Shipping));