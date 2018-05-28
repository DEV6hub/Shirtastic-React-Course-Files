import React, { Component } from 'react';
import './Home.css';

import { Container, Row, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';

import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import Shipping from '../Shipping/Shipping';

const background = require('../../images/Fractal.png');
const logoVertical = require('../../images/Shirtastic-vertical.svg');

class Home extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1'
        };
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render() {
        return (<Container fluid>
            <div className="img-container">
                <img src={background} alt="background" />
            </div>
            <Row className="row-full-height">
                {this.state.activeTab === '1' ? <div className="side-column" >
                    {/* Login Component Goes Here */}
                    <Login />
                </div> : null}

                <div className="center-column">
                    <img className="vertical-logo" src={logoVertical} alt="vertical logo" />
                    <div className="copyright text-center">© 2018 DEV6 – A division of The New Toronto Group Inc.</div>
                </div>
                <div className={"side-column " + (this.state.activeTab === '2' ? 'shipping-col' : '')}>
                    {this.state.activeTab === '1' ? <h2 className="text-center">Sign up</h2> : null}
                    <Nav tabs className="home-tabs">
                        <NavItem>
                            <NavLink className={classnames({ active: this.state.activeTab === '1' })}
                                onClick={() => { this.toggle('1'); }}>Step 1</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className={classnames({ active: this.state.activeTab === '2' })}
                                onClick={() => { this.toggle('2'); }}>Step 2</NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                            {/* Signup Component Goes Here */}
                            <Signup />
                        </TabPane>
                        <TabPane tabId="2">
                            {/* Shipping Component Goes Here */}
                            <Shipping />
                        </TabPane>
                    </TabContent>
                </div>
            </Row>
        </Container >);
    }
}
export default Home;