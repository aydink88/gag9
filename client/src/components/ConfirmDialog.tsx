import { FC, ReactNode } from "react";

const ConfirmDialog: FC<{ children: ReactNode }> = ({ children }) => {
  return <div>{children}</div>;
};

export default ConfirmDialog;
