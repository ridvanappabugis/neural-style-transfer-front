import React from "react";
import "./Exception.css"

const Error = ({ ...props }) => {

    return (
        <div>
            <div className="exception-status-code">500</div>
            <div className="exception-msg">Ooops! Sorry, something went wrong</div>
            <div className="err-page-btn"><button className="basic-button error-button" type="btn" onClick={() => window.location.href = "/"}>GO HOME</button></div>
        </div>
    );
}

export default Error;