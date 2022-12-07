import React, { useEffect, useState } from "react";
import { Card, Toast, DotLoading, Form, NavBar } from "antd-mobile";
import ProductBottom from "./ProductBottom";
import { AntOutline } from "antd-mobile-icons";
import { GetDevice } from "../apis/methods";
import { useNavigate } from "react-router-dom";
import "./module.css";
import { left } from "@antv/g2plot/lib/plots/sankey/sankey";
import MapComponent from "./MapContainer";

export default function DeviceCard() {
  const proid = sessionStorage["proid"];
  const devid = sessionStorage["devid"];
  const [device, setDevice] = useState({});
  // const [flag, setFlag] = useState(false);
  const navigate = useNavigate();

  const back = () => {
    navigate(-1);
  };
  useEffect(() => {
    const getDev = async () => {
      const res = await GetDevice({ proid, devid });
      // console.log(res);
      if (!res.message) {
        const data = res.data;
        setDevice({ ...data });
      } else {
        Toast.show("错误");
      }
    };
    getDev();
  }, []);

  const {
    id,
    name,
    description,
    status,
    deviceKey,
    activatedAt,
    lastOnlineAt,
    tags
  } = device;
  const checkStatus = (x) => {
    switch (x) {
      case 1:
        return "在线";
      case 2:
        return "离线";
      case 4:
        return "已禁用";
      default:
        return "请求失败";
    }
  };
  console.log(device);
  // if (tags) {
  //   console.log("tags:", tags);
  //   setFlag(true);
  // }
  if (tags) {
    const ready = tags[0] ?? "";
    const array = ready.split(":");
    const [x, a, b] = array;
    sessionStorage["position"] = [a, b];
  }
  const statusText = checkStatus(status);
  const handleTime = (string) => {
    return (string = string?.split(".")[0].replace("T", " "));
  };
  return device ? (
    <div>
      <NavBar onBack={back}>{name}</NavBar>
      <div className="dev-card">
        <Card
          style={{ width: "100%", position: "absolute", top: "20vh" }}
          key={id}
          className="orgcard"
          title={
            <div style={{ fontWeight: "normal" }}>
              <AntOutline style={{ marginRight: "4px", color: "#1677ff" }} />
              {name}
            </div>
          }
        >
          <div className={""}>在线状态:{statusText}</div>
          <div className={""}>DeviceKey: {deviceKey ?? "xxx"}</div>
          <div className={""}>
            激活时间: {activatedAt ? handleTime(activatedAt) : "xxx"}
          </div>
          <div>
            最近上线时间: {lastOnlineAt ? handleTime(lastOnlineAt) : "xxx"}
          </div>
          <div className={""}>描述: {description ?? "..."}</div>
          <Form>
            {/* <Form.Item label={obj[item]}>device.map( item )</Form.Item> */}
          </Form>
        </Card>
        {tags ? (
          <div>
            <MapComponent></MapComponent>
          </div>
        ) : null}
      </div>
    </div>
  ) : (
    <DotLoading />
  );
}
