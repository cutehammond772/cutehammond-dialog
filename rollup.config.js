import babel from "@rollup/plugin-babel";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import peerDeepsExternal from "rollup-plugin-peer-deps-external";
import json from "@rollup/plugin-json";
import terser from "@rollup/plugin-terser";
import typescript from "rollup-plugin-typescript2";
import dts from "rollup-plugin-dts";
import ttypescript from "ttypescript";

process.env.BABEL_ENV = "production";

// 빌드 시 빌드 대상이 되는 파일의 확장자입니다.
const EXTENSIONS = [".js", ".jsx", ".ts", ".tsx"];

// 빌드 옵션을 나타냅니다.
const ESM_OPTION = { type: "esm", extension: "js", decl: "ts" };
const CJS_OPTION = { type: "cjs", extension: "cjs", decl: "cts" };

const bundleDecl = ({ option }) => ({
  input: "./src/index.ts",
  output: [
    {
      file: `./types/index.d.${option.decl}`,
      format: option.type,
    },
  ],
  plugins: [dts({ tsconfig: `./tsconfig.${option.type}.json` })],
});

const bundleJS = ({ option }) => ({
  input: "./src/index.ts",
  output: [
    {
      file: `./dist/${option.type}/index.${option.extension}`,
      format: option.type,
    },
  ],
  plugins: [
    peerDeepsExternal(),
    nodeResolve({ extensions: EXTENSIONS }),
    commonjs(),
    // Rollup은 모듈을 기반으로 빌드하므로 module: NodeNext 옵션을 사용할 수 없다.
    typescript({ typescript: ttypescript }),
    json(),
    babel({
      exclude: "node_modules",
      configFile: "../../babel.config.json",
      babelHelpers: "bundled",
      extensions: EXTENSIONS,
    }),
    terser({ format: { comments: false } }),
  ],
});

export default [
  bundleJS({ option: ESM_OPTION }),
  bundleJS({ option: CJS_OPTION }),
  bundleDecl({ option: ESM_OPTION }),
  bundleDecl({ option: CJS_OPTION }),
];
