import React, { useState, useEffect } from "react";
import { NavBar, InfiniteScroll, List, DotLoading, Toast } from "antd-mobile";
import { GetOrganizationList, CheckStatus } from "../apis/methods.js";
import { useNavigate } from "react-router-dom";

export default function OrganizationList() {
  const [organizationList, setOrgnizationList] = useState([]);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      // console.log(123);
      const flag = await CheckStatus();
      // console.log(flag);
      if (!flag) {
        setTimeout(() => {
          navigate("/login", { replace: true });
        }, 1000);
      }
    };
    checkLogin();
  }, []);

  const toProductList = (key, name) => {
    sessionStorage["orgid"] = key;
    sessionStorage["orgname"] = name;
    navigate("product");
  };

  const handleMore = async (rules) => {
    const newRule = { ...rules, page: rules.page + 1 };
    const hasNext = await GetOrganizationList(newRule);
    setHasMore(hasNext.data.length === 0 ? false : true);
  };

  const fetchData = async (rules) => {
    // console.log(rules);
    const organizations = await GetOrganizationList(rules);
    // console.log(organizations);
    if (organizations?.status === 401) {
      Toast.show({
        content: organizations.message,
        icon: "fail"
      });
      navigate("/login", { replace: true });
      return;
    } else if (organizations?.status === 200) {
      await setOrgnizationList((x) => [...x, ...organizations.data]);
    } else {
      Toast.show({
        content: organizations.message,
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
  useEffect(() => {
    const rules = {
      page: page,
      size: 10
    };
    fetchData(rules);
  }, []);
  return (
    <>
      {/* <NavBar back={false}>请从下列中选取组织</NavBar> */}
      {organizationList.length === 0 ? (
        <DotLoading />
      ) : (
        <>
          <List header="可选择的组织">
            {organizationList.map((item) => {
              return (
                <List.Item
                  arrow={true}
                  key={item.id}
                  onClick={() => {
                    // console.log(item.id);
                    toProductList(item.id, item.name);
                  }}
                >
                  {item.name}
                </List.Item>
              );
            })}
          </List>
          <InfiniteScroll
            loadMore={loadMore}
            hasMore={hasMore}
            threshold={20}
          />
        </>
      )}
    </>
  );
}
