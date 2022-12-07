import React, { useEffect, useState } from "react";
import ProductBottom from "./ProductBottom";
import { GetProduct } from "../apis/methods";
import { useNavigate } from "react-router-dom";
import OrganizationCard from "./OrganizationCard";
import "./module.css";
import {
  List,
  DotLoading,
  Modal,
  NavBar,
  Mask,
  Form,
  Input
} from "antd-mobile";

export default function OrganizationList() {
  const orgid = sessionStorage["proid"];
  const [specifications, setSpe] = useState([]);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  let flatten = (obj) => {
    let result = {};

    let process = (key, value) => {
      if (Object(value) !== value) {
        if (key) {
          result[key] = value;
        }
      } else if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          process(`${key}[${i}]`, value[i]);
        }
        if (value.length === 0) {
          result[key] = [];
        }
      } else {
        let objArr = Object.keys(value);
        objArr.forEach((item) => {
          process(key ? `${key}.${item}` : `${item}`, value[item]);
        });
        if (objArr.length === 0 && key) {
          result[key] = {};
        }
      }
    };
    process("", obj);
    return result;
  };

  const ToName = {
    name: "变量名称",
    variable: "变量标识名",
    "dataType.specs.precision": "精度",
    "dataType.specs.unitName": "单位名",
    "dataType.specs.unit": "单位",
    "dataType.type": "数据种类"
  };

  useEffect(() => {
    const getOrg = async () => {
      const res = await GetProduct(orgid);
      // console.log(res);
      if (!res.message) {
        const spe = res.data.specification;
        setSpe((x) => [...spe]);
      }
    };
    getOrg();
  }, []);
  const back = () => {
    navigate("/index", { replace: true });
  };

  return (
    <>
      <NavBar onBack={back}>
        <div onClick={() => setVisible(true)}>{sessionStorage["orgname"]}</div>
      </NavBar>
      <Mask visible={visible} onMaskClick={() => setVisible(false)}>
        <OrganizationCard show={visible} />
      </Mask>
      {specifications?.length === 0 ? (
        <DotLoading />
      ) : (
        <List>
          {specifications.map((item) => {
            return (
              <List.Item
                arrow={false}
                key={item.id}
                onClick={() => {
                  const tmp = flatten(item);
                  // console.log(tmp);
                  const keys = [];
                  for (let left in tmp) {
                    keys.push(left);
                  }
                  Modal.show({
                    content: (
                      <Form readOnly>
                        <h4>{item.name}</h4>
                        {keys.map((item) => (
                          <Form.Item label={ToName[item]}>
                            <Input
                              // disabled
                              style={{ color: "black" }}
                              placeholder={tmp[item] ?? item}
                            />
                          </Form.Item>
                        ))}
                      </Form>
                    ),
                    closeOnMaskClick: true
                  });
                }}
              >
                {item.name}
                <div className="right-down">{item.variable}</div>
              </List.Item>
            );
          })}
        </List>
      )}
      <ProductBottom />
    </>
  );
}
