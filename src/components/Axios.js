import axios from "axios";

const Axios = axios.create({
    baseURL:"https://desolate-beyond-48507.herokuapp.com"
})

export default Axios;