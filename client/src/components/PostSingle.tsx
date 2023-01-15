import { FC, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import PostOptions from "./PostOptions";
import EditForm from "./EditForm";
import timeDifference from "../utils/timeAgo";
import { CSSTransition } from "react-transition-group";
import { Post } from "../types";
import { useAppSelector } from "../features/hooks";

const PostSingle: FC<{ post: Post }> = ({ post }) => {
  const createdAt = new Date(post.created_at);
  const [showOptions, setShowOptions] = useState(false);
  const uiState = useAppSelector((state) => state.ui);
  const postsState = useAppSelector((state) => state.posts);

  const imgSrc = post.image[0] === "/" ? `${post.image}` : post.image;

  async function vote(opt: "upvote" | "downvote") {
    const res = await fetch(`/api/posts/${opt}/${post.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("user") as string).token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
  }

  const togglePostOptions = useCallback(() => {
    setShowOptions((prev) => !prev);
  }, []);

  return (
    <>
      <article className="post">
        <div className="post__header">
          <div className="post__header__top">
            <img className="post__category-img" src="/images/category-funny.jpg" alt="funny-cat" />
            <span className="post__category-name">{post.category}&nbsp; </span>
            <div className="post__time">- {timeDifference(Date.now(), createdAt)}</div>
          </div>
          <i className="fas fa-ellipsis-h fa-2x" onClick={togglePostOptions}></i>
        </div>
        <div className="post__content">
          <div className="post__content__title">{post.title}</div>
          <Link to={`/meme/${post.id}`}>
            <img src={imgSrc} alt="sample-meme" loading="lazy" />
          </Link>
        </div>
        <div className="post__action">
          <div>
            <i className="fas fa-arrow-alt-circle-up" onClick={() => vote("upvote")}></i>
            {post.upvotes}
          </div>
          <div>
            <i className="fas fa-arrow-alt-circle-down" onClick={() => vote("downvote")}></i>
            {post.downvotes}
          </div>
          <Link to="/">
            <i className="fas fa-comment-alt"></i>
            {post.comment_count}
          </Link>
          <Link to="/">
            <i className="fas fa-share-alt"></i>SHARE
          </Link>
        </div>
      </article>
      <CSSTransition
        mountOnEnter
        unmountOnExit
        in={showOptions && post.id.toString() === postsState.activePostId}
        timeout={400}
        classNames="post-options"
      >
        <PostOptions post={post} toggle={togglePostOptions} />
      </CSSTransition>
      {/* {showOptions && post.id.toString() === postsState.activePostId && (
        <PostOptions post={post} toggle={togglePostOptions} />
      )} */}
      {post && uiState.isEditFormOpen && <EditForm post={post} />}
    </>
  );
};

export default PostSingle;
