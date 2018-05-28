import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Shipping.css';

import { Row, Col } from 'reactstrap';

import { countries, regions } from '../Models/CountriesAndRegions';

const contactIntro = 'Welcome to the club, where can we ship your shirts to? You can always provide this information at checkout';

class Shipping extends Component {
    constructor() {
        super();
        this.state = {
            country: '',
            region: '',
        };
    }

    updateShippingInfo = event => {
        const field = event.currentTarget;
        const val = field.value;
        this.setState({
            [field.id]: val
        });

        if (field.id === 'country') {
            this.setState({ region: '' });
        }
    };

    render() {
        let regionsForSelectedCountry = regions[this.state.country];
        return (
            <div>
                <h2>Awesome!</h2>
                <p>{contactIntro}</p>
                <form>
                    <Row className="row-item">
                        <Col className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" className="form-control form-control-sm" />
                        </Col>
                    </Row>
                    <Row className="row-item">
                        <Col className="form-group">
                            <label htmlFor="address1">Address 1</label>
                            <input type="text" className="form-control form-control-sm" />
                        </Col>
                        <Col className="form-group">
                            <label htmlFor="address2">Address 2</label>
                            <input type="text" className="form-control form-control-sm" />
                        </Col>
                    </Row>
                    <Row className="row-item">
                        <Col className="form-group">
                            <label htmlFor="phone">Phone Number</label>
                            <input type="text" className="form-control form-control-sm" />
                        </Col>
                        <Col className="form-group">
                            <label htmlFor="city">City</label>
                            <input type="text" className="form-control form-control-sm" />
                        </Col>
                    </Row>
                    <Row className="row-item">
                        <Col className="form-group shipping-col" xs="6">
                            <label htmlFor="country">Country</label>
                            <br />
                            <select className="form-control form-control-sm" value={this.state[this.id]} onChange={this.updateShippingInfo} id="country">
                                <option value="">Select</option>
                                {countries.map(country => (
                                    <option key={country.id} value={country.id}>
                                        {country.name}
                                    </option>
                                ))}
                            </select>
                        </Col>
                        <Col className="form-group shipping-col" xs="3">
                            <label htmlFor="province">Province</label>
                            <br />
                            <select className="form-control form-control-sm" value={this.state[this.id]} onChange={this.updateShippingInfo} id="region">
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
                        <Col className="form-group shipping-col" xs="3">
                            <label htmlFor="zip">Postal Code</label>
                            <input type="text" className="form-control form-control-sm" />
                        </Col>
                    </Row>
                    <div>
                        <Link to="/catalog">
                            <button type="button" className="primary-btn float-left">DO THIS LATER</button>
                        </Link>

                        <button type="submit" className="primary-btn float-right">SAVE</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default Shipping;