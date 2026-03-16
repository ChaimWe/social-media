import { Card, Button, Input, Space, Typography, Avatar } from "antd";
import { useState } from "react";
import { observer } from "mobx-react-lite";
import type { Post } from "../types/interfaces";
import { postStore } from "../stores/postStore";


const { Text } = Typography;



export const PostCard = observer((post: Post) => {
  const [comment, setComment] = useState("");

  const handleLike = () => postStore.likePost(post._id);
  const handleAddComment = () => {
    if (!comment.trim()) return;
    postStore.addComment(post._id, comment);
    setComment("");
  };

  return (
    <Card
      style={{ marginBottom: 24, borderRadius: 12 }}
      bodyStyle={{ padding: 16 }}
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

        <Button type="primary" onClick={handleLike}>
          Like ({post.likes.length})
        </Button>

        <div>
          {post.comments.map((c, idx) => (
            <Space key={idx} style={{ display: "flex", marginBottom: 8 }}>
              <Avatar size="small">{c.user.name[0]}</Avatar>
              <Text>
                <strong>{c.user.name}:</strong> {c.text}
              </Text>
            </Space>
          ))}
        </div>

        <Input.Search
          placeholder="Add a comment"
          enterButton="Post"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onSearch={handleAddComment}
        />
      </Space>
    </Card>
  );
});