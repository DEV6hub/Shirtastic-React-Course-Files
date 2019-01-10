import React, { useRef } from 'react';
import './Shirt.css';
import { Container, Row, Col, Card } from 'reactstrap';
import { Link } from 'react-router-dom';
function Shirt(props) {

    const addToCart = () => {
        props.addToCart(props.shirt);
    }

    const editShirt = () => {
        props.editShirt(props.shirt);
    }

    const reCalculate = (pixels, parameter) => {
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

    const graphicImageRef = useRef();
    const textRef = useRef();

        return (
           
            <Card className="text-center">
                {props.shirt.graphic ?
                //{`/users/${user.id}`}
                   <Link to= {`/graphic/${props.shirt.graphic}`}>
                    <img ref={graphicImageRef}
                         className="img-fluid shirt-graphic-img" 
                         src={props.shirt.graphic ? require(`../../images/${props.shirt.graphic}`) : ''} 
                         alt="shirt graphic" /> 
                         </Link>
                : null}
                {props.shirt.text ?
                    <div ref={textRef} className="shirt-text-final" style={{ color: props.shirt.textColor.color, fontFamily: props.shirt.font }}>{props.shirt.text}</div> : null}
                <img className="img-fluid" src={require(`../../images/${props.shirt.image}.jpg`)} alt="Shirt" />
                <h4 className="card-title">{props.shirt.name}</h4>
                <p className="description">{props.shirt.description}</p>
                <Container>
                    <Row className="btn-row">
                        <Col className="icon-basket" xs="2" onClick={() => { addToCart(); }}></Col>
                        <Col className="text" xs="8">
                            <strong>${props.shirt.price}</strong>
                        </Col>
                        <Col className="icon-edit" xs="2" onClick={() => { editShirt(); }}></Col>
                    </Row>
                </Container>
            </Card>  
        )

}

export default Shirt;