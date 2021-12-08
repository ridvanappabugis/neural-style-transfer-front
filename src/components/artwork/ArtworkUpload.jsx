import React from "react"
import "./ArtworkUpload.css"
import ArtworkShowcase from "./ArtworkShowcase";
import PropTypes from "prop-types";

class ArtworkUpload extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            imgSelected: false,
            artwork: {}
        };

        this.onFileChange = this.onFileChange.bind(this)
        this.getHeightAndWidthFromDataUrl = this.getHeightAndWidthFromDataUrl.bind(this)
    }

    getHeightAndWidthFromDataUrl(dataURL){
        return new Promise(resolve => {
            const img = new Image()
            img.onload = () => {
                resolve({
                    src: img.src,
                    height: img.height,
                    width: img.width
                })
            }
            img.src = dataURL
        })
    }

    getBase64(file, onLoadCallback) {
        return new Promise((resolve, reject) => {
            const reader = new window.FileReader();
            reader.onload = function() { resolve(reader.result); };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    onFileChange(e) {
        let upload = e.target.files[0]

        let fileAsDataURL = this.getBase64(upload)

        fileAsDataURL.then((result) => {
            this.getHeightAndWidthFromDataUrl(result).then(dimensions => {
                this.setState({
                    imgSelected: true,
                    artwork: {
                        dataSrc: dimensions.src,
                        width: dimensions.width,
                        height: dimensions.height
                    }
                })
                this.props.onChange(this.state.artwork)
            })
        })
    }

    render() {
        return (
            <div>
                <ArtworkShowcase
                    artwork={this.state.imgSelected? {
                        dataSrc: this.state.artwork.dataSrc,
                        height: this.state.artwork.height,
                        width: this.state.artwork.width
                    } : undefined}
                />
                <input
                    className="artwork-upload-btn"
                    type="file"
                    accept="image/png,image/jpeg,image/bmp,image/gif"
                    onChange={this.onFileChange} />
            </div>

        )
    }
}

ArtworkUpload.propTypes = {
    onClick: PropTypes.func
};

ArtworkUpload.defaultProps = {
    onChange: () => {}
};

export default ArtworkUpload