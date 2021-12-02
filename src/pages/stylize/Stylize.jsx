import React from "react";
import Header from "../../components/header/Header";

import ArtApiService from "../../service/art-service/ArtApiService";
import ArtworkShowcase from "../../components/artwork/ArtworkShowcase";

import "./Stylize.css"
import PropTypes from "prop-types";
import ArtworkUpload from "../../components/artwork/ArtworkUpload";

class StylizeBase extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            active: {
                home: "nav-inactive",
                artists: "nav-inactive",
                stylize: "nav-active"
            },

            // Web data fetch
            dataFetchedContent: false,
            dataFetchedStyle: false,
            styleArt: null,
            contentArt: null,

            // User data src
            styleArtUsr: null,
            contentArtUsr: null,

            // Radio style
            selectedStyleWeb: false,
            selectedStyleUsr: false,
            // Radio content
            selectedContentWeb: false,
            selectedContentUsr: false
        };
    }

    componentDidMount() {
        if (this.props.contentArtId != null) {
            ArtApiService.getArtworkDetails(
                this.props.contentArtId,
                data => this.setState({contentArt: data, dataFetchedContent: true})
            )
        }

        if (this.props.styleArtId != null) {
            ArtApiService.getArtworkDetails(
                this.props.styleArtId,
                data => this.setState({styleArt: data, dataFetchedStyle: true})
            )
        }
    }

    render() {
        let content = this.state.dataFetchedContent
        let style = this.state.dataFetchedStyle
        let contentArt = this.state.contentArt
        let styleArt = this.state.styleArt

        return (
            <div>
                <Header active={this.state.active} />
                <div className="stylize-body">
                    <div className="stylize-up">
                        <div className="stylize-up-left-column">
                            <div>
                                <input type="radio" name="style" className="stylize-radio"/>
                            </div>
                            <div>
                                <ArtworkShowcase
                                    url={(content && contentArt.img) || undefined}
                                    height={(content && contentArt.height) || undefined}
                                    width={(content && contentArt.width) || undefined}
                                />
                                {
                                    content && <div className="stylize-desc" >
                                        <h4>{contentArt.title}</h4>
                                        <p>{contentArt.completitionYear}</p>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="stylize-up-right-column">
                            <div>
                                <input type="radio" name="content" className="stylize-radio" />
                            </div>
                            <div>
                                <ArtworkShowcase
                                    url={(style && styleArt.img) || undefined}
                                    height={(style && styleArt.height) || undefined}
                                    width={(style && styleArt.width) || undefined}
                                />
                                {
                                    style && <div className="stylize-desc" >
                                        <h4>{styleArt.title}</h4>
                                        <p>{styleArt.completitionYear}</p>
                                    </div>
                                }
                            </div>

                        </div>
                    </div>
                    <div className="stylize-middle">
                        <h2>Choose one of the content (left) and style (right) images.</h2>
                        <h4>You can choose from the web (above) or upload your own (below).</h4>
                    </div>
                    <div className="stylize-up">
                        <div className="stylize-up-left-column">
                            <div>
                                <input type="radio" name="style" className="stylize-radio"/>
                            </div>
                            <ArtworkUpload />
                        </div>
                        <div className="stylize-up-right-column">
                            <div>
                                <input type="radio" name="content" className="stylize-radio" />
                            </div>
                            <ArtworkUpload />

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

StylizeBase.propTypes = {
    contentArtId: PropTypes.string,
    styleArtId: PropTypes.string
};

StylizeBase.defaultProps = {
    contentArtId: null,
    styleArtId: null
};

function Stylize(props) {
    const globalState = localStorage.getItem("stylizeArt")

    return <StylizeBase
        {...props}
        contentArtId={localStorage.getItem("contentArtId")}
        styleArtId={localStorage.getItem("styleArtId")}
    />
}

export default Stylize;