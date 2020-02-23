## 1.8.60 (2020-02-23)


### :arrow_up:

* Bump handlebars from 4.2.0 to 4.5.3 ([00d0495](https://github.com/kongnet/meeko/commit/00d049573bcd92e69be6c413b5fbf89080513103))

### :art:

* toMoney add default param ([d409aa7](https://github.com/kongnet/meeko/commit/d409aa7e5dfa00f11d021bdfc69888733e5559ab))
* 修改buf方法名称 ([afe0197](https://github.com/kongnet/meeko/commit/afe019702209d08a8c5ae84bacc3e1f80457ee3a))
* 增加代码复杂度检测配置 ([50cebad](https://github.com/kongnet/meeko/commit/50cebad3c0d69b6b3096adba6fdbc3652cd2797f))
* 增加众数及单元测试 ([5bbc053](https://github.com/kongnet/meeko/commit/5bbc0531735e1696b33a045d6d8d7662f85c44a7))

### :bug:

* (repeat n不能小于0) ([2b89355](https://github.com/kongnet/meeko/commit/2b89355684e5a620332706e404cb9715b0c6eb43))
* drawTable彩色文字输出不正常 ([85bb4ee](https://github.com/kongnet/meeko/commit/85bb4ee6c6106ffae20b3c71db51286d55e84b49))
* mock函数中参数传递不正确 ([cefd94c](https://github.com/kongnet/meeko/commit/cefd94cb3173d43e4814dc7bab7c15eeb20d39e8))
* 修改颜色输出函数 ([76ba777](https://github.com/kongnet/meeko/commit/76ba777e0a6d6ee257ae2ca286aa430d475ed9a5))
* 修正+- => - ([d7759a6](https://github.com/kongnet/meeko/commit/d7759a6989093d70ea8a23c52b41e763814d5625))
* 几个安全写法修复 ([e0c98fe](https://github.com/kongnet/meeko/commit/e0c98fe5687b7471454654472a958268a7579e27))
* 多次运行原型扩展 ([442502b](https://github.com/kongnet/meeko/commit/442502b9ea0d330e31fd6628527cd718a56d9b0c))
* 颜色调整 ([9f8be3b](https://github.com/kongnet/meeko/commit/9f8be3b6ad12c7d5bb606211402cf7511717f3ab))

### :fire:

* 增加运营判断的手机号码，增加mocha 自动反复运行模式 ([1421b45](https://github.com/kongnet/meeko/commit/1421b458836e89aba7e60647dfffc9923de20615))

### :memo:

* package.json ([279001b](https://github.com/kongnet/meeko/commit/279001b9d79eafc00121911e6045a78692849494))
* 增加changelog scripts ([76ce120](https://github.com/kongnet/meeko/commit/76ce1202a0381667c8c179232adeb347ce1defd9))
* 增加趣题 ([39abe88](https://github.com/kongnet/meeko/commit/39abe8887a9f9353c54c8de4b2b030049b43828a))
* 增强文档注释 ([731e22b](https://github.com/kongnet/meeko/commit/731e22bb2c93da8494c2b3744f9a2a7294502f72))

### :sparkles:

* (增加闰年判断，修正第几周函数) ([8ed3e0f](https://github.com/kongnet/meeko/commit/8ed3e0fca10a8844851c2d5caf75e2003727af69))
* checkparam增加file类型判断 ([90e28df](https://github.com/kongnet/meeko/commit/90e28df8a41b66f4340b1c1f1ea7f4c094c8ab61))
* checkparam的file类型增加长度和类型判断 ([25aaa13](https://github.com/kongnet/meeko/commit/25aaa138ff5130d0d21e0821b681307e878a1b38))
* mock增加tools中的genUUID ([2ef7418](https://github.com/kongnet/meeko/commit/2ef74182b0edb2dcb49f00f0e7de16738df0d6d8))
* obj2Url ([73c3b46](https://github.com/kongnet/meeko/commit/73c3b46cc442d5d8f7466ddf688ab89c414c5d45))
* quantile函数和excel的QUARTILE.INC，QUARTILE.EXC统一 ([fca1d25](https://github.com/kongnet/meeko/commit/fca1d25e18bda0015f60fab0148a1325adda310f))
* README增加趣题 ([f08fe41](https://github.com/kongnet/meeko/commit/f08fe4165c45c14b8cb450d8cc5ac305c67841af))
* string原型增加toDate方法 ([596fd89](https://github.com/kongnet/meeko/commit/596fd89996cfd68fac7df81674f3531ff7535d6d))
* 增减高斯消元法，优化csv2arr函数 ([a24e4e2](https://github.com/kongnet/meeko/commit/a24e4e26937cc18aef693368e5a7390495eb9a2a))
* 增加$.tools.equals比较对象相等,$.tools.size获取对象长度 ([140ed1b](https://github.com/kongnet/meeko/commit/140ed1bc737c2baf75eb190bf0f56f55deac131f))
* 增加4分位数 ([3969376](https://github.com/kongnet/meeko/commit/39693762d9b9e2382dd1dc57a9b0adba6f56dcb7))
* 增加buffer $.buf.split $.buf.join方法 ([38bb564](https://github.com/kongnet/meeko/commit/38bb564f21a94248c96148e0b53c6b3b4ede14b4))
* 增加gcd lcm 因式分解函数 ([c6782b3](https://github.com/kongnet/meeko/commit/c6782b31ce6f294c3a70313e5b460c35f43a2cce))
* 增加genList函数，增加README.md一个例子 ([2e712d5](https://github.com/kongnet/meeko/commit/2e712d542fe4b126325444c367bfc086ad52db99))
* 增加k最大和k最小函数 ([d1866cb](https://github.com/kongnet/meeko/commit/d1866cb9717e917188d8285d019920e3c51a1ee0))
* 增加mock占位符 ([8c7749e](https://github.com/kongnet/meeko/commit/8c7749e8603dcfefb1dc7b46842f3b1998f70653))
* 增加二维码生成 ([e29dab1](https://github.com/kongnet/meeko/commit/e29dab1099c50b7f9668d322b179064cfc77b628))
* 增加唯美短语，增加多种分布函数 ([4d40e8a](https://github.com/kongnet/meeko/commit/4d40e8ac4febe578815625773ee767575b018533))
* 增加基础函数的benchmark ([dc7014f](https://github.com/kongnet/meeko/commit/dc7014f13c791f93e358f6bb474c189775e81e14))
* 增加多项式拟合方法 ([03ebf20](https://github.com/kongnet/meeko/commit/03ebf20bd5335c48330a3462b54480973545105a))
* 增加循环删除 ([84f8c01](https://github.com/kongnet/meeko/commit/84f8c01f1e071cabcd80113a45a0324f6baa5736))
* 增加数组分组功能，增加类csv格式toArray功能 ([1da5890](https://github.com/kongnet/meeko/commit/1da5890621c9c38b498779ee2fff31dc012a751d))
* 增加文件md5 图片文件判断 图片文件传完判断 ([0709704](https://github.com/kongnet/meeko/commit/070970486af371a3bbcd74921a6267c11577c91f))
* 增加文件md5检查 ([5d4a2e9](https://github.com/kongnet/meeko/commit/5d4a2e9102c3d1c9d30cc8194c0d39a00c48d220))
* 增加文字贝叶斯分类函数 ([1214fa8](https://github.com/kongnet/meeko/commit/1214fa8f9f2dc70f127f6e7ba5c22cf7e4e19c87))
* 增加斯皮尔曼相关系数函数 ([0331482](https://github.com/kongnet/meeko/commit/03314829c1b8ea67d4e29e44ab7fb95e2ff78074))
* 增加用字符串形式访问对象内部 ([4bff921](https://github.com/kongnet/meeko/commit/4bff921acbbe2529c80b21c839d2924a5f5673e7))
* 增加等待直到对象不为空函数 ([07f5c91](https://github.com/kongnet/meeko/commit/07f5c91dcc6f43fe354295fd1b65ce1bf055fe55))
* 增加肯德尔相关分析和斯皮尔曼相关分析函数 ([31dbd77](https://github.com/kongnet/meeko/commit/31dbd7746124715f6071b92b54dc5d97f5c5424e))
* 增加近似值函数 ([98a65a4](https://github.com/kongnet/meeko/commit/98a65a4a45ef5dbd26397b514946a0fa065bfcfe))
* 增加颜色类 ([94b78b9](https://github.com/kongnet/meeko/commit/94b78b949cc06bc084ade2cc6ba4491d8b01b274))
* 性能测试增加稳定百分比显示 ([eba8521](https://github.com/kongnet/meeko/commit/eba8521a454f8fbbacabcb52b6f6cda898b6ea0d))
* 让表格输出可返回输出的内容 ([defc14b](https://github.com/kongnet/meeko/commit/defc14b10aecf40d508a30ab52f383ef43d26eb0))
* 驼峰增加一个分割参数 ([56e5513](https://github.com/kongnet/meeko/commit/56e55135ac28caa55d22f0801a38428b0d5c7298))

### :truck:

* 数组原型函数count移动到math原型下 ([6b61220](https://github.com/kongnet/meeko/commit/6b61220aabb7023cb6a43dc05ddaf871af1d9c5f))
* 移动中位数函数到math原型下 ([8da9dc0](https://github.com/kongnet/meeko/commit/8da9dc076d37bdb4bdf45e4563bfdc7818604b98))

### :white_check_mark:

* 增加help 增加测试覆盖文档 ([a7a91c5](https://github.com/kongnet/meeko/commit/a7a91c5a69604abdfbfd91881f94154cb42f92ef))
* 增加字节美化函数，并测试覆盖 ([7d455f0](https://github.com/kongnet/meeko/commit/7d455f088c152141e571218e474e9ba580a2a163))
* 增加测试一共多少断言 ([a0a2512](https://github.com/kongnet/meeko/commit/a0a2512abc6c9796c4e0793ca5fcef3c4e1343c5))
* 增加测试用例 ([7c121ca](https://github.com/kongnet/meeko/commit/7c121ca437f6e5b8d162c7eade9f48ebe6bda390))
* 增加测试用例 ([52e06d2](https://github.com/kongnet/meeko/commit/52e06d2792f5d77eb17a3fc9c1037a739a4363ed))

### :wrench:

* (增加cz script) ([4f5a27d](https://github.com/kongnet/meeko/commit/4f5a27d6f3cb40f9e26f5677d7de0765947b24fe))
* 增加npm run test2 生成mochawesome-report ([dcfb1f1](https://github.com/kongnet/meeko/commit/dcfb1f14bd73504f1a2efcda9e3120b386334380))

### :zap:

* $.tools.rnd函数升级，更均匀的随机 ([4ff7105](https://github.com/kongnet/meeko/commit/4ff71051ce19f817c3e6499fc0f1742951bb36b8))
* enum入参trim一下 ([fb3e37b](https://github.com/kongnet/meeko/commit/fb3e37b7d19d5df58792c9aead22bd21f75f933c))



