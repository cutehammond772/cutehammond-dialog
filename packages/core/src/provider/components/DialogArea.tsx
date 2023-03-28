import React from "react";
import { DialogAreaProps } from "$provider";

const DialogArea = ({ children, layout }: React.PropsWithChildren<DialogAreaProps>) => {
  return <div className={layout}>{children}</div>;
};

export default DialogArea;
