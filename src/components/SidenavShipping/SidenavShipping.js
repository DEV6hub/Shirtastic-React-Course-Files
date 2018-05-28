import React, { Component } from 'react';

import './SidenavShipping.css';

import { Row, Col } from 'reactstrap';

import { countries, regions } from '../Models/CountriesAndRegions';


class SidenavShipping extends Component {
    constructor(props) {
        super(props);
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
    }

    openPayment = () => {
        this.props.openPayment();
    }

    render() {
        let regionsForSelectedCountry = regions[this.state.country];
        return (
            <div>
                <div className="sidenav-shipping-container">
                    <div className="sidenav-shipping-title">Shipping Info</div>
                    <hr />
                    <form>
                        <Row className="row-item">
                            <Col className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text" className="form-control form-control-sm" />
                            </Col>
                        </Row>
                        <Row className="row-item">
                            <Col className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="text" className="form-control form-control-sm" />
                            </Col>
                        </Row>
                        <Row className="row-item">
                            <Col className="form-group">
                                <label htmlFor="phone">Phone Number</label>
                                <input type="text" className="form-control form-control-sm" />
                            </Col>
                        </Row>
                        <Row className="row-item">
                            <Col className="form-group">
                                <label htmlFor="address1">Address 1</label>
                                <input type="text" className="form-control form-control-sm" />
                            </Col>
                        </Row>
                        <Row>
                            <Col className="form-group">
                                <label htmlFor="address2">Address 2</label>
                                <input type="text" className="form-control form-control-sm" />
                            </Col>
                        </Row>
                        <Row className="row-item">
                            <Col className="form-group">
                                <label htmlFor="city">City</label>
                                <input type="text" className="form-control form-control-sm" />
                            </Col>
                        </Row>
                        <Row>
                            <Col className="form-group shipping-col">
                                <label htmlFor="country">Country</label>
                                <br />
                                <select className="form-control form-control-sm" value={this.state[this.id]} onChange={this.updateShippingInfo} id="country">
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
                            <Col className="form-group shipping-col">
                                <label htmlFor="zip">Postal Code</label>
                                <input type="text" className="form-control form-control-sm" />
                            </Col>
                        </Row>
                        <div>
                            <button type="button" className="primary-btn float-right" onClick={() => { this.openPayment(); }}>GO TO PAYMENT -></button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default SidenavShipping;