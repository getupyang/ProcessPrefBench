# 2026-10-09 · ProcessPrefBench 手机优先主页

- 记录时间：2026-10-09（Asia/Seoul）。
- 分支：`codex/processprefbench-homepage`。
- 关联 commit：本记录随主页首版提交，确切 SHA 见后续验证记录及 Git 历史。
- 文件：`website/` 静态页面、最终论文 PDF、二维码、维护说明；`scripts/check_website.cjs` 浏览器验收；根 `.gitignore` 排除部署配置。
- 行为：手机首屏提供 Paper、Code、Product、Contact 四入口；可直接读论文、访问公开仓库、了解 Margin、发邮件或复制邮箱；关闭 JavaScript 仍可阅读和访问链接。
- 为什么改：海报单一二维码需要固定入口，允许持续更新资源而无需重印。
- 正式网址：`https://processprefbench.vercel.app`；短网址：`https://ppbench.vercel.app`。两个域名绑定同一 Vercel 项目，自动跟随正式部署。
- 发布方式：从 `website/` 执行 `vercel --prod --yes`；仅发布公开静态文件。GitHub 自动部署暂未配置，不把 push 等同于网站更新。
- 已验证：`node --check website/main.js`、`python3 scripts/validate_release.py`、`git diff --check`；`node scripts/check_website.cjs` 在本地和正式网址检查 320/375/390/430/768/1280 宽度、无横向溢出、手机四入口首屏可见、入口至少 44px、导航、邮箱复制、引用展开、论文下载和无 JS 回退。人工查看手机首屏和桌面长图。
- 网络路径：首次用 Playwright API request 获取线上 PDF 超时，改用真实浏览器 fetch 后完整下载 615119 字节。单独 curl 下载发生中途超时，不将部分下载算作通过；最终哈希由浏览器完整下载后核对。
- 验收方法：手机访问短网址，点 Read the paper；返回点 Explore the code；Meet Margin / Let's talk 可跳至对应区块；邮箱可点击或复制。
- 二维码：`website/assets/qr/processprefbench-qr.svg` 和 `.png` 指向短网址；原海报占位框保留，未改原海报。
- 回归范围：静态网站 smoke + 页面针对性验收；不涉及研究评测算法、产品后端、数据库或插件，未运行这些组件的全量回归。
- 范围与过时风险：公开仓库目前为 artifact pre-release，页面不承诺已有完整评测代码或数据；产品状态、出版元数据、域名及部署流程可能随实现变化。纸张上的扫码和实际会议网络需独立打样，软件验收不能替代。
- 隐私：只使用论文已公开的作者信息、邮箱、已授权公开论文及合成解释场景。没有发布真实原始对话、内部评测数据、私有路径、连接器配置或认证信息。
