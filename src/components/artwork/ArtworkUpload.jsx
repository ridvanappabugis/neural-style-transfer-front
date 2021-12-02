import React from "react"
import "./ArtworkUpload.css"
import ArtworkShowcase from "./ArtworkShowcase";

class ArtworkUpload extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            imgSelected: false,
            img: null,
            width: null,
            height: null
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

    onFileChange(e) {
        let upload = e.target.files[0]
        let fileAsDataURL = window.URL.createObjectURL(upload)
        this.getHeightAndWidthFromDataUrl(fileAsDataURL).then(dimensions => {
            this.setState({
                imgSelected: true,
                img: dimensions.src,
                width: dimensions.width,
                height: dimensions.height
            })
        })

    }

    render() {

        return (
            <div>
                <ArtworkShowcase
                    url={(this.state.imgSelected && this.state.img) || undefined}
                    height={(this.state.imgSelected && this.state.height) || undefined}
                    width={(this.state.imgSelected && this.state.width) || undefined}
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

export default ArtworkUpload