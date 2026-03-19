import { Avatar, Button, Layout, Menu, Tooltip } from "antd";
import { observer } from "mobx-react-lite";
import { authStore } from "../stores/authstore";
import { useNavigate } from "react-router-dom";
import styles from "../styles/AppHeader.module.css";

const { Header } = Layout;

export default observer(function AppHeader() {
  const navigate = useNavigate();
  const menuRoutes: Record<string, string> = {
    "1": "/",
    "2": "/feed",
    "3": "/about",
    "4": "/users",
  };

  return (
    <Header
      className={styles.header}
    >
      <div
        className={styles.brand}
        onClick={() => navigate("/")}
      >
        Social Media
      </div>

      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["1"]}
        onClick={(e) => navigate(menuRoutes[e.key])}
        className={styles.menu}
      >
        <Menu.Item key="1">Home</Menu.Item>
        <Menu.Item key="2">Feed</Menu.Item>
        <Menu.Item key="3">About</Menu.Item>
        <Menu.Item key="4">Users</Menu.Item>
      </Menu>

      <div className={styles.right}>
        {authStore.isAuthenticated ? (
          <>
            <Tooltip title={authStore.user?.name}>
              <span className={styles.userName}>
                {authStore.user?.name}
              </span>
            </Tooltip>
            <Avatar className={styles.avatar}>
              {authStore.user?.name[0].toUpperCase()}
            </Avatar>
            <Button
              type="dashed"
              onClick={() => authStore.logout()}
              className={styles.roundedButton}
            >
              Logout
            </Button>
          </>
        ) : (
          <Button
            type="primary"
            onClick={() => navigate("/login")}
            className={styles.roundedButton}
          >
            Login
          </Button>
        )}
      </div>
    </Header>
  );
});
