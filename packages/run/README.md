# `@crpjs/cli-run`

> 主要服务于 `@crpjs/cli`, 提供项目的构建打包功能

## Usage

```js
npm install @crpjs/cli-run  --registry=xxx
// 或
yarn add @crpjs/cli-run --registry=xxx

require("@crpjs/cli-run")({ env, mode }, options);
```

| 参数名    | 类型   | 说明                                   |
| --------- | ------ | -------------------------------------- |
| `env`     | String | 可选项有：`dev`, `test`, `pre`, `prod` |
| `mode`    | String | 可选项有：`start`, `build`             |
| `options` | String | commander.action 提供的 options        |
