import PropTypes from 'prop-types';

import React from "react"
import "./ArtworkCard.css"

class ArtworkCard extends React.Component {

    render() {
        const { artwork, onClick } = this.props;

        return (
            <div className="card" onClick={() => onClick(artwork)}>
                <img src={artwork.img}  alt="Avatar" />
                <div className="container">
                    <p className="art-name">{artwork.name}</p>
                    <h5>{artwork.artistName}</h5>
                    <p>{artwork.completitionYear}</p>
                </div>
            </div>
        )
    }
}

ArtworkCard.propTypes = {
    artwork: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        artistName: PropTypes.string.isRequired,
        artistId: PropTypes.string.isRequired,
        img: PropTypes.string.isRequired,
        completitionYear: PropTypes.number
    }),
    onClick: PropTypes.func
};

ArtworkCard.defaultProps = {
    artwork: null,
    onClick: () => {}
};

export default ArtworkCard