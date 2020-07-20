# meeko

## meeko 前端支持

#### rollup 转换

> cnpm i -g rollup
> rollup -c
> rollup.config.js 如下:

```javascript
import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'
import resolve from 'rollup-plugin-node-resolve'
import polyfills from 'rollup-plugin-node-polyfills'
import builtins from 'rollup-plugin-node-builtins'

export default {
  input: 'index.js',
  output: {
    file: 'out.js',
    format: 'iife',
    name: 'meeko' //,
    // globals: ['perf_hooks', 'crypto', 'fs', 'path']
  },
  external: ['perf_hooks', 'Buffer', 'process'],
  plugins: [
    json(),
    polyfills(),
    resolve({
      browser: true
    }),
    commonjs(),
    builtins()
  ]
}
```

#### html 基本用法，使用 iife 转换

```html
<html>
  <head>
    <style></style>
  </head>
  <body>
    <script>
      /**
       * 去除一些nodejs内部依赖，其他靠rollup处理
       */
      var perf_hooks = {}
      var process = { platform: '' }
      var Buffer = function () {}
      Buffer.from = function () {}
      Buffer.contact = function () {}
    </script>
    <script src="out.js">
      console.log(meeko)
    </script>
  </body>
</html>
```
