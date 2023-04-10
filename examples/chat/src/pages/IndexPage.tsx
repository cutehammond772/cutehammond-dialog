import * as React from "react";
import { styled } from "@linaria/react";

import { useTheme } from "@theme/hooks";
import { DARK, LIGHT } from "@theme/templates";
import * as props from "@theme/properties";
import { useDialog } from "@cutehammond/dialog-core";
import FloatingInput from "../dialogs/FloatingInput";

export default function IndexPage() {
  const { setTheme } = useTheme();
  const { create } = useDialog(FloatingInput);

  return (
    <Container>
      <h1>Welcome!</h1>
      <button onClick={create}>Create Dialog!</button>
      <button onClick={() => setTheme(DARK)}>Dark Mode</button>
      <button onClick={() => setTheme(LIGHT)}>Light Mode</button>
    </Container>
  );
}

const Container = styled.div`
  background-color: var(${props.background});
  color: var(${props.text});
`;
