# crp cli
> 前端技术生态建设：工程化

## Feature
* 初始化项目
* 集成：编译、开发服务
*
## Usage

pnpm

```
npm install @crpjs/cli --registry=https://npm.crpjs.com
```

如果要使用全局 `crp` 命令，需要在安装时安装到全局，即:

```sh
# pnpm 全局
npm set registry https://npm.crpjs.com
pnpm add -g @crpjs/cli
```

## 使用

- `crp` `<command>` `<options>`


## Command

- `create` `<project-name>`
  创建项目
- `init`
  初始化配置文件
- `run -e <env> -m <mode>`
  启动/打包项目
  > env: `[dev, test, pre, prod]`
  > mode: `[start, build]`

## demo
创建项目：

```js
crp create myapp
```

## 项目模板
- spa   参考文档：敬请期待


## Done
- 动态修改脚手架的仓库地址和分支
- 初始化后 git 仓库地址修改
- 通过命令行初始化模版「spa」
- 项目创建成功后初始化依赖
- 开发服务：devServer
- 项目编译：webpack 支持ts
- 增加 crp.config.js

## TODO
- 集成通知
- 支持动态配置webpack


## 问题与建议 or 参与开发
- me@shudong.wang

## LICENSE

@crpjs/cli is open source software [licensed as MIT]()).
