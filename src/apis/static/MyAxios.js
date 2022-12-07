import axios from "axios";
axios.defaults.baseURL = "https://api.qiaolian.co/api/v1.dev";
axios.interceptors.request.use();

const Myaxios = axios.create();

Myaxios.interceptors.request.use((config) => {
  const token = localStorage["token"];
  // console.log(token);
  // config.headers["content-Type"] = "application/x-www-form-urlencoded";
  // config.headers["Content-Type"] = "application/json";
  // config.headers["Access-Control-Allow-Origin"] = "*";
  config.headers["Content-Type"] =
    "application/x-www-form-urlencoded;charset=UTF-8";

  config.headers["Token"] = "Bearer " + token;
  config.headers["Authorization"] = "Bearer " + token;

  return config;
});

export default Myaxios;
