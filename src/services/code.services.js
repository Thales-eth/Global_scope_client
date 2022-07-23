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

    sendCode(code) {
        return this.api.post('/js', { code })
    }

}

const codeService = new CodeService()

export default codeService