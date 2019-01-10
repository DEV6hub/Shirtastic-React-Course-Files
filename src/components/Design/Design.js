import React, { useState, useEffect, useRef } from 'react';
import './Design.css';
import { Container, Row, Col, Card, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';

import ColorPicker from '../ColorPicker/ColorPicker';
import Graphic from '../Graphic/Graphic';
import Text from '../Text/Text';

const background = require('../../images/Fractal.png');

function Design(props){
    const [activeTab, setActiveTab] = useState('1');
    const [styleList, setStyleList] = useState([{ image: 'MensShirt', description: 'Mens Fine Jersey Short Sleeve' },{ image: 'WomensShirt', description: 'Womens Fine Jersey Short Sleeve' }])
    const graphicImageRef = useRef();

    useEffect(() => {
        if (props.shirtToEdit.image) {
            graphicImageRef.current.style.display = "block";
            // this.makeDraggable(this.refs.text);
            // this.makeDraggable(this.refs.graphicImage);
        }
    }, []);

    const selectStyle = (style) => {
        props.selectStyle(style);
    }

    const selectColor = (color, attribute) => {
        props.selectColor(color, attribute);
    }

    const selectGraphic = (graphic) => {
        // Show Image
        graphicImageRef.current.style.display = "block";
        // Make Image draggable
        // let element = this.makeDraggable(this.refs.graphicImage);
        props.selectGraphic(graphic);
    }

    const addShirtText = (text) => {
        // Make Text draggable
        // let element = this.makeDraggable(this.refs.text);
        props.addShirtText(text);
    }

    const changeTextFont = (event) => {
        props.changeTextFont(event.target.value);
    }

    const makeDraggable = (element) => {
        let mousePosition;
        let offset = [0, 0];
        let isDown = false;
        element.addEventListener('mousedown', function (event) {
            isDown = true;
            offset = [
                element.offsetLeft - event.clientX,
                element.offsetTop - event.clientY
            ];
        }, true);

        document.addEventListener('mouseup', function () {
            isDown = false;
        }, true);

        document.addEventListener('mousemove', function (event) {
            event.preventDefault();
            if (isDown) {
                mousePosition = {

                    x: event.clientX,
                    y: event.clientY

                };
                element.style.left = (mousePosition.x + offset[0]) + 'px';
                element.style.top = (mousePosition.y + offset[1]) + 'px';
            }
        }, true);

        return element;

    }

    const renderImage = (image, color) => {
        return image + '-' + color.toLowerCase();
    }

    const getImageColor = (image) => {
        let colorArr = image.split('-');
        return colorArr[1];
    }

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
                                            onClick={() => { setActiveTab('1'); }}>Styles</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className={classnames({ active: activeTab === '2' })}
                                            onClick={() => { setActiveTab('2'); }}>Colours</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className={classnames({ active: activeTab === '3' })}
                                            onClick={() => { setActiveTab('3'); }}>Graphics</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className={classnames({ active: activeTab === '4' })}
                                            onClick={() => { setActiveTab('4'); }}>Text</NavLink>
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
                                                    <div className={"style-img-container " + classnames({ active: props.shirtToEdit.shirtStyle === style.image })} onClick={() => { selectStyle(style.image); }}>
                                                        <img className="img-fluid" src={require(`../../images/${renderImage(style.image, props.shirtToEdit.shirtColor.name)}.jpg`)} alt="shirt style" />
                                                    </div>
                                                    <div className="style-description">{style.description}</div>
                                                </Col>
                                            ))}
                                        </Row>
                                    </Container>
                                </TabPane>
                                <TabPane tabId="2">
                                    <ColorPicker selectColor={selectColor} attribute={'shirt'} selectedColor={props.shirtToEdit.shirtColor} title={'Choose a shirt colour'} />
                                </TabPane>
                                <TabPane tabId="3">
                                    <Graphic selectedGraphic={props.shirtToEdit.graphic} selectGraphic={selectGraphic} />
                                    <hr />
                                    <ColorPicker selectColor={selectColor} attribute={'graphic'} selectedColor={props.shirtToEdit.graphicColor} title={'Change graphic colour'} />
                                </TabPane>
                                <TabPane tabId="4">
                                    <Text text={props.shirtToEdit.text} addShirtText={addShirtText} changeTextFont={changeTextFont} font={props.shirtToEdit.font} />
                                    <ColorPicker selectColor={selectColor} attribute={'text'} selectedColor={props.shirtToEdit.textColor} title={'Change text colour'} />
                                </TabPane>
                            </TabContent>
                        </Card>
                    </Col>
                    <Col className="style-config-col">
                        <Card className="img-configurator" id="imageRef">
                            <img className="img-fluid" src={require(`../../images/${renderImage(props.shirtToEdit.shirtStyle, props.shirtToEdit.shirtColor.name)}.jpg`)} alt="shirt style" />
                            <img ref={graphicImageRef} className="img-fluid graphic-img" style={{ display: "none" }} src={props.shirtToEdit.graphic ? require(`../../images/${props.shirtToEdit.graphic}`) : ''} alt="shirt graphic" />
                            <div /*ref="text"*/ className="shirt-text" style={{ color: props.shirtToEdit.textColor.color, fontFamily: props.shirtToEdit.font }}>{props.shirtToEdit.text}</div>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
}

export default Design;