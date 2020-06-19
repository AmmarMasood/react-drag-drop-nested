import React, { useState } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { SafetyCertificateTwoTone } from "@ant-design/icons";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import { server } from "../../Utils/Server";

const layout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 12 }
};
const tailLayout = {
  wrapperCol: { offset: 2, span: 12 }
};

const headingStyle = {
  padding: "40px 40px 40px 5px",
  fontSize: "40px"
};
const style = {
  // borderLeft: "2px solid #1890ff",
  position: "absolute",
  width: "80%",
  top: "15%",
  padding: "10px 10px 10px 20px",
  margin: "30px"
};

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onFinish = () => {
    const values = {
      username,
      password
    };
    //  backend login script(should be uncommented):
    // axios
    //   .post(`${server}/login`, values)
    //   .then(res => props.history.push("/rooms"))
    //   .catch(err => console.log(err));

    // this line should be removed:
    props.history.push("/rooms");
  };

  const onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div style={style}>
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <div style={headingStyle}>
          <SafetyCertificateTwoTone twoToneColor="#1890ff" /> Log In To Your
          Account
        </div>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input value={username} onChange={e => setUsername(e.target.value)} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <p style={{ padding: "10px 10px 10px 0", fontSize: "15px" }}>
            Don't Have An Account? <Link to="/register">SignUp</Link>
          </p>
        </Form.Item>
      </Form>
    </div>
  );
}
export default withRouter(Login);
