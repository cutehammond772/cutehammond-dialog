import * as React from "react";
import { styled } from "@linaria/react";

import { LIGHT } from "@theme/templates";
import { ThemeContext } from "@theme/context";
import { getTheme } from "@theme/store";

export default function GlobalThemeProvider({ children }: React.PropsWithChildren<unknown>) {
  const [theme, setTheme] = React.useState(LIGHT);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Container className={getTheme(theme)}>{children}</Container>
    </ThemeContext.Provider>
  );
}

const Container = styled.div`
  @import "https://fonts.googleapis.com/css2?family=Inter&display=swap";
  @import "https://fonts.googleapis.com/earlyaccess/notosanskr.css";

  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  // Theme Transitions
  & * {
    transition: color 100ms, background-color 100ms;
  }

  :global() {
    html {
      box-sizing: border-box;
      font-family: Inter, "Noto Sans KR", sans-serif;
    }

    body {
      margin: 0;
      padding: 0;
    }

    *,
    *::before,
    *::after {
      box-sizing: inherit;
    }
  }
`;
