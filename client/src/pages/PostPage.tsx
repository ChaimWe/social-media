import { Button, Card, Form, Input, Spin } from "antd";
import { observer } from "mobx-react-lite";
import { postStore } from "../stores/postStore";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export default observer(function PostPage() {
  const {postId} = useParams<{postId: string}>();
  if(!postId) return <p>No post selected</p>;

  useEffect(()=>{
    if(postId) postStore.getPost(postId)
  },[postId])

  if(postStore.loadingPost) return <Spin size="large"/>
  const post = postStore.currentPost;
  if (!post) return <p>No post selected</p>

  return (
    <div style={{ maxWidth: 700, margin: "30px auto" }}>
      <Card title={post.author.name}>
        {post.image ? (
          <img
            src={post.image}
            alt="post"
            style={{ width: "100%", maxHeight: 500, objectFit: "cover", marginBottom: 12 }}
          />
        ) : null}
        <p>{post.content}</p>

        <div style={{ marginTop: 16 }}>
          {post.comments.map((comment) => (
            <div key={comment._id} style={{ marginBottom: 8 }}>
              <b>{comment.user.name}:</b> {comment.text}
            </div>
          ))}
        </div>

        <Form
          style={{ marginTop: 10 }}
          onFinish={async (values: { text: string }) => {
            await postStore.addComment(post._id, values.text);
          }}
        >
          <Form.Item name="text" rules={[{ required: true, message: "Write a comment" }]}>
            <Input placeholder="Write a comment..." />
          </Form.Item>

          <Button htmlType="submit" type="primary" size="small">
            Comment
          </Button>
        </Form>
      </Card>
    </div>
  );
});
