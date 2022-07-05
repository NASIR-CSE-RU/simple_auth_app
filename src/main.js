import 'bootstrap/dist/css/bootstrap.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios";
//setting up axios
window.axios = axios;

axios.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("AuthToken");
axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.baseURL = import.meta.env.VITE_API_URL;

console.log("getting csrf token from the server");
axios
  .get("/csrfToken")
  .then((response) => {
    let csrfToken = response.data.data;
    window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    window.axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;
  })
  .catch((error) => {
    console.log(error)
    console.log("csrf token retrieval failed");
  });

import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';
const app = createApp(App)
app.component('EasyDataTable', Vue3EasyDataTable);


app.use(router)

app.mount('#app')

import 'bootstrap/dist/js/bootstrap.js'
