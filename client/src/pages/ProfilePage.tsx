import { Card, Avatar, Typography, Divider, Space, Spin } from "antd";
import styles from "../styles/ProfilePage.module.css";
import { Link, useParams } from "react-router-dom";
import { userStore } from "../stores/userStore";
import { useEffect, useState } from "react";

const { Title, Text } = Typography;

export default function ProfilePage() {
  const { userId } = useParams<{ userId: string }>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    setLoading(true);

    userStore.fetchUser(userId).finally(() => {
      setLoading(false);
    });
  }, [userId]);

  if (!userId) return <p>No userId in the link</p>;
  if (loading) return <Spin tip="Loading profile..." />;

  const profile = userStore.currentProfile;
  if (!profile) return <p>Profile not found</p>;

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
              {profile.followers.length} followers • {profile.following.length}{" "}
              following
            </Text>
          </div>
        </Space>
      </Card>

      <Divider orientation="horizontal">Posts</Divider>

      {profile.posts.length === 0 && <Text>No posts yet.</Text>}

      <div className={styles.postsGrid}>
        {profile.posts.map((post) => (
          <Card key={post._id} className={styles.postCard} hoverable>
            <Link to={`/posts/${post._id}`}>
              {post.image && (
                <img src={post.image} alt="" className={styles.postImage} />
              )}
              <Text>{post.content}</Text>
              <div className={styles.postFooter}>
                <Text type="secondary">
                  {post.likes.length} likes ·{" "}
                  {post.commentCount === 1
                    ? "1 comment"
                    : `${post.commentCount} comments`}
                </Text>
              </div>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
