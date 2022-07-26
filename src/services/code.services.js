import axios from 'axios'

class CodeService {

    constructor() {

        this.api = axios.create({

            baseURL: `${process.env.REACT_APP_API_URL}`
        })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {

                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }

    createFile(code, kataCode) {
        return this.api.post('/js', { code, kataCode })
    }

    verifyCode(kataCode) {
        return this.api.post('/check', { kataCode })
    }

}

const codeService = new CodeService()

export default codeService