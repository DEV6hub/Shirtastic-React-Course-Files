import React, { Component } from 'react';
import './Signup.css';
import { withRouter } from 'react-router-dom';
const termsOfUse = 'By clicking the Sign Up button below, you agree to our Terms of Service and Privacy Policy.';

class Signup extends Component {
    constructor() {
        super();
        this.state = {
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
    signupSubmit = e => {
        e.preventDefault()
    }
    selectedTabId = tabId => {
        this.props.onSelectTabId('2');
        this.props.userSignUpData(this.state);
    }
    render() {
        return (
            <div className="signup-container">
                <form onSubmit={this.signupSubmit.bind(this)}>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input type="email" name="email" className="form-control" onChange={this.handleInputChange.bind(this)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="pwd">Password</label>
                        <input type="password" name="password" className="form-control" onChange={this.handleInputChange.bind(this)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="pwd2">Confirm Password</label>
                        <input type="password" className="form-control" />
                    </div>
                    <p>{termsOfUse}</p>
                    <div className="text-center">
                        <button type="submit" className="primary-btn" onClick={this.selectedTabId}>SIGN UP</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(Signup);