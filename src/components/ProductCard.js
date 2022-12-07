import React, { useEffect, useState } from "react";
import { Card, DotLoading, Mask, NavBar, Form, Input } from "antd-mobile";
import ProductBottom from "./ProductBottom";
import OrganizationCard from "./OrganizationCard";

import { AntOutline } from "antd-mobile-icons";
import { GetProduct } from "../apis/methods";
import { useNavigate } from "react-router-dom";
import "./module.css";

export default function ProductCard() {
  const orgid = sessionStorage["proid"];
  const [pro, setPro] = useState({});
  const [visible, setVisible] = useState(false);
  const back = () => {
    navigate("/index", { replace: true });
  };

  const navigate = useNavigate();
  useEffect(() => {
    const getOrg = async () => {
      const res = await GetProduct(orgid);
      // console.log(res);
      if (!res.message) {
        const Organization = res.data;
        setPro((x) => ({ ...Organization }));
      }
    };
    getOrg();
  }, []);

  // const {
  //   id,
  //   description,
  //   status,
  //   type,
  //   createdAt,
  //   organization,
  //   updatedAt,
  //   productKey,
  //   productSecret,
  //   name
  // } = pro;

  const obj = {
    description: "描述",
    status: "状态",
    type: "种类",
    createdAt: "创建时间",
    organization: "组织",
    updatedAt: "最近更新",
    productKey: "产品标识",
    productSecret: "产品私钥",
    name: "名称"
  };
  const objkeys = Object.keys(obj);
  const keys = [];
  for (let left in pro) {
    if (left !== "specification") keys.push(left);
  }
  const handleTime = (string) => {
    return (string = string?.split(".")[0].replace("T", " "));
  };
  return (
    <>
      <NavBar onBack={back}>
        <div onClick={() => setVisible(true)}>{sessionStorage["orgname"]}</div>
      </NavBar>
      <Mask visible={visible} onMaskClick={() => setVisible(false)}>
        <OrganizationCard show={visible} />
      </Mask>
      {pro.name ? (
        keys.map((item) =>
          objkeys.includes(item) ? (
            <Form
              // layout="horizontal"
              mode="card"
              readOnly
              style={{ width: "100%" }}
            >
              <h4>{item.name}</h4>

              <Form.Item label={obj[item]}>
                <Input
                  // disabled="disabled"
                  readOnly
                  // forbidden
                  className={"input-font"}
                  // style={{ color: "black!important", height: "min-content" }}
                  placeholder={
                    item.includes("At") || item.includes("Date")
                      ? handleTime(pro[item])
                      : pro[item]
                  }
                />
              </Form.Item>
            </Form>
          ) : null
        )
      ) : (
        <DotLoading />
      )}
      <ProductBottom />
    </>
  );
}
