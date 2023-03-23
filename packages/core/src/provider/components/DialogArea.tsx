import React from "react";
import { DialogAreaProfile } from "$provider";

const DialogArea = ({ children, layout }: React.PropsWithChildren<DialogAreaProfile>) => {
  return <div className={layout}>{children}</div>;
};

export default DialogArea;
