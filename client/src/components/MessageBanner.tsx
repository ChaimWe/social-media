import { observer } from "mobx-react-lite";
import { Alert } from "antd";
import { useEffect } from "react";
import { postStore } from "../stores/postStore"; // you can add other stores if needed

export default observer(function MessageBanner() {
  useEffect(() => {
    if (postStore.message || postStore.error) {
      const timer = setTimeout(() => {
        postStore.message = "";
        postStore.error = "";
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [postStore.message, postStore.error]);

  if (!postStore.message && !postStore.error) return null;

  return (
    <>
      {postStore.message && <Alert type="success" message={postStore.message} />}
      {postStore.error && <Alert type="error" message={postStore.error} />}
    </>
  );
});