import { Avatar, Tag, Button, List } from "antd";
import React from "react";
import { GetUser } from "/src/apis/methods.js";
import Bottom from "../components/Bottom";

export default function UserInfo() {
  // return (
  //   <div className={"usr_page"}>
  //     <div className={"usr_info"}>
  //       <Avatar src="" className="usr_avatar" />
  //       <Tag color="#87d068" fill="outline">
  //         Web admin
  //       </Tag>
  //     </div>
  //     <div className={"usr_corl"}>
  //       <Button block color="primary" size="large" className="corl_btn">
  //         账户管理
  //       </Button>
  //       <Button block color="primary" size="large" className="corl_btn">
  //         组织管理
  //       </Button>
  //       <Button block color="primary" size="large" className="corl_btn">
  //         产品管理
  //       </Button>
  //       <Button block color="primary" size="large" className="corl_btn">
  //         设备管理
  //       </Button>
  //       <Button block color="danger" size="large" className="corl_btn">
  //         退出登录
  //       </Button>
  //     </div>
  //     <Bottom />
  //   </div>
  // );
  const eles = ["账户管理", "组织管理", "产品管理", "设备管理", "退出登录"];
  const [user, setUser] = React.useState(null);
  React.useEffect(() => {
    const getUser = async () => {
      const user = await GetUser();
      setUser(user.data);
    };
    getUser();
  }, []);

  return (
    <>
      <div className={"usr_info"}>
        <Avatar src="" className="usr_avatar" />
        <Tag color="#87d068" fill="outline">
          Web admin
        </Tag>
      </div>
      <List>
        {eles.map((item, key) => {
          // console.log(item);
          return (
            <List.Item
              key={key}
              onClick={(e) => {
                console.log(e);
                // e.preventDefault();
                // console.log("click ", item.name);
                // sessionStorage["proid"] = item.id;
                // navigate("/product/info");
              }}
            >
              {item}
            </List.Item>
          );
        })}
      </List>
      <Bottom />
    </>
  );
}
