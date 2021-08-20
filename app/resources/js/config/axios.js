
import * as Axios from "axios";

const axios = Axios.default.create({
    baseURL: '/',
    responseType: 'json',
    // timeout: 1000,
    // headers: {
    //     'Accept': 'application/json'
    // }
})

export {
    axios
}