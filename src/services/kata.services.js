import axios from 'axios'

class KataService {

    constructor() {

        this.api = axios.create({

            baseURL: `${process.env.REACT_APP_API_URL}/kata`
        })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {

                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }

    saveKata(kataData) {
        return this.api.post('/saveKata', kataData)
    }

    getKata(kata_id) {
        return this.api.get(`/getOneKata/${kata_id}`)
    }

    getAllKatas() {
        return this.api.get('/getAllKatas')
    }

}

const kataService = new KataService()

export default kataService