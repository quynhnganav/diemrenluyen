require('./bootstrap');

import Vue from "vue";
import 'ant-design-vue/dist/antd.min.css'
import { Modal } from "ant-design-vue";

Vue.use(Modal)
Vue.component('sv-page', require('./pages/sv/index.vue').default)

const app = new Vue({
    el: '#app'
}).$mount('#app')