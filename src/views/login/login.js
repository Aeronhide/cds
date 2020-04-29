import React, { useEffect } from "react";
import { connect } from "react-redux";
import firebase from "../../config/firebase";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { login } from "../../actions";
import "./style.sass";

const Login = (props) => {
  const { Title } = Typography;
  const history = useHistory();
  const onFinish = (values) => {
    props.login(values);
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const us = firebase.auth().currentUser;
        localStorage.setItem("token", `${us.refreshToken}`);
        localStorage.setItem(
          "user",
          `${us.email.search("student") !== -1 ? "student" : "teacher"}`
        );
        history.push("/schedule");
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    });
  }, []);

  return (
    <div className="login">
      <Title level={3}>Welcome to CDS</Title>
      <Form
        size="large"
        name="normal_login"
        className="login_form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input
            size="large"
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            className="form-input"
            size="large"
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button
            style={{ width: "100%" }}
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    data: state.login,
    loading: state.loading,
  };
};

const mapDispatchToProps = { login };
export default connect(mapStateToProps, mapDispatchToProps)(Login);
