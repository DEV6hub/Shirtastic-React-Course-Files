import React, { useState } from 'react';
import './CatalogTabs.css';
import classnames from 'classnames';
import { Container, Row, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';

import Shirt from '../Shirt/Shirt';

function CatalogTabs(props) {
    const [activeTab, setActiveTab] = useState('1')
    

    const addToCart = (shirt) => {
        props.addToCart(shirt);
    }

    const editShirt = (shirt) => {
        props.editShirt(shirt);
    }

        return (
            <Container fluid className="fluid-container">
                <Nav tabs className="catalog-tabs">
                    <NavItem>
                        <NavLink className={classnames({ active: activeTab === '1' })}
                            onClick={() => { setActiveTab('1'); }}>All Designs</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={classnames({ active: activeTab === '2' })}
                            onClick={() => { setActiveTab('2'); }}>Men</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={classnames({ active: activeTab === '3' })}
                            onClick={() => { setActiveTab('3'); }}>Women</NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                        {/* All Shirt List Goes Here */}
                        <Row>
                            {props.shirtList.map(shirt => (
                                <Shirt key={shirt.id} shirt={shirt} addToCart={addToCart} editShirt={editShirt} />
                            ))}
                        </Row>
                    </TabPane>
                    <TabPane tabId="2">
                        {/* Men Shirt List Goes Here */}
                        <Row>
                            {props.shirtList.filter(shirt => { return shirt.gender === 'M' }).map(shirt => (
                                <Shirt key={shirt.id} shirt={shirt} addToCart={addToCart} editShirt={editShirt} />
                            ))}
                        </Row>
                    </TabPane>
                    <TabPane tabId="3">
                        {/* Women Shirt List Goes Here */}
                        <Row>
                            {props.shirtList.filter(shirt => { return shirt.gender === 'W' }).map(shirt => (
                                <Shirt key={shirt.id} shirt={shirt} addToCart={addToCart} editShirt={editShirt} />
                            ))}
                        </Row>
                    </TabPane>
                </TabContent>
            </Container>
        );
}

export default CatalogTabs;