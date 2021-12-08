import PropTypes from "prop-types";
import React from "react"
import "./ArtworkShowcase.css"
import ReactModal from 'react-modal';
import placeholder from "../../static/placeholder.png"

class ArtworkShowcase extends React.Component {

    constructor(props) {
        super(props);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.state = {
            modalIsOpen: false
        };
    }

    openModal() {
        this.setState({
            modalIsOpen: true
        })
    }

    closeModal(e) {
        e.stopPropagation();
        this.setState({
            modalIsOpen: false
        })
    }

    render() {
        let frameToArtPct = 0.15
        let frameToMatPct = 0.025

        let width = this.props.artwork.width
        let height = this.props.artwork.height

        let frameWidth = width / 0.7
        let frameHeight = height + (2*frameToArtPct * frameWidth)

        let frameAspectRatio = frameHeight/frameWidth

        let mapTopBottom = (frameToMatPct * frameWidth)/frameHeight

        let matWidth = (1-2*frameToMatPct)*frameWidth
        let artLeftRight = ((frameToArtPct-frameToMatPct)*frameWidth)/matWidth

        let matHeight = (1-2*mapTopBottom) * frameHeight
        let artTopBottom = ((frameToArtPct-frameToMatPct)*frameWidth)/matHeight

        return (
            <div onClick={this.openModal}>
                <div className="artwork-frame"
                     style={{
                         paddingBottom : frameAspectRatio*100 + "%",
                         position: "relative",
                         width: "100%",
                         background: "black",
                         boxShadow: "0 10px 7px -5px rgba(0, 0, 0, 0.3)"
                     }}
                >
                    <div className="artwork-mat"
                         style={{
                             top : mapTopBottom*100 + "%",
                             bottom : mapTopBottom*100+ "%",
                             left: "2.5%",
                             right: "2.5%",
                             background: "white",
                             position: "absolute",
                             boxShadow: "0px 0px 20px 0px rgba(0,0,0,0.5) inset"
                         }}
                    >
                        <div
                            className="artwork-art"
                            style={{
                                top : artTopBottom*100 + "%",
                                bottom : artTopBottom*100 + "%",
                                left : artLeftRight*100 + "%",
                                right : artLeftRight*100 + "%",
                                position: "absolute"
                            }}
                        >
                            <img src={this.props.artwork.dataSrc} alt="Avatar" />
                        </div>
                    </div>
                </div>
                <ReactModal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    onClick={this.closeModal}
                    className="artwork-modal"
                >
                    <img src={this.props.artwork.dataSrc} alt="Avatar" onClick={this.closeModal}/>
                </ReactModal>
            </div>

        )
    }
}

ArtworkShowcase.propTypes = {
    artwork: PropTypes.shape({
        dataSrc: PropTypes.string,
        width: PropTypes.number,
        height: PropTypes.number,
        title: PropTypes.string,
        completitionYear: PropTypes.number
    })
};

ArtworkShowcase.defaultProps = {
    artwork: {
        dataSrc: placeholder,
        width: 309,
        height: 240
    }
};

export default ArtworkShowcase