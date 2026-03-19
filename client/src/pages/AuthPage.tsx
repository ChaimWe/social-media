import { Form, Input, Button, Card, Segmented } from "antd";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import { observer } from "mobx-react-lite";
import { useLocation, useNavigate } from "react-router-dom";
import { authStore } from "../stores/authstore";

export default observer(function AuthPage(){
  const location = useLocation();
  const urlmode = location.pathname.includes("register") ? "register" : "login";
  const [mode, setMode] = useState<"login" | "register">(urlmode);

  const [loginForm] = useForm();
  const [registerForm] = useForm();
  const navigate = useNavigate();

  const handleLogin = async (values: any) => {
    authStore.clearError();
    await authStore.login(values.email, values.password);
    if (authStore.isAuthenticated) navigate("/feed");
  };

  const handleRegister = async (values: any) => {
    authStore.clearError();
    await authStore.register({
      name: values.name,
      email: values.email,
      password: values.password,
    });
    if (authStore.isAuthenticated) navigate("/feed");
  };

  return (
    <Card style={{ width: 400, margin: "100px auto" }}>
      <Segmented
        block
        options={[
          { label: "Login", value: "login" },
          { label: "Register", value: "register" },
        ]}
        value={mode}
        onChange={(v) => setMode(v as "login" | "register")}
        style={{ marginBottom: 20 }}
      />

      {mode === "login" && (
        <Form form={loginForm} layout="vertical" onFinish={handleLogin}>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true }, { type: "email" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            block
            loading={authStore.loading}
          >
            Login
          </Button>
          {authStore.error && (
            <p style={{ color: "red", textAlign: "center" }}>
              {authStore.error}
            </p>
          )}
        </Form>
      )}

      {mode === "register" && (
        <Form form={registerForm} layout="vertical" onFinish={handleRegister}>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true }, { type: "email" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            block
            loading={authStore.loading}
          >
            Register
          </Button>
          {authStore.error && (
            <p style={{ color: "red", textAlign: "center" }}>
              {authStore.error}
            </p>
          )}
        </Form>
      )}
    </Card>
  );
});
