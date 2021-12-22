import Client from "../Client";

class StylizeApiService {
    constructor(props) {
        this.service = Client;
        this.stylizeHost = "http://localhost:5000";
    }

    postStylize(contentImg, styleImg, callback, epochs= 3, stepsPerEpoch= 100) {
        this.service.post(
            this.stylizeHost + "/stylize",
            {
                content_img: contentImg,
                style_img: styleImg,
                epochs: epochs,
                steps_per_epoch: stepsPerEpoch
            },
            (status, response) => callback(response)
        )
    }
}

export default new StylizeApiService();