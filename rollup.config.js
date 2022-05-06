import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
// import globals from 'rollup-plugin-node-globals'
import builtins from 'rollup-plugin-node-builtins'
export default {
  input: 'index.js',
  output: {
    file: 'index.mjs',
    format: 'esm'
  },
  plugins: [commonjs(), json(), builtins()]
}
