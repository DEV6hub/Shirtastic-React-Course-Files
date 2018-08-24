import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import './Shipping.css';
import { createUser } from '../../actions';
import {connect} from 'react-redux';
import { Row, Col } from 'reactstrap';
import { countries, regions } from '../Models/CountriesAndRegions';


const contactIntro = 'Welcome to the club, where can we ship your shirts to? You can always provide this information at checkout';

class Shipping extends Component {
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

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
        [name]: value
        });
    }


    componentWillReceiveProps(nextProps) {
        this.setState({
            email: nextProps.signUpdata.email,
            password: nextProps.signUpdata.password
        });
    }
    
   

    render() {
        let regionsForSelectedCountry = regions[this.state.country];
        return (
            <div>
                <h2>Awesome!</h2>
                <p>{contactIntro}</p>
                <form noValidate>
                    <Row className="row-item">
                        <Col className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" name="name" value={this.state.name} minLength={5} required className="form-control form-control-sm" onChange={this.handleInputChange.bind(this)}/>
                            

                        </Col>
                    </Row>
                    <Row className="row-item">
                        <Col className="form-group">
                            <label htmlFor="address1">Address 1</label>
                            <input type="text" required name="address1" value={this.state.address1} className="form-control form-control-sm" onChange={this.handleInputChange.bind(this)}/>
                        </Col>
                        <Col className="form-group">
                            <label htmlFor="address2">Address 2</label>
                            <input type="text" name="address2" value={this.state.address2} className="form-control form-control-sm" onChange={this.handleInputChange.bind(this)}/>
                        </Col>
                    </Row>
                    <Row className="row-item">
                        <Col className="form-group">
                            <label htmlFor="phone">Phone Number</label>
                            <input type="text" required name="phone" value={this.state.phone}  className="form-control form-control-sm" onChange={this.handleInputChange.bind(this)}/>
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
                            <select name="country" required value={this.state.country} className="form-control form-control-sm"   id="country" onChange={this.handleInputChange.bind(this)}>
                                <option value="">Select</option>
                                {countries.map(country => (
                                    <option key={country.id} value={country.id}>
                                        {country.name}
                                    </option>
                                ))}
                            </select>
                        </Col>
                        <Col className="form-group shipping-col" xs="3">
                            <label htmlFor="province">Region</label>
                            <br />
                            <select required name="province" value={this.state.province} required className="form-control form-control-sm"  id="region" onChange={this.handleInputChange.bind(this)}>
                                <option value="">Select a region</option>
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
                            <input 
                            onChange={this.handleInputChange.bind(this)}/>
                            name="zip" 
                            type="text" 
                            className="form-control form-control-sm"
                            value={this.state.zip}
                             required
                             />
                        </Col>
                    </Row>
                    <div>
                        <Link to="/catalog">
                            <button type="button" className="primary-btn float-left">DO THIS LATER</button>
                        </Link>

                        <button type="submit" className="primary-btn float-right">SAVE</button>
                    </div>
                </form >
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        user: state.user.user
    }
}


export default connect(mapStateToProps, {createUser})(withRouter(Shipping));