import { Avatar, Button, Card, Typography, Space } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { userStore } from "../stores/userStore";
import { authStore } from "../stores/authstore";
import { useNavigate } from "react-router-dom";

const { Text, Title } = Typography;

export default observer(function UsersPage() {
  const navigate = useNavigate();

  useEffect(() => {
    userStore.fetchAllUsers();
  }, []);

  const currentUserId = authStore.user?.id;

  return (
    <div style={{ maxWidth: 700, margin: "30px auto" }}>
      <Title level={3} style={{ marginBottom: 20 }}>
        Discover Users
      </Title>

      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        {userStore.allUsers.map((user) => {
          const isFollowing = user.followers.includes(currentUserId || "");

          return (
            <Card
              key={user.id}
              hoverable
              onClick={() => navigate(`/users/${user.id}`)}
              style={{
                borderRadius: 16,
                transition: "0.2s",
              }}
              bodyStyle={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Space size="middle">
                <Avatar size={56} src={user.profileImage} />

                <div>
                  <Text strong style={{ fontSize: 16 }}>
                    {user.name}
                  </Text>
                  <br />
                  <Text type="secondary">
                    {user.bio || "No bio"}
                  </Text>
                </div>
              </Space>

              {currentUserId !== user.id && (
                <Button
                  type={isFollowing ? "default" : "primary"}
                  onClick={(e) => {
                    e.stopPropagation();
                    userStore.followUser(user.id);
                  }}
                  style={{
                    borderRadius: 20,
                    minWidth: 100,
                  }}
                >
                  {isFollowing ? "Unfollow" : "Follow"}
                </Button>
              )}
            </Card>
          );
        })}
      </Space>
    </div>
  );
});