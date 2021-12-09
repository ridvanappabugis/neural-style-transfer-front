import React from "react";
import Header from "../../components/header/Header";
import "../artists/Artists.css"
import ArtApiService from "../../service/art-service/ArtApiService";
import {useNavigate} from "react-router-dom";
import ArtistGrid from "../../components/artist/ArtistGrid";

class ArtistsBase extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            active: {
                home: "nav-inactive",
                artists: "nav-inactive",
                process: "nav-inactive"
            },
            artists: [],
            pagToken: null,
            hasMore: true,
            dataFetched: false
        };
        this.getLists = this.getLists.bind(this)
    }

    componentDidMount() {
        this.getLists()
    }

    getLists() {
        this.setState({dataFetched: false})
        ArtApiService.getArtistList(
            this.state.pagToken,
            (data, pagToken, hasMore) => this.setState({
                artists: data,
                pagToken: pagToken,
                hasMore: hasMore,
                dataFetched: true
            })
        )
    }

    render() {

        if (!this.state.dataFetched) return (
            <div> <h1> Please wait some time.... </h1> </div>
        )

        return (
            <div>
                <Header active={this.state.active} />
                <div className="artists-body">
                        <ArtistGrid
                            artistList={this.state.artists}
                            onArtistCardClick={
                                (artist) => {
                                    this.props.navigate("/artist-paintings/" + artist._id, { replace: true })
                                }
                            }
                        />
                        <button disabled={!this.state.hasMore} className="artists-button" onClick={this.getLists}>Next Page</button>
                </div>
            </div>
        )
    }
}

function Artists(props) {
    let navigate = useNavigate();
    return <ArtistsBase {...props} navigate={navigate} />
}

export default Artists;