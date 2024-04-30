import axios from 'axios';
import config from "../config";

const api = {
    home: async () => {
        return await axios.get(config.url)
            .then(data => data.data)
            .then(data => data);
    },

    getAllArtists: async (pageNbr = null, limit = null) => {
        if((pageNbr && limit) !== null) {
            return await axios.get(`${config.url}/artists?page=${pageNbr}&limit=${limit}`)
                .then(data => data.data)
                .then(data => data);
        } else {
            return false;
        }
    },

    getOneArtistById: async (id = null) => {
        if(id === null) {
            return false;
        } else {
            return await axios.get(`${config.url}/artists/${id}`)
                .then(data => data.data)
                .then(data => data);
        }
    },

    getAllAlbums: async (pageNbr = null, limit = null) => {
        if((pageNbr && limit) !== null) {
            return await axios.get(`${config.url}/albums?page=${pageNbr}&limit=${limit}`)
                .then(data => data.data)
                .then(data => data);
        } else {
            return false;
        }
    },

    getOneAlbumById: async (id = null) => {
        if(id === null) {
            return false;
        } else {
            return await axios.get(`${config.url}/albums/${id}`)
                .then(data => data.data)
                .then(data => data);
        }
    },

    getAlbumByArtistId: async (id = null) => {
        if(id === null) {
            return false;
        } else {
            return await axios.get(`${config.url}/albums/artist/${id}`)
                .then(data => data.data)
                .then(data => data);
        }
    },

    getTrackById: async (id = null) => {
        if(id === null) {
            return false;
        } else {
            return await axios.get(`${config.url}/tracks/${id}`)
                .then(data => data.data)
                .then(data => data);
        }
    },

    getAllGenres: async () => {
        return await axios.get(`${config.url}/genres`)
            .then(data => data.data)
            .then(data => data);
    },

    getOneGenreById: async (id = null) => {
        if(id === null) {
            return false;
        } else {
            return await axios.get(`${config.url}/genres/${id}`)
                .then(data => data.data)
                .then(data => data);
        }
    },

    search: async (search = null, type = null) => {
        if((search && type) === null) {
            return false;
        } else {
            const authorizedType = ['artist', 'genre', 'album'];

            if(authorizedType.includes(type)) {
                return await axios.get(`${config.url}/search?query=${search}&type=${type}`);
            } else {
                return false;
            }
        }
    }
}

export default api;