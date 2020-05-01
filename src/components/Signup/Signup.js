import React, { useState, useRef, useCallback } from 'react';
import './Signup.css';
import { withRouter } from 'react-router-dom';
import { FormWithConstraints, FieldFeedbacks, FieldFeedback, } from 'react-form-with-constraints';

const termsOfUse = 'By clicking the Sign Up button below, you agree to our Terms of Service and Privacy Policy.';

const Signup = ({ onSelectTabId, userSignUpData }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const info = { email, password, passwordConfirm };
    const fieldToSetStateMap = {
        email: setEmail,
        password: setPassword,
        passwordConfirm: setPasswordConfirm
    }
    const signupForm = useRef(null);
    const passwordInput = useRef(null);

    const signupSubmit = useCallback(
        e => {
            e.preventDefault()
            if (signupForm.current.isValid()) {
                onSelectTabId('2');
                userSignUpData(info);
            }
        },
        [signupForm, info, onSelectTabId, userSignUpData],
    );

    const handleInputChange = useCallback(
        event => {
            signupForm.current.validateFields(event.currentTarget.name);
            const target = event.target;
            const value = target.type === 'checkbox' ? target.checked : target.value;
            const name = target.name;
            const setStateCallback = fieldToSetStateMap[name];
            setStateCallback(value);
        },
        [signupForm, fieldToSetStateMap],
    );

    return (
        <div className="signup-container">
            <FormWithConstraints onSubmit={signupSubmit} ref={signupForm}>
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" required name="email" className="form-control" onChange={handleInputChange} />
                    <FieldFeedbacks for="email">
                        <FieldFeedback when="valueMissing">
                            You must provide email address.
                            </FieldFeedback>
                        <FieldFeedback when={value => !/\S+@\S+/.test(value)}>Invalid email address.</FieldFeedback>
                    </FieldFeedbacks>
                </div>
                <div className="form-group">
                    <label htmlFor="pwd">Password</label>
                    <input type="password"
                        name="password" className="form-control"
                        onChange={handleInputChange}
                        ref={passwordInput}
                        required pattern=".{5,}"
                    />
                    <FieldFeedbacks for="password">
                        <FieldFeedback when="valueMissing" />
                        <FieldFeedback when="patternMismatch">Should be at least 5 characters long</FieldFeedback>
                        <FieldFeedback when={value => !/\d/.test(value)} warning>Should contain numbers</FieldFeedback>
                        <FieldFeedback when={value => !/[a-z]/.test(value)} warning>Should contain small letters</FieldFeedback>
                        <FieldFeedback when={value => !/[A-Z]/.test(value)} warning>Should contain capital letters</FieldFeedback>
                        <FieldFeedback when={value => !/\W/.test(value)} warning>Should contain special characters</FieldFeedback>
                        <FieldFeedback when="valid">Looks good!</FieldFeedback>
                    </FieldFeedbacks>
                </div>
                <div className="form-group">
                    <label htmlFor="pwd2">Confirm Password</label>
                    <input type="password" name="passwordConfirm" className="form-control"
                        value={passwordConfirm}
                        required
                        onChange={handleInputChange} />
                    <FieldFeedbacks for="passwordConfirm">
                        <FieldFeedback when={value => value !== passwordInput.current.value}>Not the same password</FieldFeedback>
                    </FieldFeedbacks>
                </div>
                <p>{termsOfUse}</p>
                <div className="text-center">
                    <button type="submit" className="primary-btn" >SIGN UP</button>
                </div>
            </FormWithConstraints>
        </div>
    );
}


export default withRouter(Signup);