import React, { Component } from 'react';
import { Column, Row } from 'simple-flexbox';

export default class GraphicDisplay extends Component{
    
    render() {
        return (
        //     <div>
        //         <h3 style={styles.graphicHeader}>Graphic Logo</h3>
        //         <img style={styles.graphicContainer} ref="graphicImage"
        //                  className="img-fluid shirt-graphic-img" 
        //                  src={require(`../../images/${this.props.match.params.graphicLogo}`)}
        //                  alt="shirt graphic" /> 
        //    </div>
           <Column flexGrow={1}>
            <Row horizontal='center'>
                <h1 style={styles.greyFont}>Graphic Display</h1>
            </Row>
            <Row vertical='center'>
                <Column flexGrow={1} horizontal='center'>
                    <img  ref="graphicImage"
                         style={styles.imgWidth}
                         className="img-fluid" 
                         src={require(`../../images/graphic2.svg`)}
                         alt="shirt graphic" /> 
                </Column>
                <Column flexGrow={1} horizontal='center'>
                    <img  ref="graphicImage"
                         style={styles.imgWidth}
                         className="img-fluid" 
                         src={require(`../../images/graphic3.svg`)}
                         alt="shirt graphic" />  
                </Column>
            </Row>
        </Column>
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
