import { Badge, TabBar, SafeArea } from "antd-mobile";
import {
  AppOutline,
  MessageOutline,
  MessageFill,
  UnorderedListOutline,
  UserOutline
} from "antd-mobile-icons";
import { useLocation, useNavigate } from "react-router-dom";
import "./module.css";

export default function Bottom() {
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location);
  const { pathname } = location;

  const tabs = [
    {
      key: "index",
      title: "首页",
      icon: <AppOutline />,
      badge: Badge.dot
    },
    // {
    //   key: "message",
    //   title: "消息",
    //   icon: (active) => (active ? <MessageFill /> : <MessageOutline />),
    //   badge: "1"
    // },
    {
      key: "personalCenter",
      title: "我的",
      icon: <UserOutline />
    }
  ];
  return (
    <div className={"Tab"}>
      <TabBar
        activeKey={pathname.slice(1)}
        onChange={(value) => {
          // console.log(pathname);
          navigate("/" + value, { replace: true });
          // console.log(location.state);
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
