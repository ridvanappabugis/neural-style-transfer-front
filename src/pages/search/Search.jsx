import React from "react";
import Header from "../../components/header/Header";
import "../search/Search.css"
import ArtworkGrid from "../../components/artwork/ArtworkGrid";
import ArtApiService from "../../service/art-service/ArtApiService";
import {useNavigate, useSearchParams} from "react-router-dom";

class SearchBase extends React.Component {

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
        ArtApiService.getPaintingsSearch(
            this.props.searchTerm,
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

function Search(props) {
    let navigate = useNavigate();
    let [searchParams] = useSearchParams();
    return <SearchBase {...props} searchTerm={searchParams.get("searchTerm")} navigate={navigate} />
}

export default Search;