import * as React from "react";
import hamster from "@public/hamster.png";

import { styled } from "@linaria/react";
import { DARK } from "@theme/templates";
import { useTheme } from "@theme/hooks";

// Light, Dark Mode에 대응된다.
export default function Logo() {
  const { theme } = useTheme();

  const logoColor = React.useMemo(() => {
    if (theme == DARK) return "dark";
    return "light";
  }, [theme]);

  return (
    <Container>
      <img className={"logo " + logoColor} src={hamster} alt="logo" width={32} height={32} />
      <div className="title">HamGPT</div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  column-gap: 1rem;

  & .logo {
    &.dark {
      filter: invert(80%);
    }

    transition: filter 100ms;
  }

  & .title {
    font-weight: bold;
    font-size: 1.5rem;
  }
`;
