import axios from "axios"

const instance = axios.create({
    baseURL: 'https://recipesapp-aadc3-default-rtdb.firebaseio.com'
})

export default instance