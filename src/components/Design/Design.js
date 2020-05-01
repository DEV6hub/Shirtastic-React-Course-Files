import React, { useState, useEffect, useRef, useCallback } from 'react';
import './Design.css';
import { Container, Row, Col, Card, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import { styleList } from '../../constants/styleList';
import ColorPicker from '../ColorPicker/ColorPicker';
import Graphic from '../Graphic/Graphic';
import Text from '../Text/Text';

const background = require('../../images/Fractal.png');

const Design = ({
    shirtToEdit, selectStyle, selectColor,
    selectGraphic, addShirtText, changeTextFont }) => {

    const [activeTab, setActiveTab] = useState('1');
    const graphicImage = useRef(null);

    useEffect(() => {
        if (shirtToEdit.image) {
            graphicImage.current.style.display = "block";
        }
    }, [shirtToEdit]);

    const toggle = useCallback(
        tab => {
            if (activeTab !== tab) {
                setActiveTab(tab);
            }
        },
        [setActiveTab, activeTab],
    );

    const selectGraphicHandler = useCallback(
        (graphic) => {
            // Show Image
            graphicImage.current.style.display = "block";
            selectGraphic(graphic);
        },
        [graphicImage, selectGraphic],
    );

    const renderImage = useCallback(
        (image, color) => {
            return image + '-' + color.toLowerCase();
        },
        [],
    );

    return (
        <Container fluid className="design-container">
            <div className="design-background">
                <img src={background} alt="background" />
            </div>
            <Row className="style-config-row">
                <Col className="style-config-col">
                    <Card className="style-card">
                        <div className="style-tabs-container">
                            <Nav tabs className="style-tabs">
                                <NavItem>
                                    <NavLink className={classnames({ active: activeTab === '1' })}
                                        onClick={() => { toggle('1'); }}>Styles</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className={classnames({ active: activeTab === '2' })}
                                        onClick={() => { toggle('2'); }}>Colours</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className={classnames({ active: activeTab === '3' })}
                                        onClick={() => { toggle('3'); }}>Graphics</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className={classnames({ active: activeTab === '4' })}
                                        onClick={() => { toggle('4'); }}>Text</NavLink>
                                </NavItem>
                            </Nav>
                        </div>
                        <TabContent activeTab={activeTab}>
                            <TabPane tabId="1">
                                <Container fluid className="select-style-container">
                                    <div className="style-title">Choose a shirt style</div>
                                    <Row className="select-style-row">
                                        {styleList.map((style, index) => (
                                            <Col key={index}>
                                                <div className={"style-img-container " + classnames({ active: shirtToEdit.shirtStyle === style.image })} onClick={() => selectStyle(style.image)}>
                                                    <img className="img-fluid" src={require(`../../images/${renderImage(style.image, shirtToEdit.shirtColor.name)}.jpg`)} alt="shirt style" />
                                                </div>
                                                <div className="style-description">{style.description}</div>
                                            </Col>
                                        ))}
                                    </Row>
                                </Container>
                            </TabPane>
                            <TabPane tabId="2">
                                <ColorPicker selectColor={selectColor} attribute={'shirt'} selectedColor={shirtToEdit.shirtColor} title={'Choose a shirt colour'} />
                            </TabPane>
                            <TabPane tabId="3">
                                <Graphic selectedGraphic={shirtToEdit.graphic} selectGraphic={selectGraphicHandler} />
                                <hr />
                                <ColorPicker selectColor={selectColor} attribute={'graphic'} selectedColor={shirtToEdit.graphicColor} title={'Change graphic colour'} />
                            </TabPane>
                            <TabPane tabId="4">
                                <Text text={shirtToEdit.text} addShirtText={addShirtText} changeTextFont={changeTextFont} font={shirtToEdit.font} />
                                <ColorPicker selectColor={selectColor} attribute={'text'} selectedColor={shirtToEdit.textColor} title={'Change text colour'} />
                            </TabPane>
                        </TabContent>
                    </Card>
                </Col>
                <Col className="style-config-col">
                    <Card className="img-configurator" id="imageRef">
                        <img className="img-fluid" src={require(`../../images/${renderImage(shirtToEdit.shirtStyle, shirtToEdit.shirtColor.name)}.jpg`)} alt="shirt style" />
                        <img ref={graphicImage} className="img-fluid graphic-img" style={{ display: "none" }} src={shirtToEdit.graphic ? require(`../../images/${shirtToEdit.graphic}`) : ''} alt="shirt graphic" />
                        <div className="shirt-text" style={{ color: shirtToEdit.textColor.color, fontFamily: shirtToEdit.font }}>{shirtToEdit.text}</div>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Design;