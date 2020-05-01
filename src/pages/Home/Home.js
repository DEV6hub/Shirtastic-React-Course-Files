import React, { useState, useCallback } from 'react';
import './Home.css';
import { Container, Row, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';

import Login from '../../components/Login/Login';
import Signup from '../../components/Signup/Signup';
import Shipping from '../../components/Shipping/Shipping';

const background = require('../../images/Fractal.png');
const logoVertical = require('../../images/Shirtastic-vertical.svg');

const Home = () => {
    const [activeTab, setActiveTab] = useState('1');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const info = { activeTab, email, password };

    const toggle = useCallback(
        tab => {
            if (activeTab !== tab) {
                setActiveTab(tab);
            }
        },
        [setActiveTab, activeTab],
    );

    const selectedTabId = useCallback(
        tabId => setActiveTab(tabId),
        [setActiveTab],
    );

    const signUpData = useCallback(
        ({ email, password }) => {
            setEmail(email);
            setPassword(password);
        },
        [setEmail, setPassword],
    );

    return (
        <Container fluid>
            <div className="img-container">
                <img src={background} alt="background" />
            </div>
            <Row className="row-full-height">
                {activeTab === '1' ? <div className="side-column" >
                    {/* Login Component Goes Here */}
                    <Login userSignUpData={info} />
                </div> : null}

                <div className="center-column">
                    <img className="vertical-logo" src={logoVertical} alt="vertical logo" />
                    <div className="copyright text-center">© 2018 DEV6 – A division of The New Toronto Group Inc.</div>
                </div>
                <div className={"side-column " + (activeTab === '2' ? 'shipping-col' : '')}>
                    {activeTab === '1' ? <h2 className="text-center">Sign up</h2> : null}
                    <Nav tabs className="home-tabs">
                        <NavItem>
                            <NavLink className={classnames({ active: activeTab === '1' })}
                                onClick={() => { toggle('1'); }}>Step 1</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className={classnames({ active: activeTab === '2' })}
                                onClick={() => { toggle('2'); }}>Step 2</NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={activeTab}>
                        <TabPane tabId="1">
                            {/* Signup Component Goes Here */}
                            <Signup onSelectTabId={selectedTabId} userSignUpData={signUpData} />
                        </TabPane>
                        <TabPane tabId="2">
                            {/* Shipping Component Goes Here */}
                            <Shipping signUpdata={info} />
                        </TabPane>
                    </TabContent>
                </div>
            </Row>
        </Container >
    )
}

export default Home;
