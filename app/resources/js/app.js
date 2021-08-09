require('./bootstrap')
import React from "react";
import ReactDOM from "react-dom";
import AppRouter from "./routers";

let props = {}
const el = document.getElementById('app')

if (el) {
    const data = Object.assign({}, el.dataset)
    Object.keys(data).forEach(d => {
        props[d] = JSON.parse(data[d])
    })
}

ReactDOM.render(<AppRouter {...props} />, el)