import React, { Component } from 'react';
//import { Column, Row } from 'simple-flexbox';

export default class GraphicDisplay extends Component{
    
    render() {
        return (
            <div>
                <h3>ID: {this.props.match.params.graphicLogo}</h3>
                <img ref="graphicImage"
                         className="img-fluid shirt-graphic-img" 
                         src={require(`../../images/${this.props.match.params.graphicLogo}`)}
                         alt="shirt graphic" /> 
            </div>
        );
    }

}

const styles = {
    greyFont: {
        color: 'grey'
    },
    imgWidth: {
        width: 180,
    },
    graphicHeader: {
      border: '1px solid black',
      color: 'grey',
      textAlign: 'center'
    } ,
    graphicContainer: {
        border: '1px solid black',
        backgroundColor: 'grey'
    }
};
