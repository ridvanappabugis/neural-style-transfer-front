import React from "react";
import Header from "../../components/header/Header";

import ArtworkShowcase from "../../components/artwork/ArtworkShowcase";

import "./Stylize.css"
import ArtworkUpload from "../../components/artwork/ArtworkUpload";
import {useNavigate} from "react-router-dom";
export const CONTENT_USR = "CONTENT_USR"
export const STYLE_USR = "STYLE_USR"
export const CONTENT_WEB = "CONTENT_WEB"
export const STYLE_WEB = "STYLE_WEB"

class StylizeBase extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            active: {
                home: "nav-inactive",
                artists: "nav-inactive",
                stylize: "nav-active"
            },

            // Web artwork
            styleArtWeb: {},
            contentArtWeb: {},

            // User artwork
            styleArtUsr: {},
            contentArtUsr: {},

            // Choice
            selectedStyle: null,
            selectedContent: null
        };

        this.onUploadChange = this.onUploadChange.bind(this)
        this.confirmChoice = this.confirmChoice.bind(this)
    }

    componentDidMount() {
        this.setupWebArt()
        this.setupUsrArt()
    }

    setupWebArt() {
        if (this.props.contentArtWeb != null) {
            this.setState({contentArtWeb: this.props.contentArtWeb})
        }

        if (this.props.styleArtWeb != null) {
            this.setState({styleArtWeb: this.props.styleArtWeb})
        }
    }

    setupUsrArt() {
        if (this.props.styleArtUsr != null) {
            this.onUploadChange(STYLE_USR, this.props.styleArtUsr)
        }

        if (this.props.contentArtUsr != null) {
            this.onUploadChange(CONTENT_USR, this.props.contentArtUsr)
        }
    }

    onUploadChange(imgUsrType, imgData) {
        if (imgUsrType === STYLE_USR) {
            this.setState({styleArtUsr: imgData})
            localStorage.setItem(STYLE_USR, JSON.stringify(imgData))
        } else if (imgUsrType === CONTENT_USR) {
            this.setState({contentArtUsr: imgData})
            localStorage.setItem(CONTENT_USR, JSON.stringify(imgData))
        }
    }

    confirmChoice() {
        this.props.navigate(
                "/stylize-configure?" + "selectedStyle=" + this.state.selectedStyle + "&selectedContent=" + this.state.selectedContent,
                { replace: true}
            )
    }

    render() {
        let contentArtWeb = this.state.contentArtWeb
        let styleArtWeb = this.state.styleArtWeb

        return (
            <div>
                <Header active={this.state.active} />
                <div className="stylize-body">
                    <div className="stylize-up">
                        <div className="stylize-up-left-column">
                            <div>
                                <input type="radio" name="style" className="stylize-radio" onClick={() => this.setState({selectedContent: CONTENT_WEB})}/>
                            </div>
                            <div>
                                <ArtworkShowcase artwork={contentArtWeb}/>
                                {
                                    contentArtWeb && <div className="stylize-desc" >
                                        <h4>{contentArtWeb.title}</h4>
                                        <p>{contentArtWeb.completitionYear}</p>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="stylize-up-right-column">
                            <div>
                                <input type="radio" name="content" className="stylize-radio" onClick={() => this.setState({selectedStyle: STYLE_WEB})} />
                            </div>
                            <div>
                                <ArtworkShowcase artwork={styleArtWeb}/>
                                {
                                    styleArtWeb && <div className="stylize-desc" >
                                        <h4>{styleArtWeb.title}</h4>
                                        <p>{styleArtWeb.completitionYear}</p>
                                    </div>
                                }
                            </div>

                        </div>
                    </div>
                    <div className="stylize-middle">
                        <h2>Choose one of the content (left) and style (right) images.</h2>
                        <h4>You can choose from the web (above) or upload your own (below).</h4>
                        <button className="artwork-add-btn" onClick={this.confirmChoice}>Confirm Choice</button>
                    </div>
                    <div className="stylize-up">
                        <div className="stylize-up-left-column">
                            <div>
                                <input type="radio" name="style" className="stylize-radio" onClick={() => this.setState({selectedContent: CONTENT_USR})}/>
                            </div>
                            <ArtworkUpload
                                artwork={this.state.contentArtUsr}
                                onChange={(imgData) => this.onUploadChange(CONTENT_USR, imgData)}
                            />
                        </div>
                        <div className="stylize-up-right-column">
                            <div>
                                <input type="radio" name="content" className="stylize-radio" onClick={() => this.setState({selectedStyle: STYLE_USR})}/>
                            </div>
                            <ArtworkUpload
                                artwork={this.state.styleArtUsr}
                                onChange={(imgData) => this.onUploadChange(STYLE_USR, imgData)}
                            />

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

StylizeBase.propTypes = {
    contentArtId: ArtworkShowcase.propTypes.artwork,
    styleArtId: ArtworkShowcase.propTypes.artwork,
    contentArtUsr: ArtworkShowcase.propTypes.artwork,
    styleArtUsr: ArtworkShowcase.propTypes.artwork
};

StylizeBase.defaultProps = {
    contentArtId: null,
    styleArtId: null,
    contentArtUsr: null,
    styleArtUsr: null
};

function StylizeChose(props) {
    let navigate = useNavigate();

    return <StylizeBase
        {...props}
        navigate={navigate}

        contentArtWeb={JSON.parse(localStorage.getItem(CONTENT_WEB))}
        styleArtWeb={JSON.parse(localStorage.getItem(STYLE_WEB))}

        contentArtUsr={JSON.parse(localStorage.getItem(CONTENT_USR))}
        styleArtUsr={JSON.parse(localStorage.getItem(STYLE_USR))}
    />
}

export default StylizeChose;