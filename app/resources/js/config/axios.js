
import * as Axios from "axios";

let token = document.head.querySelector('meta[name="csrf-token"]');

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