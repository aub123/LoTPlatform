import {
  JumboTabs,
  Calendar,
  Space,
  DatePicker,
  CheckList,
  DotLoading,
  Toast,
  Button
} from "antd-mobile";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { GetProduct, GetDevice, PostCoordinate } from "../apis/methods";

const QueryItem = () => {
  const orgid = sessionStorage["proid"];
  const [specifications, setSpe] = useState([]);
  const navigate = useNavigate();
  const [proname, setProname] = useState("");
  const [device, setDevice] = useState({});
  const proid = sessionStorage["proid"];
  const devid = sessionStorage["devid"];
  const [queries, setQueries] = useState([]);
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [tags, setTags] = useState({});
  const now = new Date();
  const takeIn = async () => {
    // console.log(queries);
    const coordinate = await PostCoordinate({
      start,
      end,
      queries,
      tags,
      proid
    });
    // console.log(coordinate);

    if (coordinate.message) {
      Toast.show("网络错误");
      return;
    }

    sessionStorage["coordinate"] = JSON.stringify(coordinate.data);
    navigate("/product/data");
  };

  // useEffect(() => {
  //   const getDev = async () => {
  //     const res = await GetDevice({ proid, devid });
  //     console.log(res);
  //     if (!res.message) {
  //       const data = res.data;
  //       setDevice({ ...data });
  //     } else {
  //       Toast.show("错误");
  //     }
  //   };
  //   getDev();
  // }, []);

  // const {
  //   id,
  //   name,
  //   description,
  //   status,
  //   deviceKey,
  //   activatedAt,
  //   lastOnlineAt
  // } = device;

  useEffect(() => {
    const checkDevice = () => {
      return sessionStorage["proid"] ? 1 : 0;
    };
    const flag = checkDevice();
    if (!flag) {
      navigate("/index");
      Toast.show("请先选择一个产品");
    }
  }, []);

  useEffect(() => {
    const getOrg = async () => {
      const res = await GetProduct(orgid);
      // console.log(res);
      if (!res.message) {
        const spe = res.data.specification;
        setSpe((x) => [...spe]);
        setProname(res.data.name);
      }
    };
    getOrg();
  }, []);
  return (
    <>
      <Space>
        <h3>当前查询：</h3>
      </Space>
      <Space>
        <b>{proname}</b>
      </Space>
      <Button
        type="primary"
        style={{ marginLeft: "50%", transform: "translateX(-50%)" }}
        onClick={async () => {
          // console.log({ start, end, queries, tags, devid });
          if (!(start && end && queries.length !== 0)) {
            Toast.show("请将查询条件选择完整");
            return;
          }
          await takeIn();
        }}
      >
        查询
      </Button>
      <JumboTabs defaultActiveKey="1">
        <JumboTabs.Tab title="时间&标签" description="请选择时间和标签" key="1">
          {specifications?.length === 0 ? (
            <DotLoading />
          ) : (
            <>
              <Space>
                <Button
                  onClick={() => {
                    setVisible(true);
                  }}
                >
                  选择开始时间
                </Button>
                <DatePicker
                  visible={visible}
                  onClose={() => {
                    setVisible(false);
                  }}
                  precision="minute"
                  // max={now}
                  onConfirm={(val) => {
                    // console.log(val);
                    setStart((x) =>
                      new Date(+val + 3600 * 8 * 1000).toISOString()
                    );
                  }}
                />
                <br />
              </Space>
              <Space>
                <b>{start.replace("T", " ").replace(".000Z", "")}</b>
              </Space>
              <br />
              <Space>
                <Button
                  onClick={() => {
                    setVisible1(true);
                  }}
                >
                  选择结束时间
                </Button>
                <DatePicker
                  title="时间选择"
                  visible={visible1}
                  onClose={() => {
                    setVisible1(false);
                  }}
                  precision="minute"
                  max={now}
                  onConfirm={(val) => {
                    // Toast.show(val.toDateString());
                    setEnd(new Date(+val + 3600 * 8 * 1000).toISOString());
                  }}
                />
              </Space>
              <Space>
                <b>{end.replace("T", " ").replace(".000Z", "")}</b>
              </Space>
            </>
          )}
        </JumboTabs.Tab>
        <JumboTabs.Tab title="变量" description="请点击要查询的变量" key="2">
          {specifications?.length === 0 ? (
            <DotLoading />
          ) : (
            <CheckList
              multiple
              onChange={(va) => {
                // console.log(va);
                setQueries(
                  va.map((item) => {
                    return { field: item };
                  })
                );
                // console.log(queries);
              }}
            >
              {/* <CheckList.Item value="C">C</CheckList.Item> */}
              {specifications.map((item) => {
                return (
                  <CheckList.Item value={item.variable}>
                    {item.name}
                    <div className="right-down">{item.variable}</div>
                  </CheckList.Item>
                );
              })}
            </CheckList>
          )}
        </JumboTabs.Tab>
      </JumboTabs>
    </>
  );
};

export default QueryItem;
