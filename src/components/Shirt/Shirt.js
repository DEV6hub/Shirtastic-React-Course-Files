import React, { Component } from 'react';
import './Shirt.css';
import { Container, Row, Col, Card } from 'reactstrap';

class Shirt extends Component {

    addToCart = () => {
        this.props.addToCart(this.props.shirt);
    }

    editShirt = () => {
        this.props.editShirt(this.props.shirt);
    }

    reCalculate = (pixels, parameter) => {
        let newPixels;
        pixels = pixels.substring(0, pixels.length - 2);
        switch (parameter) {
            case 'left':
                newPixels = (parseInt(pixels, 10) / 678) * 100 + 25 + "%";
                break;
            case 'top':
                newPixels = (parseInt(pixels, 10) / 813) * 100 + 30 + "%";
                break;
            default:
                newPixels = "100px";
        }
        return newPixels;
    }

    render() {
        return (
            <Card className="text-center">
                {this.props.shirt.graphic ?
                    <img ref="graphicImage" className="img-fluid shirt-graphic-img" src={this.props.shirt.graphic ? require(`../../images/${this.props.shirt.graphic}`) : ''} alt="shirt graphic" /> : null}
                {this.props.shirt.text ?
                    <div ref="text" className="shirt-text-final" style={{ color: this.props.shirt.textColor.color, fontFamily: this.props.shirt.font }}>{this.props.shirt.text}</div> : null}
                <img className="img-fluid" src={require(`../../images/${this.props.shirt.image}.jpg`)} alt="Shirt" />
                <h4 className="card-title">{this.props.shirt.name}</h4>
                <p className="description">{this.props.shirt.description}</p>
                <Container>
                    <Row className="btn-row">
                        <Col className="icon-basket" xs="2" onClick={() => { this.addToCart(); }}></Col>
                        <Col className="text" xs="8">
                            <strong>${this.props.shirt.price}</strong>
                        </Col>
                        <Col className="icon-edit" xs="2" onClick={() => { this.editShirt(); }}></Col>
                    </Row>
                </Container>
            </Card>
        )
    }

}

export default Shirt;