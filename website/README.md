# ProcessPrefBench 主页

记录时间：2026-10-09

手机优先的静态研究主页，集中提供 Paper、Code、Product、Contact。内容在 `index.html`，样式在 `styles.css`；只有复制邮箱使用 `main.js`，关闭 JavaScript 仍可阅读和访问全部入口。

## 本地预览

在仓库根目录运行 `python3 -m http.server 8874 --directory website`，打开 `http://localhost:8874`。

## 更新内容

- 改文案或链接：编辑 `index.html`。
- 替换论文：更新 `paper.pdf`，保持文件名不变；同步核对文案、指标与引用。
- 产品入口：当前为 `https://get-margin.vercel.app`。
- 代码发布状态：以仓库根目录 `RELEASE_STATUS.md` 为准，同步修改页面提示。
- 以后增加 Poster、Slides、案例分析、演示时，只发布已确认可公开的版本。
- 二维码编码固定正式网址；只更新网页不需要重新生成二维码。不要把临时预览地址用于印刷。

## 部署

Vercel 项目名 `processprefbench`，只上传此目录。先在此目录 `vercel link --project processprefbench --yes`，再 `vercel --prod --yes`。`.vercel/` 是本地关联配置，不提交。正式域名和当次部署验证见 `../docs/2026-10-09-homepage-release.md`。

- 正式网址：`https://processprefbench.vercel.app`
- 短网址：`https://ppbench.vercel.app`
- 两个域名均绑定同一项目，自动跟随最新正式部署。
- `assets/qr/processprefbench-qr.svg` / `.png` 编码短网址，M 级纠错、四模块留白；PNG 为 528 × 528。
- 当前是 CLI 发布流程，尚未配置 GitHub 自动部署。更新代码并提交/推送后，在此目录运行部署命令。

## 适用范围

本页不收集表单、无后端、无分析追踪，全部资源链接可直接访问。论文来自作者确认的 camera-ready 版本；未将其误标成已有 ACL Anthology 或 arXiv 记录。公开仓库、产品和出版元数据状态可能随发布变化，更新时需重新核对。手机浏览器通过不等于实体印刷二维码通过。
