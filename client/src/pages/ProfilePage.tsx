import { Card, Avatar, Typography, Divider, Space } from "antd";
import styles from "../styles/ProfilePage.module.css";
import { useParams } from "react-router-dom";
import { userStore } from "../stores/userStore";
import { useEffect } from "react";

const { Title, Text } = Typography;

export default function UserProfilePage() {
  
    const { userId } = useParams<{ userId: string }>();
    if (!userId)return<p>No id in the link</p>;
      useEffect(() => {
    if (userId) {
      userStore.fetchUser(userId);
    }
  }, [userId]);

  if (!userId) return <p>No userId in the link</p>;
  const profile = userStore.currentProfile;

  if (!profile) return <p>Loading...</p>;

    

  return (
    <div className={styles.container}>
      <Card className={styles.profileCard}>
        <Space align="center">
          <Avatar size={80} src={profile.profileImage} />
          <div>
            <Title level={3}>{profile.name}</Title>
            <Text>{profile.bio}</Text>
            <br />
            <Text type="secondary">
              {profile.followers.length} followers • {profile.following.length} following
            </Text>
          </div>
        </Space>
      </Card>

      <Divider orientation="horizontal">Posts</Divider>

      {profile.posts.length === 0 && <Text>No posts yet.</Text>}

      {profile.posts.map((post) => (
        <Card key={post._id} className={styles.postCard}>
          <Text>{post.content}</Text>
          {post.image && <img src={post.image} alt="" className={styles.postImage} />}
          <div className={styles.postFooter}>
            <Text type="secondary">{post.likes.length} likes • {post.comments.length} comments</Text>
          </div>
        </Card>
      ))}
    </div>
  );
}