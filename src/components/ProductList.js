import React, { useState, useEffect } from "react";
import "./module.css";
import {
  InfiniteScroll,
  List,
  Empty,
  Mask,
  NavBar,
  Modal,
  Toast
} from "antd-mobile";
import { QuestionCircleOutline } from "antd-mobile-icons";
import { GetProductList, CheckStatus } from "../apis/methods.js";
import { useNavigate } from "react-router-dom";
import OrganizationCard from "./OrganizationCard.js";

export default function ProductList() {
  const [productList, setProductList] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const id = sessionStorage["orgid"];
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  const checkLogin = () => {
    if (!CheckStatus()) {
      Modal.alert({
        content: "未登录,马上跳转到登录页",
        onConfirm: () => {
          navigate("/login", { replace: true });
        }
      });
    }
  };
  useEffect(checkLogin, []);
  const back = () => {
    navigate("/index", { replace: true });
  };

  const fetchData = async (rules) => {
    if (!id) return;
    const products = await GetProductList({ id, ...rules });
    // console.log(products);
    if (products.message) {
      setHasMore(false);
      Toast.show({
        content: "网络错误，请稍后再试",
        icon: "fail"
      });
      return;
    } else if (products.status === 200) {
      setProductList((x) => [...x, ...products.data]);
      return;
    } else {
      Toast.show({
        content: "未知错误，请稍后再试",
        icon: "fail"
      });
      return;
    }
  };

  const loadMore = () => {
    const rules = {
      page: page + 1,
      size: 10
    };
    fetchData(rules);
    handleMore(rules);
    setPage((x) => x + 1);
  };

  const handleMore = async (rules) => {
    const newRule = { ...rules, page: rules.page + 1 };
    const hasNext = await GetProductList({ id, ...newRule });
    // console.log(hasNext);
    setHasMore(hasNext.data.length === 0 ? false : true);
  };

  useEffect(() => {
    const rules = {
      page: page,
      size: 10
    };
    fetchData(rules);
  }, []);

  return (
    <div style={{ height: window.innerHeight }} className="content">
      <NavBar onBack={back}>
        <div onClick={() => setVisible(true)}>{sessionStorage["orgname"]}</div>
      </NavBar>
      <Mask visible={visible} onMaskClick={() => setVisible(false)}>
        <OrganizationCard show={visible} />
      </Mask>
      <List header="可选择的产品">
        {productList.length !== 0 ? (
          productList.map((item) => {
            // console.log(item);
            return (
              <List.Item
                key={item.id}
                onClick={(e) => {
                  // console.log(e);
                  e.preventDefault();
                  // console.log("click ", item.name);
                  sessionStorage["proid"] = item.id;
                  navigate("/product/info");
                }}
              >
                {item.name}
              </List.Item>
            );
          })
        ) : (
          <Empty
            style={{ padding: "64px 0" }}
            image={
              <QuestionCircleOutline
                style={{
                  color: "var(--adm-color-light)",
                  fontSize: 48
                }}
              />
            }
            description="暂无数据"
          />
        )}
      </List>
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} threshold={20} />
    </div>
  );
}
