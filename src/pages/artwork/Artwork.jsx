import React from "react";
import Header from "../../components/header/Header";
import ArtApiService from "../../service/art-service/ArtApiService";
import {useParams} from "react-router-dom";
import PropTypes from "prop-types";
import "./Artwork.css"
import ArtworkShowcase from "../../components/artwork/ArtworkShowcase";
import {STYLE_WEB, CONTENT_WEB} from "../stylize/StylizeChose"

class ArtworkBase extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            active: {
                home: "nav-inactive",
                artists: "nav-inactive",
                process: "nav-inactive"
            },
            dataFetched: false
        };

        this.addContent = this.addContent.bind(this)
        this.addStyle = this.addStyle.bind(this)
    }

    componentDidMount() {
        ArtApiService.getArtworkDetails(
            this.props.id,
            data => this.setState({artwork: data, dataFetched: true})
        )
    }

    addStyle() {
        localStorage.setItem("STYLE_WEB_ID", this.props.id)
        localStorage.setItem(
            STYLE_WEB,
            JSON.stringify({
                dataSrc: this.state.artwork.img,
                width: this.state.artwork.width,
                height: this.state.artwork.height,
                title: this.state.artwork.title,
                completitionYear: this.state.artwork.completitionYear
            })
        )
        this.setState({addedAsStyle: true})
    }

    addContent() {
        localStorage.setItem("CONTENT_WEB_ID", this.props.id)
        localStorage.setItem(
            CONTENT_WEB,
            JSON.stringify({
                dataSrc: this.state.artwork.img,
                width: this.state.artwork.width,
                height: this.state.artwork.height,
                title: this.state.artwork.title,
                completitionYear: this.state.artwork.completitionYear
            })
        )
        this.setState({addedAsContent: true})
    }

    render() {

        if (!this.state.dataFetched) return (
            <div> <h1> Please wait some time.... </h1> </div>
        )

        let artwork = this.state.artwork

        return (
            <div>
                <Header active={this.state.active} />
                <div className="artwork-body">
                    <div className="artwork-up">
                        <div className="artwork-up-left-column">
                            <div>
                                <ArtworkShowcase artwork={{dataSrc: artwork.img, height: artwork.height, width: artwork.width }}/>
                            </div>
                        </div>
                        <div className="artwork-up-right-column">
                            <div>
                                <h1>{artwork.title}</h1>
                                <h3>{artwork.artistName}</h3>
                                <h6>{artwork.completitionYear}</h6>
                                <h6>{artwork.artStyles[0]}</h6>
                            </div>
                        </div>
                    </div>
                    <div className="artwork-down">
                        <h6>Details</h6>
                        <hr style={{ border: "1px solid black" }}/>
                        {
                            (artwork.description && <p>{artwork.description}</p>)
                            || <p>No description provided.</p>
                        }
                    </div>
                    <div className="artwork-down">
                        <button disabled={localStorage.getItem("CONTENT_WEB_ID") === this.props.id} className="artwork-add-btn" onClick={this.addContent}>Add As Content</button>
                        <button disabled={localStorage.getItem("STYLE_WEB_ID") === this.props.id} className="artwork-add-btn" onClick={this.addStyle}>Add As Style</button>
                    </div>
                </div>
            </div>
        )
    }
}

ArtworkBase.propTypes = {
    id: PropTypes.string.isRequired
}

ArtworkBase.defaultProps = {
    id: null
};

function Artwork(props) {
    let params = useParams();

    return <ArtworkBase {...props} id={params.id} />
}

export default Artwork;