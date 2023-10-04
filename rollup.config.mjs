import typescript from "rollup-plugin-ts";
import copy from "rollup-plugin-copy";
import terser from "@rollup/plugin-terser";

export default {
  input: "src/script/index.ts",
  output: [
    {
      dir: "./dist/script",
      format: "cjs",
    },
  ],
  plugins: [
    typescript(),
    copy({
      targets: [
        { src: "src/**.html", dest: "dist" },
        { src: "src/assets/*", dest: "dist/assets" },
        { src: "src/manifest.json", dest: "dist" },
      ],
    }),
    terser(),
  ],
};