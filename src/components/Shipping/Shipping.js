import React, { useState, useCallback, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import './Shipping.css';
import { createdUser } from '../../state/actions';
import { Row, Col } from 'reactstrap';
import { countries, regions } from '../Models/CountriesAndRegions';
import { FormWithConstraints, FieldFeedbacks, FieldFeedback, } from 'react-form-with-constraints';
import { useStateValue } from '../../state/state';

const contactIntro = 'Welcome to the club, where can we ship your shirts to? You can always provide this information at checkout';

const Shipping = props => {
    const [_, dispatch] = useStateValue();
    const { email, password } = props.signUpdata;
    const [name, setName] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [province, setProvince] = useState('');
    const [zip, setZip] = useState('');
    const fieldToSetStateMap = {
        name: setName, address1: setAddress1, address2: setAddress2,
        phone: setPhone, city: setCity, country: setCountry,
        province: setProvince, zip: setZip
    }
    const info = {
        name, address1, address2, phone, city, country,
        province, zip
    }
    const shippingForm = useRef(null);

    const shippingInfoSubmit = useCallback(
        (event) => {
            event.preventDefault();
            shippingForm.current.validateFields(event.currentTarget.name);
            if (shippingForm.current.isValid()) {
                axios({
                    method: 'post',
                    url: 'http://localhost:9000/userInfo',
                    data: { ...info, email, password }
                }).then(response => {
                    console.log(response);
                    dispatch(createdUser(response.data));
                }).catch(error => {
                    console.log(error);
                });
                props.history.push('/catalog');
            }
        },
        [shippingForm, email, password, dispatch, info, props.history],
    );

    const handleInputChange = useCallback(
        event => {
            shippingForm.current.validateFields(event.currentTarget.name);
            const target = event.target;
            const value = target.type === 'checkbox' ? target.checked : target.value;
            const name = target.name;
            const setStateCallback = fieldToSetStateMap[name];
            setStateCallback(value);
        },
        [shippingForm, fieldToSetStateMap],
    );

    let postalZipProps = {};
    let regionsForSelectedCountry = regions[country];
    let provStateLabel = 'Region';
    switch (country) {
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
                onSubmit={shippingInfoSubmit}
                noValidate
                ref={shippingForm}
            >
                <Row className="row-item">
                    <Col className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" value={name} minLength={5} required className="form-control form-control-sm" onChange={handleInputChange} />
                        <FieldFeedbacks for="name">
                            <FieldFeedback when="valueMissing">
                                You must provide name.
                            </FieldFeedback>
                            <FieldFeedback when="tooShort">
                                Name should be at least 5 characters long.
                            </FieldFeedback>
                            <FieldFeedback when={value => /\d/.test(value)}>
                                Should not contain numbers
                            </FieldFeedback>
                        </FieldFeedbacks>

                    </Col>
                </Row>
                <Row className="row-item">
                    <Col className="form-group">
                        <label htmlFor="address1">Address 1</label>
                        <input type="text" required name="address1" value={address1} className="form-control form-control-sm" onChange={handleInputChange} />
                    </Col>
                    <Col className="form-group">
                        <label htmlFor="address2">Address 2</label>
                        <input type="text" name="address2" value={address2} className="form-control form-control-sm" onChange={handleInputChange} />
                    </Col>
                </Row>
                <Row className="row-item">
                    <Col className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input type="text" required name="phone" value={phone} className="form-control form-control-sm" onChange={handleInputChange} />
                    </Col>
                    <Col className="form-group">
                        <label htmlFor="city">City</label>
                        <input type="text" required name="city" value={city} className="form-control form-control-sm" onChange={handleInputChange} />
                    </Col>
                </Row>
                <Row className="row-item">
                    <Col className="form-group shipping-col" xs="6">
                        <label htmlFor="country">Country</label>
                        <br />
                        <select name="country" required className="form-control form-control-sm" value={country} onChange={handleInputChange} id="country">
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
                        <select name="province" required className="form-control form-control-sm" value={province} onChange={handleInputChange} id="region">
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
                            value={zip}
                            name="zip"
                            type="text"
                            className="form-control form-control-sm"
                            onChange={handleInputChange}
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

export default withRouter(Shipping);