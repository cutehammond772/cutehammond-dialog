import * as React from "react";

import { styled } from "@linaria/react";
import * as props from "@theme/properties";

export default function Footer() {
  return (
    <Container>
      <div className="input">
        <div className="bar">Search Bar</div>
        <div className="submit">Submit</div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  grid-area: 3 / 1 / 4 / 4;

  width: 100%;
  min-height: 4rem;

  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  align-items: center;

  background-color: var(${props.footer});
  color: var(${props.text});

  & .input {
    grid-column: 2 / 3;

    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    column-gap: 1rem;
  }

  & .bar {
    width: 100%;
    height: 100%;

    background-color: white;
    border-radius: 1rem;
    padding: 0.5rem 1rem;
  }
`;
