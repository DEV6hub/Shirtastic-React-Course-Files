import React, { Component } from 'react';


export default class GraphicDisplay extends Component{
    
    render() {
        return (
            <div>
                <h3 >Graphic Logo</h3>
                <img  ref="graphicImage"
                         className="img-fluid" 
                         src={require(`../../images/${this.props.match.params.graphicLogo}`)}
                         alt="shirt graphic" /> 
           </div>
        //    <Column flexGrow={1}>
        //     <Row horizontal='center'>
        //         <h1 style={styles.greyFont}>Graphic Display</h1>
        //     </Row>
        //     <Row vertical='center'>
        //         <Column flexGrow={1} horizontal='center'>
        //             <img  ref="graphicImage"
        //                  style={styles.imgWidth}
        //                  className="img-fluid" 
        //                  src={require(`../../images/graphic2.svg`)}
        //                  alt="shirt graphic" /> 
        //         </Column>
        //         <Column flexGrow={1} horizontal='center'>
        //             <img  ref="graphicImage"
        //                  style={styles.imgWidth}
        //                  className="img-fluid" 
        //                  src={require(`../../images/graphic3.svg`)}
        //                  alt="shirt graphic" />  
        //         </Column>
        //     </Row>
        // </Column>
        );
    }
}


