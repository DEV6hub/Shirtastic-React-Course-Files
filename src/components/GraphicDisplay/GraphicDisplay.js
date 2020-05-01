import React from 'react';

const GraphicDisplay = props => (
    <div>
        <h3 style={styles.graphicHeader}>Graphic Logo</h3>
        <img style={styles.graphicContainer}
            className="img-fluid shirt-graphic-img"
            src={require(`../../images/${props.match.params.graphicLogo}`)}
            alt="shirt graphic" />
    </div>
)

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
    },
    graphicContainer: {
        border: '1px solid black',
        backgroundColor: 'grey'
    }
};

export default GraphicDisplay