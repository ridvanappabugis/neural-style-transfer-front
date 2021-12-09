import PropTypes from "prop-types";
import {useNavigate, useParams} from "react-router-dom";
import React from "react";
import ArtApiService from "../../service/art-service/ArtApiService";
import Header from "../../components/header/Header";
import ArtworkGrid from "../../components/artwork/ArtworkGrid";


class ArtistBase extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            active: {
                home: "nav-inactive",
                artists: "nav-inactive",
                process: "nav-inactive"
            },
            artwork: [],
            dataFetched: false
        };
    }

    componentDidMount() {
        ArtApiService.getArtworkByArtistSearch(
            this.props.artistId,
            null,
            data => this.setState({artwork: data, dataFetched: true})
        )
    }

    render() {

        if (!this.state.dataFetched) return (
            <div> <h1> Please wait some time.... </h1> </div>
        )

        return (
            <div>
                <Header active={this.state.active} />
                <div className="search-body">
                    <div>
                        <ArtworkGrid
                            artworkList={this.state.artwork}
                            onArtworkCardClick={
                                (artwork) => {
                                    this.props.navigate("/artwork/" + artwork._id, { replace: true })
                                }
                            }
                        />
                    </div>
                </div>
            </div>
        )
    }
}

Artist.propTypes = {
    artistId: PropTypes.string.isRequired
}

Artist.defaultProps = {
    artistId: null
};

function Artist(props) {
    let params = useParams();
    let navigate = useNavigate();

    return <ArtistBase {...props} artistId={params.id} navigate={navigate} />
}

export default Artist;