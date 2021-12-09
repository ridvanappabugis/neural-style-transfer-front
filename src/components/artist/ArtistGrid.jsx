import React from "react";
import ArtistCard from "./ArtistCard";
import PropTypes from 'prop-types';
import "./ArtistGrid.css"

class ArtistGrid extends React.Component {

    renderItems = () => {
        const { artistList, onArtistCardClick } = this.props;
        return artistList.map((item, index) => (
            <div key={index} className="column">
                <ArtistCard artist={item} onClick={onArtistCardClick} />
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

ArtistGrid.propTypes = {
    artistList: PropTypes.arrayOf(ArtistCard.propTypes.artist),
    onArtistCardClick: PropTypes.func
}

ArtistGrid.defaultProps = {
    artistList: null,
    onArtistCardClick: () => {}
};

export default ArtistGrid