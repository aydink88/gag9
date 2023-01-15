import { FC, useCallback, useState } from "react";
import Modal from "../components/Modal";
import { CSSTransition } from "react-transition-group";
import { Post } from "../types";
import { useAppDispatch } from "../features/hooks";
import { editFormToggle } from "../features/ui/uiSlice";

const DeleteModal: FC<{ post: Post; toggleModal: () => void }> = ({ post, toggleModal }) => {
  //const dispatch = useAppDispatch();

  return (
    <Modal header="Confirm Delete?">
      <div>
        {/* <button onClick={() => dispatch(deletePost(post.id))}>Delete</button> */}
        <button onClick={toggleModal}>Cancel</button>
      </div>
    </Modal>
  );
};

const PostOptions: FC<{ post: Post; toggle: () => void }> = ({ post, toggle }) => {
  const dispatch = useAppDispatch();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const toggleModal = useCallback(() => {
    setConfirmOpen((prev) => !prev);
  }, []);

  return (
    <div className="post-options">
      <CSSTransition mountOnEnter unmountOnExit in={confirmOpen} timeout={400} classNames="modal">
        <DeleteModal post={post} toggleModal={toggleModal} />
      </CSSTransition>
      {/* {confirmOpen && <DeleteModal post={props.post} toggleModal={toggleModal} />} */}
      <div className="post-options__item" onClick={() => dispatch(editFormToggle(true))}>
        <i className="fas fa-edit"></i>
        <p>Edit Post</p>
      </div>
      <div className="post-options__item" onClick={toggleModal}>
        <i className="fas fa-trash-alt"></i>
        <p>Delete Post</p>
      </div>
      <button className="outline" onClick={toggle}>
        Cancel
      </button>
    </div>
  );
};

export default PostOptions;
