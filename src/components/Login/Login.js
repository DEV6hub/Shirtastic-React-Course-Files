import React, { Component } from 'react';
import './Login.css';
import { withRouter } from 'react-router-dom';
const facebookIcon = require('../../images/facebook.svg');
const twitterIcon = require('../../images/twitter.svg');

class Login extends Component {
    login(e) {
        e.preventDefault()
		this.props.history.push('/catalog');
    }
    render() {
        return (
            <div className="login-container">
                <div className="text-center">
                    <h2>Log in</h2>
                    <br />
                    <button className="primary-btn">
                        <img className="facebook-icon" src={facebookIcon} alt="facebook icon" />WITH FACEBOOK
                    </button>
                    <button className="primary-btn">
                        <img className="twitter-icon" src={twitterIcon} alt="twitter icon" />WITH TWITTER
                    </button>
                </div>
                <br />
                <div className="hr">
                    <span>OR</span>
                </div>
                <form onSubmit={this.login.bind(this)}>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input type="email" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="pwd">Password</label>
                        <input type="password" className="form-control" />
                    </div>
                    <div className="text-center">
                        <button type="submit" className="primary-btn">LOG IN</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(Login);