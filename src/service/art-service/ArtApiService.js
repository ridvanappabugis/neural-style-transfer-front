import Client from "../Client";

const getBase64FromUrl = async (url) => {
    const data = await fetch(url);
    const blob = await data.blob();
    return await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
            const base64data = reader.result;
            resolve(base64data);
        }
    });
}

class ArtApiService {
    constructor(props) {
        this.service = Client;
        this.wikiArtHost = "https://www.wikiart.org/en/api/2";
    }

    clean(text) {
     return text
         .replaceAll('[','<')
         .replaceAll(']','>')
         .replaceAll(/<[^<>]*>/g, "")
    }

    mapToArtworkList(responseData, limit) {
        return responseData.data
            .filter((item, index) => index < limit)
            .map((item, index) => ({
                _id: item.id,
                name: item.title,
                artistName: item.artistName,
                artistId: item.artistId,
                img: item.image,
                completitionYear: item.completitionYear
            }))
    }

    getPopularArtwork(callback, limit) {
        this.service.get(
            this.wikiArtHost + "/MostViewedPaintings?imageFormat=PortraitSmall",
            (status, data) => callback(this.mapToArtworkList(data, limit))
        )
    }

    async mapToArtworkDetails(responseData) {
        return getBase64FromUrl(responseData.image).then(imgData => {
            return {
                id: responseData.id,
                title: responseData.title,
                img: imgData,
                height: responseData.height,
                width: responseData.width,
                artistName: responseData.artistName,
                artistId: responseData.artistId,
                completitionYear: responseData.completitionYear,
                location: responseData.galleries[0],
                description: this.clean(responseData.description),
                artStyles: responseData.styles
            }
        })
    }

    getArtworkDetails(artworkId, callback) {
        this.service.get(
            this.wikiArtHost + "/Painting?id=" + artworkId + "&imageFormat=Blog",
            (status, data) => this.mapToArtworkDetails(data).then((result) => callback(result))
        )
    }

    getPaintingsSearch(searchTerm, pagToken, callback) {
        this.service.get(
            this.wikiArtHost + "/PaintingSearch?term="+ searchTerm +"&imageFormat=PortraitSmall",
            (status, response) => callback(
                this.mapToArtworkList(response, 100),
                response.paginationToken,
                response.hasMore
            )
        )
    }

    mapToArtistList(responseData, limit) {
        return responseData.data
            .filter((item, index) => item.image!==null)
            .filter((item, index) => index < limit)
            .map((item, index) => ({
                _id: item.id,
                name: item.artistName,
                img: item.image
            }))
    }

    getArtistList(pagToken, callback) {
        pagToken = pagToken===null? "" : pagToken
        this.service.get(
            this.wikiArtHost + "/UpdatedArtists?paginationToken="+ pagToken,
            (status, response) => callback(
                this.mapToArtistList(response, 100),
                response.paginationToken,
                response.hasMore
            )
        )
    }

    getArtworkByArtistSearch(artistId, pagToken, callback) {
        this.service.get(
            this.wikiArtHost + "/PaintingsByArtist?id=" + artistId + "&imageFormat=PortraitSmall",
            (status, response) => callback(
                this.mapToArtworkList(response, 100),
                response.paginationToken,
                response.hasMore
            )
        )
    }
}

export default new ArtApiService();