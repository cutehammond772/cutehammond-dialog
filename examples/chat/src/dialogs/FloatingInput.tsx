import * as React from "react";
import { styled } from "@linaria/react";

import { createDialog } from "@cutehammond/dialog-core";

const Component = () => {
  return <>안녕하세요</>;
};

const Style = styled.div`
  position: absolute;
  width: 500px;
  height: 100px;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background-color: navy;
  color: white;
`;

const FloatingInput = createDialog(Component, { base: Style });

export default FloatingInput;
