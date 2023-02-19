import { nodeResolve } from "@rollup/plugin-node-resolve";
import copy from "rollup-plugin-copy";

module.exports = {
  input: "index.js",
  output: {
    dir: "dist",
  },
  treeshake: false,
  plugins: [
    copy({
      targets: [{ src: "index.html", dest: "dist" }, { src: "audio", dest: "dist" }, { src: "images", dest: "dist" }]
    }),
    nodeResolve(),
  ],
};