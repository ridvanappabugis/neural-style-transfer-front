import React from "react";
import ArtworkCard from "./ArtworkCard";
import PropTypes from 'prop-types';
import "./ArtworkGrid.css"

class ArtworkGrid extends React.Component {

    renderItems = () => {
        const { artworkList, onArtworkCardClick } = this.props;

        return artworkList.map((item, index) => (
            <div key={index} className="column">
                <ArtworkCard artwork={item} onClick={onArtworkCardClick} />
            </div>
        ));
    };

    render() {
        return (
            <div className="row">
                {this.renderItems()}
            </div>
        )
    }
}

ArtworkGrid.propTypes = {
    artworkList: PropTypes.arrayOf(ArtworkCard.propTypes.artwork),
    onArtworkCardClick: PropTypes.func
}

ArtworkGrid.defaultProps = {
    artworkList: null,
    onArtworkCardClick: () => {}
};

export default ArtworkGrid