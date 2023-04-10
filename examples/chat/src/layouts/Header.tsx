import * as React from "react";

import { styled } from "@linaria/react";
import * as props from "@theme/properties";

import Logo from "@components/Logo";

export default function Header() {
  return (
    <Container>
      <Logo />
      <div>Menu</div>
      <div>Github</div>
    </Container>
  );
}

const Container = styled.div`
  grid-area: 1 / 1 / 2 / 4;

  top: 0;
  position: sticky;

  width: 100%;
  min-height: 4rem;

  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  justify-items: center;
  align-items: center;

  border-bottom: 1px solid black;
  background-color: var(${props.header});
  color: var(${props.text});
`;
