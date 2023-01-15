import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import PostSingle from "../components/PostSingle";
import Swipebar from "../components/Swipebar";
import { useAppDispatch } from "../features/hooks";
import { setActivePost } from "../features/posts/postsSlice";
import { Post } from "../types";

const PostPage: FC = () => {
  const [post, setPost] = useState({} as Post);
  const [error, setError] = useState("");
  const { id } = useParams<{ id: string }>() as { id: string };
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setActivePost(id));
    fetch(`/api/posts/${id}`)
      .then((data) => data.json())
      .then((res) => setPost(res.data))
      .catch(() => setError("Error while fetching content."));
    return () => {
      dispatch(setActivePost(""));
    };
  }, [dispatch, id]);

  return (
    <div className="post-page">
      <Navbar />
      <Swipebar />
      {error && <p className="error">{error}</p>}
      {post && <PostSingle post={post} />}
    </div>
  );
};

export default PostPage;
