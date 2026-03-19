import { Button, Modal, Input, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import { postStore } from "../stores/postStore";
import styles from "../styles/FloatingCreatePost.module.css";

const { TextArea } = Input;

export const FloatingCreatePost = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handlePost = async () => {
    if (!content.trim() && imageFile === undefined) {
      return message.error("Post cannot be empty");
    }

    setUploading(true);
    try {
      await postStore.createPost(content, imageFile ?? undefined);
      setContent("");
      setImageFile(null);
      setIsModalOpen(false);
      message.success("Post created!");
    } catch {
      message.error("Failed to create post");
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <Button
        type="primary"
        shape="circle"
        size="large"
        className={styles.fab}
        onClick={() => setIsModalOpen(true)}
      >
        +
      </Button>

      <Modal
        title="Create Post"
        open={isModalOpen}
        onOk={handlePost}
        onCancel={() => setIsModalOpen(false)}
        okText="Post"
        confirmLoading={uploading}
      >
        <TextArea
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          className={styles.textArea}
        />

        <Upload
          beforeUpload={(file) => {
            setImageFile(file);
            return false;
          }}
          onRemove={() => setImageFile(null)}
          maxCount={1}
          accept="image/*"
        >
          <Button icon={<UploadOutlined />}>
            {imageFile ? "Change Image" : "Upload Image"}
          </Button>
        </Upload>

        {imageFile && <p className={styles.fileName}>{imageFile.name}</p>}
      </Modal>
    </>
  );
};