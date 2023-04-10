import * as React from "react";

import { ThemeID } from "@theme/store";
import { LIGHT } from "@theme/templates";

export interface IThemeContext {
  theme: ThemeID;
  setTheme: React.Dispatch<ThemeID>;
}

// 기본 테마는 Light이다.
const DEFAULT_CONTEXT: IThemeContext = {
  theme: LIGHT,
  setTheme() {
    throw new Error("잘못된 접근입니다.");
  },
};

export const ThemeContext = React.createContext<IThemeContext>(DEFAULT_CONTEXT);
