import { Avatar, Button, Card, List, Space, Typography } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { userStore } from "../stores/userStore";
import { authStore } from "../stores/authstore";

const { Text } = Typography;

export default observer(function UsersPage() {
  useEffect(() => {
    userStore.fetchAllUsers();
  }, []);

  const currentUserId = authStore.user?.id;

  return (
    <Card style={{ maxWidth: 700, margin: "30px auto" }}>
      <List
        itemLayout="horizontal"
        dataSource={userStore.allUsers}
        renderItem={(user) => {
          const isFollowing = user.followers.includes(currentUserId || "");

          return (
            <List.Item
              actions={
                currentUserId !== user.id
                  ? [
                      <Button
                        type={isFollowing ? "default" : "primary"}
                        onClick={() => userStore.followUser(user.id)}
                      >
                        {isFollowing ? "Unfollow" : "Follow"}
                      </Button>,
                    ]
                  : []
              }
            >
              <List.Item.Meta
                avatar={<Avatar src={user.profileImage} />}
                title={user.name}
                description={
                  <Text type="secondary">
                    {user.bio || "No bio"}
                  </Text>
                }
              />
            </List.Item>
          );
        }}
      />
    </Card>
  );
});