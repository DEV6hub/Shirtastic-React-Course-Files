import React, { Component } from 'react';
import {connect} from 'react-redux';
import { createUser } from '../../state/actions';
import './SidenavShipping.css';
import { Row, Col } from 'reactstrap';
import { countries, regions } from '../Models/CountriesAndRegions';


class SidenavShipping extends Component{
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            address1: '',
            address2: '',
            phone: '',
            city: '',
            country: '',
            province: '',
            zip: ''
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            name: nextProps.user.name,
            email: nextProps.user.email,
            address1: nextProps.user.address1,
            address2: nextProps.user.address2,
            phone: nextProps.user.phone,
            city: nextProps.user.city,
            country: nextProps.user.country,
            province: nextProps.user.province,
            zip: nextProps.user.zip
        });
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
        [name]: value
        });
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
    updateUser = event => {
        this.props.createUser(this.state);
    }

    openPayment = () => {
        this.props.openPayment();
    }

    render() {
       //console.log(this.props.getUser());
        let regionsForSelectedCountry = regions[this.props.user.country];
        return (
            <div>
                <div className="sidenav-shipping-container">
                    <div className="sidenav-shipping-title">Shipping Info</div>
                    <hr />
                    <form onSubmit={this.updateUser}>
                        <Row className="row-item">
                            <Col className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text" name="name" value={this.state.name} className="form-control form-control-sm"/>
                            </Col>
                        </Row>
                        <Row className="row-item">
                            <Col className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="text" name= "email" value={this.state.email} className="form-control form-control-sm" onChange={this.handleInputChange.bind(this)}/>
                            </Col>
                        </Row>
                        <Row className="row-item">
                            <Col className="form-group">
                                <label htmlFor="phone">Phone Number</label>
                                <input type="text" name="phone" value={this.state.phone} className="form-control form-control-sm" onChange={this.handleInputChange.bind(this)}/>
                            </Col>
                        </Row>
                        <Row className="row-item">
                            <Col className="form-group">
                                <label htmlFor="address1">Address 1</label>
                                <input type="text" name="address1" value={this.state.address1} className="form-control form-control-sm" onChange={this.handleInputChange.bind(this)}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="form-group">
                                <label htmlFor="address2">Address 2</label>
                                <input type="text" name="address2"  value={this.state.address2} className="form-control form-control-sm" onChange={this.handleInputChange.bind(this)}/>
                            </Col>
                        </Row>
                        <Row className="row-item">
                            <Col className="form-group">
                                <label htmlFor="city">City</label>
                                <input type="text" name="city" value={this.state.city} className="form-control form-control-sm" onChange={this.handleInputChange.bind(this)}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="form-group shipping-col">
                                <label htmlFor="country">Country</label>
                                <br />
                                <select className="form-control form-control-sm" value={this.state.country} name="country" onChange={this.handleInputChange.bind(this)} id="country">
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
                                <select className="form-control form-control-sm" value={this.state.province} name="province" onChange={this.handleInputChange.bind(this)} id="region">
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
                                <input type="text" className="form-control form-control-sm" value={this.state.zip} name="zip" onChange={this.handleInputChange.bind(this)}/>
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
function mapStateToProps(state) {
    return {
        user: state.user.user
    }
}
export default connect(mapStateToProps, {createUser})(SidenavShipping);