import { Card, Button, Space, Typography } from "antd";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import type { Post } from "../types/interfaces";
import { postStore } from "../stores/postStore";

const { Text } = Typography;

export const PostCard = observer((post: Post) => {
  const handleLike = () => postStore.likePost(post._id);

  return (
    <Card
      style={{ marginBottom: 24, borderRadius: 12 }}
      styles={{ body: { padding: 16 } }}
      cover={
        post.image && (
          <img
            src={post.image}
            alt="post"
            style={{ borderRadius: "12px 12px 0 0", objectFit: "cover", maxHeight: 400 }}
          />
        )
      }
    >
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <Text strong>{post.author.name}</Text>
        <Text>{post.content}</Text>

        <Space wrap>
          <Button type="primary" onClick={handleLike}>
            Like ({post.likes.length})
          </Button>
          <Link to={`/posts/${post._id}`}>
            View post
            {post.commentCount > 0 ? ` (${post.commentCount} comments)` : ""}
          </Link>
        </Space>
      </Space>
    </Card>
  );
});
