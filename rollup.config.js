import babel from "@rollup/plugin-babel";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import peerDeepsExternal from "rollup-plugin-peer-deps-external";
import json from "@rollup/plugin-json";
import terser from "@rollup/plugin-terser";
import typescript from "rollup-plugin-typescript2";

process.env.BABEL_ENV = "production";

// 빌드 시 빌드 대상이 되는 파일의 확장자입니다.
const EXTENSIONS = [".ts", ".tsx"];

// 빌드 옵션을 나타냅니다.
const ESM_OPTION = { type: "esm", dir: "esm", extension: "js" };
const CJS_OPTION = { type: "cjs", dir: "cjs", extension: "cjs" };

const bundle = ({ option }) => ({
  input: "./src/index.ts",
  exports: "named",
  output: [
    {
      file: `./dist/${option.dir}/index.${option.extension}`,
      format: option.type,
    },
  ],
  plugins: [
    peerDeepsExternal(),
    nodeResolve({ EXTENSIONS }),
    commonjs(),
    typescript(),
    json(),
    babel({
      babelrcRoots: "../../",
      babelHelpers: "bundled",
      include: `./src/**/*.(${EXTENSIONS.join("|")})`,
    }),
    terser({ format: { comments: false } }),
  ],
});

export const createBundler = () => ({
  bundleESM: () => bundle({ option: ESM_OPTION }),
  bundleCJS: () => bundle({ option: CJS_OPTION }),
});
