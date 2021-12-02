import React from "react";
import Header from "../../components/header/Header";
import "../home/Home.css"
import ArtworkGrid from "../../components/artwork/ArtworkGrid";
import ArtApiService from "../../service/art-service/ArtApiService";
import {useNavigate} from "react-router-dom";

class HomeBase extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            active: {
                home: "nav-active",
                artists: "nav-inactive",
                process: "nav-inactive"
            },
            artwork: [],
            dataFetched: false
        };
    }

    componentDidMount() {
        ArtApiService.getPopularArtwork(
            data => this.setState({artwork: data, dataFetched: true}),
            15
        )
    }

    render() {

        if (!this.state.dataFetched) return (
            <div> <h1> Please wait some time.... </h1> </div>
        )

        return (
            <div>
                <Header active={this.state.active} />
                <div className="home">
                    <div className="home-top">
                        <h2>Browse popular artwork.</h2>
                        <h4>Or search for a specific one above.</h4>
                    </div>
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
        )
    }
}

function Home(props) {
    let navigate = useNavigate();
    return <HomeBase {...props} navigate={navigate} />
}

export default Home;