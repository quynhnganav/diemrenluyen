
import * as Axios from "axios";

const axios = Axios.default.create({
    baseURL: '/',
    // timeout: 1000,
    // headers: {
    //     'Accept': 'application/json'
    // }
})

export {
    axios
}