import { Card, Avatar, Button } from "antd";
import { authStore } from "../stores/authstore";
import { observer } from "mobx-react-lite";

export default observer(function HomePage(){
  return (
    <div style={{ maxWidth: 800, margin: "50px auto", textAlign: "center" }}>
      <Card style={{ padding: 30 }}>
        <h1>Welcome to SocialApp!</h1>
        <p>Connect with friends, post updates, like and comment.</p>

        {authStore.isAuthenticated ? (
          <Card style={{ marginTop: 20 }}>
            {/* <Avatar size={64} src={authStore.user?.profileImage} /> */}
            <h3>{authStore.user?.name}</h3>
            {/* <p>{authStore.user?.bio || "No bio yet"}</p> */}
            <Button type="primary" style={{ marginTop: 10 }} href="/feed">
              Go to your feed
            </Button>
          </Card>
        ) : (
          <div style={{ marginTop: 20 }}>
            <Button type="primary" href="/login" style={{ marginRight: 10 }}>
              Login
            </Button>
            <Button href="/register">Register</Button>
          </div>
        )}
      </Card>
    </div>
  );
});