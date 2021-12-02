import Client from "../Client";

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

    mapToArtworkDetails(responseData) {
        return {
            id: responseData.id,
            title: responseData.title,
            img: responseData.image,
            height: responseData.height,
            width: responseData.width,
            artistName: responseData.artistName,
            artistId: responseData.artistId,
            completitionYear: responseData.completitionYear,
            location: responseData.galleries[0],
            description: this.clean(responseData.description),
            artStyles: responseData.styles
        }
    }

    getArtworkDetails(artworkId, callback) {
        this.service.get(
            this.wikiArtHost + "/Painting?id=" + artworkId + "&imageFormat=Blog",
            (status, data) => callback(this.mapToArtworkDetails(data))
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
}

export default new ArtApiService();