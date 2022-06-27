import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";
import path from "path";
import pkg from "../package.json";

export default {
  input: path.resolve(__dirname, "../src/index.ts"),
  output: [
    {
      file: pkg.main,
      format: "cjs",
    },
    {
      file: pkg.module,
      format: "esm",
    },
    {
      file: pkg.browser,
      format: "umd",
      name: "CsxUtils",
    },
  ],
  plugins: [
    json(),
    nodeResolve(),
    commonjs(),
    typescript(),
    babel({
      babelHelpers: "bundled",
      exclude: "node_modules/**",
    }),
  ],
};
