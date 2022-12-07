import React, { Component } from "react";
import AMapLoader from "@amap/amap-jsapi-loader";
import "./module.css";

const sition = sessionStorage.getItem("position");
console.log(sition);
class MapComponent extends Component {
  constructor() {
    super();
    this.map = {};
  }
  componentDidMount() {
    AMapLoader.load({
      key: "83d40b33aa63d992ce83bc9608d0e1e6",
      version: "2.0",
      plugins: [""]
    })
      .then((AMap) => {
        // console.log("te:", [...sition]);
        const pos = sition.split(",").map((item) => parseFloat(item));
        console.log(pos);
        this.map = new AMap.Map("container", {
          viewMode: "2D",
          zoom: 12,
          center: pos
        });
        let marker = new AMap.Marker({
          position: pos
        });
        this.map.add(marker);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    return <div id="container" style={{ height: "40vh" }}></div>;
  }
}
export default MapComponent;
