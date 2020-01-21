<div align="center">
  <h1>
    明日方舟立绘反混淆
  </h1>

  <p>
    <strong>使用nodejs的sharp库反混淆明日方舟立绘</strong>
    <a href="https://daidr.me/archives/code-578.html" target="_blank">博客文章</a>
  </p>
</div>
<div align="center">
  <a href="https://github.com/daidr/ark_decoder.git">
    <img src="https://daidr.me/wp-content/uploads/2020/01/%E6%98%8E%E6%97%A5%E6%96%B9%E8%88%9F%E4%BA%BA%E7%89%A9%E7%AB%8B%E7%BB%98%E5%8F%8D%E6%B7%B7%E6%B7%86.png" alt="ArkNights Decoder">
  </a>
</div>

## 直接下载

提供已经反混淆的全套立绘图片，前往[release](https://github.com/daidr/ark_decoder/releases "Release")下载（可以忽略下面步骤）

## 环境要求

1. nodejs运行环境
2. 磁盘剩余容量 > 1.5G

## 开始使用

1. 克隆仓库 `git clone https://github.com/daidr/ark_decoder.git`
2. 初始化立绘子模块 `git submodule init`
3. 更新立绘子模块 `git submodule update`
4. 执行 `yarn install`（推荐） 或 `npm i` （取决于你所使用的包管理器）
5. 执行 `yarn all`（推荐） 或 `npm run all` （取决于你所使用的包管理器）

## 更新立绘

立绘与代码储存在不同的仓库中，立绘更新后，你可以通过 `git submodule update` 将最新立绘同步到代码仓库中，然后运行 `yarn all` 进行反混淆

## 分步执行

> 注意：在执行decode步骤前，需要保证Backup步骤至少被执行过一次。

### 使用 yarn 作为包管理器时

- `yarn all` 执行下面的全部步骤
- `yarn backup` 用于将原始立绘迁移至Texture_After目录下
- `yarn decode` 用于将Texture_After目录下的立绘反混淆，并保存到Texture_Final目录

### 使用 npm 作为包管理器时

- `npm run all` 执行下面的全部步骤
- `npm run backup` 用于将原始立绘迁移至Texture_After目录下
- `npm run decode` 用于将Texture_After目录下的立绘反混淆，并保存到Texture_Final目录

-----------

[戴兜的小屋](http://im.daidr.me)

最后更新时间： 2020.01.21
