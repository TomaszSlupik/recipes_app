import axios from "axios"

const mykey = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1',
    params: {
        key: "AIzaSyBdxvlE5ghYGxgiC0FyjhZtsOMgb8HAGTA"
    }
})

export default mykey