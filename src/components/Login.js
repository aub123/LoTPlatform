import { Form, Input, Button } from "antd";
import React, { useState } from "react";
import { Footer } from "antd-mobile";
import "./module.css";
import { EyeInvisibleOutline, EyeOutline } from "antd-mobile-icons";
import "antd/dist/antd.css";
import { useForm } from "antd/lib/form/Form";
import { LoginAction, GetCaptcha } from "../apis/methods.js";
import { useNavigate } from "react-router-dom";
import { Toast } from "antd-mobile";

export default function Login() {
  const navigation = useNavigate();
  const [form] = useForm();
  const [visible, setVisible] = useState(false);

  const [show, setShow] = useState(true);
  const checkLogin = async (data) => {
    // console.log(data);
    if (data.status === 200) {
      navigation("/index");
    } else {
      if (data.data.message) {
        Toast.show({
          position: "top",
          icon: "fail",
          content: "账号错误"
        });
        setShow(true);
        return;
      } else {
        if (show) {
          setShow(false);
          Toast.show({
            icon: "fail",
            position: "top",
            content: "密码或验证码错误，请重新尝试"
          });
          setImgSrc(data.data);
        } else {
          Toast.show({
            icon: "fail",
            position: "top",

            content: "密码或验证码错误，请重新尝试"
          });
          // console.log(data.data);
          setImgSrc(data.data);
        }
      }
    }
  };
  const [imgSrc, setImgSrc] = useState();
  return (
    <div className={"bg"}>
      <div className={"login_card"}>
        <h1 className={"title"}>Platform of LoT</h1>

        <Form form={form} name="normal_login" className="login-form">
          <Form.Item
            name="email"
            rules={[{ required: true, message: "请输入邮箱" }]}
            style={{ borderBottom: "1px solid #DCDCDC" }}
          >
            <Input placeholder="请输入邮箱" bordered={false} />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "请输入密码!" }]}
            style={{
              borderBottom: "1px solid #DCDCDC"
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <Input
                placeholder="请输入密码"
                bordered={false}
                type={visible ? "text" : "password"}
              />
              <div className={"eye"}>
                {!visible ? (
                  <EyeInvisibleOutline onClick={() => setVisible(true)} />
                ) : (
                  <EyeOutline onClick={() => setVisible(false)} />
                )}
              </div>
            </div>
          </Form.Item>
          <>
            <Form.Item
              hidden={show}
              name="captcha"
              rules={[{ required: true, message: "请输入验证码!" }]}
              style={{ borderBottom: "1px solid #DCDCDC" }}
            >
              <Input bordered={false} type="text" placeholder="请输入验证码" />
            </Form.Item>

            <Form.Item Col={2} hidden={show}>
              <img
                style={{
                  height: "3rem",
                  textAlign: "middle"
                }}
                onClick={async () => {
                  const username = form.getFieldValue("email");
                  if (username ?? username.trim()) {
                    // console.log(username, { username });
                    const data = await GetCaptcha({ email: username });
                    // console.log(data);
                    if (data.data.message) {
                      Toast.show({
                        content: data.data.message,
                        icon: "!"
                      });
                      return;
                    }
                    if (data.status === 200) {
                      setImgSrc(data.data);
                      document
                        .getElementById("captcha")
                        .setAttribute("src", "");
                    }
                  }
                }}
                id="captcha"
                alt="captcha"
                src={"data:image/jpeg;base64," + imgSrc}
              />
            </Form.Item>
          </>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              onClick={async (e) => {
                e.preventDefault();
                const data = form.getFieldValue();
                // onFinish(data);
                console.log(data);
                if (!data.email || !data.password) {
                  Toast.show({
                    content: "用户名和密码必填",
                    icon: "!"
                  });
                  return;
                }
                if (show === true && !data.captcha) delete data.captcha;
                else if (show === false && !data.captcha) {
                  Toast.show({
                    content: "验证码写一下嗷",
                    icon: "^_^"
                  });
                  return;
                }
                if (!data["captcha"]) data["captcha"] = "";
                const res = await LoginAction(data);
                console.log("this is " + JSON.stringify(res));
                checkLogin(res);
              }}
              style={{
                height: "56PX",
                borderRadius: "12PX",
                fontSize: "x-large"
              }}
            >
              登录
            </Button>
          </Form.Item>
        </Form>
        <Footer className={"footer"}>
          <text>此为物联网平台登录页，详情咨询开发人员</text>
        </Footer>
      </div>
    </div>
    // </>
  );
}
