# 网易云音乐热门评论展示器

## 简介

这是一个 Chrome 扩展，用于在任何网页上展示热门的网易云音乐评论。当用户点击扩展图标时，会在页面中心显示一个随机的热门评论。

## 功能

- 点击扩展图标，在当前页面中心显示一条随机的网易云音乐热门评论
- 评论会在 5 秒后自动消失
- 当鼠标悬停在评论上时，评论不会消失
- 当鼠标移开评论后，评论马上会消失

## 安装

1. 下载此仓库的 ZIP 文件或克隆仓库到本地
2. 打开 Chrome 浏览器，进入 `chrome://extensions/`
3. 开启右上角的"开发者模式"
4. 点击"加载已解压的扩展程序"
5. 选择包含扩展文件的文件夹

## 使用方法

1. 在 Chrome 浏览器中打开任意网页
2. 点击工具栏中的扩展图标
3. 观看出现在页面中心的网易云音乐评论
4. 如果想让评论停留更长时间，将鼠标悬停在评论上

## 文件结构

- `manifest.json`: 扩展的配置文件
- `background.js`: 扩展的背景脚本，处理主要逻辑
- `api.json`: API 配置文件

## 技术细节

- 使用 Chrome 扩展 Manifest V3
- 使用 `fetch` API 获取评论数据
- 使用 Chrome 消息传递机制在背景脚本和内容脚本之间通信

## 贡献

欢迎提交 Issues 和 Pull Requests 来改进这个扩展。

## 许可证

[MIT License](LICENSE)
