import React, { Component } from 'react';
import './Design.css';
import { Container, Row, Col, Card, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';

import ColorPicker from '../ColorPicker/ColorPicker';
import Graphic from '../Graphic/Graphic';
import Text from '../Text/Text';

const background = require('../../images/Fractal.png');

class Design extends Component {

    constructor() {
        super();
        this.toggle = this.toggle.bind(this);
        this.selectStyle = this.selectStyle.bind(this);
        this.selectColor = this.selectColor.bind(this);
        this.selectGraphic = this.selectGraphic.bind(this);
        this.renderImage = this.renderImage.bind(this);
        this.addShirtText = this.addShirtText.bind(this);
        this.changeTextFont = this.changeTextFont.bind(this);
        this.makeDraggable = this.makeDraggable.bind(this);

        this.state = {
            activeTab: '1',
            styleList: [{ image: 'MensShirt', description: 'Mens Fine Jersey Short Sleeve' },
            { image: 'WomensShirt', description: 'Womens Fine Jersey Short Sleeve' }],
        };
    }

    componentDidMount() {
        if (this.props.shirtToEdit.image) {
            this.refs.graphicImage.style.display = "block";
            // this.makeDraggable(this.refs.text);
            // this.makeDraggable(this.refs.graphicImage);
        }
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    selectStyle(style) {
        this.props.selectStyle(style);
    }

    selectColor(color, attribute) {
        this.props.selectColor(color, attribute);
    }

    selectGraphic = (graphic) => {
        // Show Image
        this.refs.graphicImage.style.display = "block";
        // Make Image draggable
        // let element = this.makeDraggable(this.refs.graphicImage);
        this.props.selectGraphic(graphic);
    }

    addShirtText = (text) => {
        // Make Text draggable
        // let element = this.makeDraggable(this.refs.text);
        this.props.addShirtText(text);
    }

    changeTextFont = (event) => {
        this.props.changeTextFont(event.target.value);
    }

    makeDraggable = (element) => {
        let mousePosition;
        let offset = [0, 0];
        let isDown = false;
        element.addEventListener('mousedown', function (e) {
            isDown = true;
            offset = [
                element.offsetLeft - e.clientX,
                element.offsetTop - e.clientY
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

    renderImage(image, color) {
        return image + '-' + color.toLowerCase();
    }

    getImageColor(image) {
        let colorArr = image.split('-');
        return colorArr[1];
    }

    render() {
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
                                        <NavLink className={classnames({ active: this.state.activeTab === '1' })}
                                            onClick={() => { this.toggle('1'); }}>Styles</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className={classnames({ active: this.state.activeTab === '2' })}
                                            onClick={() => { this.toggle('2'); }}>Colours</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className={classnames({ active: this.state.activeTab === '3' })}
                                            onClick={() => { this.toggle('3'); }}>Graphics</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className={classnames({ active: this.state.activeTab === '4' })}
                                            onClick={() => { this.toggle('4'); }}>Text</NavLink>
                                    </NavItem>
                                </Nav>
                            </div>
                            <TabContent activeTab={this.state.activeTab}>
                                <TabPane tabId="1">
                                    <Container fluid className="select-style-container">
                                        <div className="style-title">Choose a shirt style</div>
                                        <Row className="select-style-row">
                                            {this.state.styleList.map((style, index) => (
                                                <Col key={index}>
                                                    <div className={"style-img-container " + classnames({ active: this.props.shirtToEdit.shirtStyle === style.image })} onClick={() => { this.selectStyle(style.image); }}>
                                                        <img className="img-fluid" src={require(`../../images/${this.renderImage(style.image, this.props.shirtToEdit.shirtColor.name)}.jpg`)} alt="shirt style" />
                                                    </div>
                                                    <div className="style-description">{style.description}</div>
                                                </Col>
                                            ))}
                                        </Row>
                                    </Container>
                                </TabPane>
                                <TabPane tabId="2">
                                    <ColorPicker selectColor={this.selectColor} attribute={'shirt'} selectedColor={this.props.shirtToEdit.shirtColor} title={'Choose a shirt colour'} />
                                </TabPane>
                                <TabPane tabId="3">
                                    <Graphic selectedGraphic={this.props.shirtToEdit.graphic} selectGraphic={this.selectGraphic} />
                                    <hr />
                                    <ColorPicker selectColor={this.selectColor} attribute={'graphic'} selectedColor={this.props.shirtToEdit.graphicColor} title={'Change graphic colour'} />
                                </TabPane>
                                <TabPane tabId="4">
                                    <Text text={this.props.shirtToEdit.text} addShirtText={this.addShirtText} changeTextFont={this.changeTextFont} font={this.props.shirtToEdit.font} />
                                    <ColorPicker selectColor={this.selectColor} attribute={'text'} selectedColor={this.props.shirtToEdit.textColor} title={'Change text colour'} />
                                </TabPane>
                            </TabContent>
                        </Card>
                    </Col>
                    <Col className="style-config-col">
                        <Card className="img-configurator" id="imageRef">
                            <img className="img-fluid" src={require(`../../images/${this.renderImage(this.props.shirtToEdit.shirtStyle, this.props.shirtToEdit.shirtColor.name)}.jpg`)} alt="shirt style" />
                            <img ref="graphicImage" className="img-fluid graphic-img" style={{ display: "none" }} src={this.props.shirtToEdit.graphic ? require(`../../images/${this.props.shirtToEdit.graphic}`) : ''} alt="shirt graphic" />
                            <div ref="text" className="shirt-text" style={{ color: this.props.shirtToEdit.textColor.color, fontFamily: this.props.shirtToEdit.font }}>{this.props.shirtToEdit.text}</div>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Design;