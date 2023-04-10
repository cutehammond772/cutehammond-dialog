import { css } from "@linaria/core";

type UUID = `${string}-${string}-${string}-${string}-${string}`;
export type ThemeID = `THEME_${UUID}`;

interface Themes {
  [id: ThemeID]: ReturnType<typeof css>;
}

const themes: Themes = {};

const registerTheme = (className: ReturnType<typeof css>) => {
  const id: ThemeID = `THEME_${crypto.randomUUID()}`;
  themes[id] = className;

  return id;
};

const getTheme = (id: ThemeID) => themes[id];

export { registerTheme, getTheme };
