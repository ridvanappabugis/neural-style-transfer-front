import React from "react"
import { useNavigate } from "react-router-dom"
import ".//Header.css"

class HeaderBase extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            active: {
                home: "nav-inactive",
                artists: "nav-inactive",
                stylize: "nav-inactive",
            },
            searchText: ""
        };
    }

    handleEnterPress(e) {
        if (e.key === "Enter") {
            this.onSearchClick()
        }
    }

    onSearchClick() {
        this.props.navigate("/search?searchTerm=" + this.state.searchText, { replace: true })
        this.setState({searchText: ""})
        window.location.reload()
    }

    render () {
        return (
            <div className="header">
                <div className="header-body">
                    <div>
                        <span className="header-title"><a href="/">STYLE TRANSFER</a></span>
                    </div>

                    <div className="search">
                        <input
                            onKeyPress={(e) => this.handleEnterPress(e)}
                            placeholder="Find Artwork"
                            value={this.searchText}
                            type="text"
                            onChange={(e) => this.setState({searchText: e.target.value})}
                        />
                        <button onClick={() => this.onSearchClick()}>Search</button>
                    </div>

                    <div className="header-nav">
                        <a className={this.state.home} href="/">HOME</a>
                        <a className={this.state.artists} href="/artists">ARTISTS</a>
                        <a className={this.state.process} href="/stylize">STYLISE</a>
                    </div>
                </div>
            </div>
        )
    }

}

function Header(props) {
    let navigate = useNavigate();
    return <HeaderBase {...props} navigate={navigate} />
}

export default Header;