import React, { useEffect, useState } from "react";
import { Card, NavBar, Form, Input } from "antd-mobile";
import { AntOutline } from "antd-mobile-icons";
import { GetOrganization } from "../apis/methods";
import { useNavigate } from "react-router-dom";
import "./module.css";

export default function OrganizationCard({ show, callback }) {
  const orgid = sessionStorage["orgid"];
  const [org, setOrg] = useState({});
  const onBodyClick = () => {};
  const onHeaderClick = () => {};
  const navigate = useNavigate();
  useEffect(() => {
    const getOrg = async () => {
      const res = await GetOrganization(orgid);
      // console.log(res);
      if (!res.message) {
        const Organization = res.data;
        setOrg((x) => ({ ...Organization }));
      }
    };
    getOrg();
  }, []);

  const {
    id,
    description,
    address,
    contact,
    createdAt,
    updatedAt,
    phone,
    name
  } = org;
  const handleTime = (string) => {
    return (string = string?.split(".")[0].replace("T", " "));
  };
  // const back = () => {
  //   navigate(-1);
  // };
  const keys = [];
  for (let left in org) {
    keys.push(left);
  }
  // console.log(keys);
  return (
    <div className={show ? "show" : "not-show"}>
      <Card
        key={id}
        className="orgcard"
        title={
          <div style={{ fontWeight: "normal" }}>
            {/* <AntOutline style={{ marginRight: "4px", color: "#1677ff" }} /> */}
            {name}
          </div>
        }
        style={{ borderRadius: "16px" }}
        bodyStyle={
          {
            // display: "flex",
            // flexDirection: "column",
            // justifyContent: "flex-start",
            // alignItems: "space-between"
          }
        }
      >
        <div className={""}>组织描述: {description ?? "xxx"}</div>
        <div className={""}>地址: {address ?? "xxx"}</div>
        <div className={""}>联系人: {contact ?? "xxx"}</div>
        <div className={""}>
          创建时间: {createdAt ? handleTime(createdAt) : "xxx"}
        </div>
        <div className={""}>
          最后一次更新时间: {updatedAt ? handleTime(updatedAt) : "xxx"}
        </div>
        <div className={""}>联系电话: {phone ?? "xxx"}</div>
        {/* {keys.map((item, index) => (
          <Form
            disabled
            style={{ height: "60%" }}
            layout="horizontal"
            mode="card"
          >
            <h4>{item.name}</h4>
            <Form.Item label={item}>
              <Input
                style={{ color: "black", height: "min-content" }}
                placeholder={org[item]}
              />
            </Form.Item>
          </Form>
        ))} */}
      </Card>
    </div>
  );
}
