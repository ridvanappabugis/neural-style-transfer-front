import PropTypes from 'prop-types';

import React from "react"
import "./ArtistCard.css"

class ArtistCard extends React.Component {

    render() {
        const { artist, onClick } = this.props;

        return (
            <div className="card" onClick={() => onClick(artist)}>
                <img src={artist.img}  alt="Avatar" className="artist-img" />
                <div className="container">
                    <p className="art-name">{artist.name}</p>
                </div>
            </div>
        )
    }
}

ArtistCard.propTypes = {
    artist: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        img: PropTypes.string.isRequired
    }),
    onClick: PropTypes.func
};

ArtistCard.defaultProps = {
    artist: null,
    onClick: () => {},
    img: null
};

export default ArtistCard