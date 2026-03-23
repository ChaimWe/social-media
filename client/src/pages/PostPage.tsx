import {
  Button,
  Card,
  Form,
  Input,
  Spin,
  Typography,
  Avatar,
  Divider,
} from "antd";
import { observer } from "mobx-react-lite";
import { postStore } from "../stores/postStore";
import { authStore } from "../stores/authstore";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import styles from "../styles/PostPage.module.css";

const { Title, Text } = Typography;

export default observer(function PostPage() {
  const { postId } = useParams<{ postId: string }>();
  if (!postId) return <p>No post selected</p>;

  useEffect(() => {
    postStore.getPost(postId);
  }, [postId]);

  if (postStore.loadingPost)
    return (
      <Spin size="large" style={{ display: "block", margin: "100px auto" }} />
    );

  const post = postStore.currentPost;
  if (!post) return <p>Post not found</p>;

  const isOwner =
    authStore.isAuthenticated && authStore.user?.id === post.author.id;

  return (
    <div style={{ maxWidth: 700, margin: "40px auto" }}>
      <Card>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Avatar size={48} src={post.author.profileImage} />
          <div>
            <Title level={5} style={{ margin: 0 }}>
              {post.author.name}
            </Title>
            <Text type="secondary">Post</Text>
          </div>
        </div>

        <Divider />

        <Text style={{ fontSize: 16 }}>{post.content}</Text>

        {post.image && (
          <img src={post.image} alt="" className={styles.picture} />
        )}

        {isOwner && (
          <div style={{ marginTop: 16 }}>
            <Button danger onClick={()=> postStore.deletePost(post._id)}>Delete</Button>
          </div>
        )}

        <Divider />

        <Title level={5}>Comments:</Title>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {post.comments.map((comment) => (
            <Card key={comment._id} size="small">
              <div style={{ display: "flex", gap: 10 }}>
                <div>
                  <Text strong>{comment.user.name}:</Text>
                  <br />
                  <Text>{comment.text}</Text>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {authStore.isAuthenticated ? (
          <Form
            style={{ marginTop: 16 }}
            onFinish={async (values: { text: string }) => {
              await postStore.addComment(post._id, values.text);
            }}
          >
            <Form.Item
              name="text"
              rules={[{ required: true, message: "Write a comment" }]}
            >
              <Input.TextArea
                placeholder="Write a comment..."
                autoSize={{ minRows: 2, maxRows: 4 }}
              />
            </Form.Item>

            <Button htmlType="submit" type="primary">
              Post Comment
            </Button>
          </Form>
        ) : (
          <Typography.Paragraph type="secondary" style={{ marginTop: 16 }}>
            <Link to="/login">Log in</Link> to comment.
          </Typography.Paragraph>
        )}
      </Card>
    </div>
  );
});
