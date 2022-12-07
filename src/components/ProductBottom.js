import { Badge, TabBar, SafeArea } from "antd-mobile";
import {
  InformationCircleOutline,
  HistogramOutline,
  UnorderedListOutline,
  ShopbagOutline,
  BellOutline
} from "antd-mobile-icons";
import { useLocation, useNavigate } from "react-router-dom";
import "./module.css";

export default function ProductBottom() {
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location);
  const { pathname } = location;
  // console.log(pathname.slice(1), pathname);
  const tabs = [
    {
      key: "info",
      title: "产品信息",
      icon: <InformationCircleOutline />,
      badge: Badge.dot
    },
    // {
    //   key: "message",
    //   title: "消息",
    //   icon: (active) => (active ? <MessageFill /> : <MessageOutline />),
    //   badge: "1"
    // },
    {
      key: "model",
      title: "物模型",
      icon: <UnorderedListOutline />
    },
    {
      key: "data",
      title: "数据",
      icon: <HistogramOutline />
    },
    {
      key: "warning",
      title: "告警",
      icon: <BellOutline />
    },
    {
      key: "device",
      title: "设备",
      icon: <ShopbagOutline />
    }
  ];
  return (
    <div className={"Tab"}>
      <TabBar
        activeKey={pathname.slice(9)}
        onChange={(value) => {
          // console.log(pathname);
          navigate("/product/" + value, { replace: true });
        }}
      >
        {tabs.map((item) => (
          <TabBar.Item
            key={item.key}
            icon={item.icon}
            title={item.title}
            badge={item.badge}
          />
        ))}
      </TabBar>
    </div>
  );
}
