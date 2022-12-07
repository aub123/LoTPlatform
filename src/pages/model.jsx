import React from "react";
import { GetUser } from "/src/apis/methods.js";
import Bottom from "../components/Bottom";

import {
  Form,
  Input,
  Button,
  Dialog,
  TextArea,
  DatePicker,
  Selector,
  Slider,
  Stepper,
  Switch
} from "antd-mobile";

const model = {
  name: "",
  id: "",
  type: "",
  precision: "",
  range: "",
  unit: "",
  description: ""
};

export default () => {
  const onFinish = (values: any) => {
    Dialog.alert({
      content: <pre>{JSON.stringify(values, null, 2)}</pre>
    });
  };

  return (
    <>
      <Form layout="horizontal">
        <Form.Header>查看变量</Form.Header>
        <Form.Item
          name="name"
          label="变量名"
          rules={[{ required: true, message: "不能为空" }]}
          disabled
        >
          <Input onChange={console.log} placeholder={model.name} />
        </Form.Item>
        <Form.Item
          name="id"
          label="标识符"
          rules={[{ required: true, message: "不能为空" }]}
          disabled
        >
          <Input onChange={console.log} placeholder={model.id} />
        </Form.Item>
        <Form.Item
          name="type"
          label="数据类型"
          rules={[{ required: true, message: "不能为空" }]}
          disabled
        >
          <Input onChange={console.log} placeholder={model.type} />
        </Form.Item>
        <Form.Item name="precision" label="精度" disabled>
          <Input onChange={console.log} placeholder={model.precision} />
        </Form.Item>
        <Form.Item name="range" label="范围" disabled>
          <Input onChange={console.log} placeholder={model.range} />
        </Form.Item>
        <Form.Item name="unit" label="单位" disabled>
          <Input onChange={console.log} placeholder={model.unit} />
        </Form.Item>
        <Form.Item name="description" label="描述" disabled>
          <Input onChange={console.log} placeholder={model.description} />
        </Form.Item>
      </Form>
    </>
  );
};
