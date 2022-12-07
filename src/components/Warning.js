import React, { useState, useEffect } from "react";
import "./module.css";
import {
  InfiniteScroll,
  List,
  Mask,
  NavBar,
  Modal,
  Toast,
  DotLoading
} from "antd-mobile";
import { GetIncident, CheckStatus } from "../apis/methods.js";
import { useNavigate } from "react-router-dom";
import ProductBottom from "./ProductBottom";
import OrganizationCard from "./OrganizationCard.js";

export default function Warning() {
  const [productList, setProductList] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const id = sessionStorage["proid"];
  const [flag, setFlag] = useState(false);
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
    const incidents = await GetIncident({ id, ...rules });
    // console.log(incidents);
    if (incidents.message) {
      setHasMore(false);
      Toast.show({
        content: "网络错误，请稍后再试",
        icon: "fail"
      });
      setFlag(true);
      return;
    } else if (incidents.status === 200) {
      setProductList((x) => [...x, ...incidents.data]);
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
    const hasNext = await GetIncident({ id, ...newRule });
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
      <List header="存在的告警">
        {productList.length !== 0 && flag === true ? (
          productList.map((item) => {
            return <List.Item key={item.id}>{item.name}</List.Item>;
          })
        ) : flag === true ? (
          <DotLoading />
        ) : null}
      </List>
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} threshold={20} />
      <ProductBottom />
    </div>
  );
}
