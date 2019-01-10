import React, { useState, Fragment } from 'react';
import './Home.css';

import { Container, Row, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';

import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import Shipping from '../Shipping/Shipping';

const background = require('../../images/Fractal.png');
const logoVertical = require('../../images/Shirtastic-vertical.svg');

function Home(props) {
    const [state, setState] = useState({activeTab: '1', email: '', password: ''})
    const [activeTab, setActiveTab] = useState('1');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const selectedTabId = (tabId) => {
        setActiveTab(tabId);
    }

    const signUpData = (data) => {
        setState({ email: data.email, password: data.password })
    }
    
        return (
          <Container fluid>
         {/* <Fragment> */}
            <div className="img-container">
                <img src={background} alt="background" />
            </div>
            <Row className="row-full-height">
                {activeTab === '1' ? <div className="side-column" >
                    {/* Login Component Goes Here */}
                    <Login userSignUpData={state}/>
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
                                onClick={() => { setActiveTab('1'); }}>Step 1</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className={classnames({ active: activeTab === '2' })}
                                onClick={() => { setActiveTab('2'); }}>Step 2</NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={activeTab}>
                        <TabPane tabId="1">
                            {/* Signup Component Goes Here */}
                            {/* {React.createElement(Signup, {
                                onSelectTabId: this.selectedTabId,
                                userSignUpData: this.signUpData
                            })} */}
                            <Signup onSelectTabId={selectedTabId} userSignUpData={signUpData}/>
                        </TabPane>
                        <TabPane tabId="2">
                            {/* Shipping Component Goes Here */}
                            <Shipping signUpdata={state}/>
                        </TabPane>
                    </TabContent>
                </div>
            </Row>
           {/* </Fragment> */}
        </Container >
    );
}
export default Home;