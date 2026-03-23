import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { List, Card, Avatar, Button, Spin, Space } from "antd";
import { Link } from "react-router-dom";
import { postStore } from "../stores/postStore";
import { authStore } from "../stores/authstore";
import { FloatingCreatePost } from "../components/FloatingCreatePost";
import styles from "../styles/FeedPage.module.css";

export default observer(function FeedPage() {
  useEffect(() => {
    postStore.fetchFeed();
  }, []);

  const currentUserId = authStore.user?.id;

  const handleLike = (postId: string) => {
    postStore.likePost(postId);
  };

  if (postStore.loadingFeed) {
    return (
      <div className={styles.loading}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <FloatingCreatePost />
      <List
        dataSource={postStore.posts}
        renderItem={(post) => {
          const hasLiked = post.likes.includes(currentUserId || "");

          return (
            <Card
              key={post._id}
              className={styles.card}
              title={
                <div className={styles.cardTitle}>
                  <Avatar src={post.author.profileImage} />
                  <span>{post.author.name}</span>
                </div>
              }
              cover={
                post.image ? (
                  <img
                    src={post.image}
                    alt="post"
                    className={styles.coverImage}
                  />
                ) : null
              }
            >
              <p>{post.content}</p>

              <Space wrap>
                <Button
                  type={hasLiked ? "primary" : "default"}
                  onClick={() => handleLike(post._id)}
                >
                  {hasLiked ? "Liked" : "Like"} ({post.likes.length})
                </Button>
                <Link to={`/posts/${post._id}`}>
                  View post
                  {post.commentCount > 0 ? ` (${post.commentCount} comments)` : ""}
                </Link>
              </Space>
            </Card>
          );
        }}
      />
    </div>
  );
});
