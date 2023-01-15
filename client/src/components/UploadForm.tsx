import { FC, FormEvent, useState } from "react";
import { useAppDispatch } from "../features/hooks";
import { uploadFormToggle } from "../features/ui/uiSlice";
import Modal from "./Modal";

const UploadForm: FC = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState<string | Blob>("");

  const dispatch = useAppDispatch();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const form = new FormData();
    form.append("title", title);
    form.append("category", category);
    form.append("image", image);
    try {
      const request = await fetch("/api/posts", {
        method: "post",
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("user") as string).token}`,
        },
        body: form,
      });
      const response = await request.json();
      console.log("Response", response);
      dispatch(uploadFormToggle(false));
    } catch (err) {
      alert("Error uploading the files");
      console.log("Error uploading the files", err);
    }
  };

  return (
    <Modal onSubmit={handleSubmit}>
      <div className="form-control">
        <label htmlFor="title">Title</label>
        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div className="form-control">
        <label htmlFor="category">Category</label>
        <input
          type="text"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label htmlFor="image">Image</label>
        <input
          type="file"
          name="image"
          id="image"
          onChange={(e) => {
            const files: FileList = e.target.files as FileList;
            setImage(files[0]);
          }}
        />
      </div>
      <button type="submit">Upload</button>
    </Modal>
  );
};

export default UploadForm;
