import React from "react";
import Header from "../../components/header/Header";

import ArtworkShowcase from "../../components/artwork/ArtworkShowcase";
import "./Stylize.css"
import {useLocation} from "react-router-dom";
import StylizeApiService from "../../service/stylize-service/StylizeApiService";

class StylizeConfigureBase extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            active: {
                home: "nav-inactive",
                artists: "nav-inactive",
                stylize: "nav-active"
            },

            contentChoice: this.props.contentChoice,
            styleChoice: this.props.styleChoice,

            isProcess: false,
            processDone: false,
            processResult: {}
        };
        this.runProcess = this.runProcess.bind(this)
    }

    runProcess() {
        this.setState({
            isProcess: true
        })

        StylizeApiService.postStylize(
            this.state.contentChoice.dataSrc,
            this.state.styleChoice.dataSrc,
            (result) => {
                console.log(result)
                this.setState({
                    isProcess: false,
                    processDone: true,
                    processResult: {
                        dataSrc: result.result,
                        width: this.state.contentChoice.width,
                        height: this.state.contentChoice.height
                    }
                })
            }
        )
    }

    render() {
        let contentArt = this.state.contentChoice
        let styleArt = this.state.styleChoice

        return (
            <div>
                <Header active={this.state.active} />
                <div className="stylize-body">
                    <div className="stylize-up">
                        <div className="stylize-up-left-column">
                            <ArtworkShowcase artwork={contentArt}/>
                        </div>
                        <div className="stylize-up-right-column">
                            <ArtworkShowcase artwork={styleArt}/>
                        </div>
                    </div>
                </div>
                <div className="stylize-middle">
                    <h2>Configure the cycle and intensity of the styling.</h2>
                    <button className="artwork-add-btn" disabled={this.state.isProcess || this.state.processDone} onClick={this.runProcess}>Run Process</button>
                </div>
                <div className="stylize-middle">
                    <div className="stylize-up">
                        {
                            this.state.isProcess && <div className="lds-dual-ring"/>
                        }
                        {
                            this.state.processDone &&
                            <div className="stylize-up-right-column">
                                <ArtworkShowcase artwork={this.state.processResult}/> 
                            </div>
                        }

                    </div>
                </div>
            </div>
        )
    }
}

StylizeConfigureBase.propTypes = {
    styleChoice: ArtworkShowcase.propTypes.artwork,
    contentChoice: ArtworkShowcase.propTypes.artwork,
};

StylizeConfigureBase.defaultProps = {
    contentChoice: null,
    styleChoice: null
};

function StylizeConfigure(props) {
    const { search } = useLocation();

    let searchParam = new URLSearchParams(search)
    console.log("test")
    console.log(searchParam)

    if (searchParam.get("selectedStyle") == null || searchParam.get("selectedContent") == null) {
        document.location = "/"
    }

    return <StylizeConfigureBase
        {...props}
        styleChoice={JSON.parse(localStorage.getItem(searchParam.get("selectedStyle")))}
        contentChoice={JSON.parse(localStorage.getItem(searchParam.get("selectedContent")))}
    />
}

export default StylizeConfigure;