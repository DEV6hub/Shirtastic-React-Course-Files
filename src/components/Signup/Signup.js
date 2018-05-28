import React, { Component } from 'react';
import './Signup.css';

const termsOfUse = 'By clicking the Sign Up button below, you agree to our Terms of Service and Privacy Policy.';

class Signup extends Component {
    render() {
        return (
            <div className="signup-container">
                <form>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input type="email" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="pwd">Password</label>
                        <input type="password" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="pwd2">Confirm Password</label>
                        <input type="password" className="form-control" />
                    </div>
                    <p>{termsOfUse}</p>
                    <div className="text-center">
                        <button type="submit" className="primary-btn">SIGN UP</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default Signup;