import { FC, MouseEventHandler } from "react";
import ReactDOM from "react-dom";

const Backdrop: FC<{ show: boolean; onClick: MouseEventHandler<HTMLDivElement> }> = ({
  show,
  onClick,
}) => {
  return ReactDOM.createPortal(
    <div className={show ? "backdrop" : ""} onClick={onClick}></div>,
    document.getElementById("backdrop-hook") as HTMLDivElement
  );
};

export default Backdrop;
