import axios from 'axios'

class AuthService {

    constructor() {

        this.api = axios.create({
            // baseURL: `${process.env.REACT_APP_API_URL}/auth`
            baseURL: `http://localhost:5005/api/auth`
        })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }

    register(userData) {
        return this.api.post('/createUser', userData)
    }

    login(userData) {
        return this.api.post('/login', userData)
    }

    verify = token => {
        return this.api.get('/verify', { headers: { Authorization: `Bearer ${token}` } })
    }

}

const authService = new AuthService()

export default authService