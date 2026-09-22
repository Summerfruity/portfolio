# 夏果的图形学作品集

一个面向研究生申请与求职展示的中英双语个人网站。页面采用克制的像素终端风格，首页直接展示个人方向和三个真实项目：

- [CUDA Flocking](https://github.com/Summerfruity/CUDA-Flocking)
- [Stream Compaction](https://github.com/Summerfruity/Stream-Compaction)
- [CUDA Path Tracer](https://github.com/Summerfruity/CUDA-Path-Tracer)

项目说明和性能数字来自 `E:\Projects\cis5650` 下对应本地仓库的 README 与已有结果，没有使用示例项目替代真实经历。

## 本地运行

```bash
npm install
npm run dev
```

生产构建与本地预览：

```bash
npm run build
npm run preview
```

构建产物位于 `dist/`。

## 修改内容

个人资料与项目文字集中在 [`src/data/portfolio.ts`](src/data/portfolio.ts)。每个双语字段包含 `zh` 和 `en`，页面右上角可以切换语言。

项目封面位于 `public/projects/`：

- `cuda-flocking.jpg`：从本地 Flocking 运行录屏提取并压缩；
- `stream-compaction.svg`：根据项目的 map-scan-scatter 流程绘制；
- `cuda-path-tracer.jpg`：来自本地 Path Tracer 的 Damaged Helmet 渲染结果。

若要添加简历，将 PDF 放到 `public/resume.pdf`，并在 `profile.resumeUrl` 中填写 `/resume.pdf`；导航会自动显示 `CV` 链接。邮箱字段当前留空，补充真实邮箱前页面不会显示虚构联系方式。

## 发布

Vercel 或 Netlify 可直接使用：

- Build command: `npm run build`
- Output directory: `dist`

项目使用 `import.meta.env.BASE_URL` 处理本地图片路径，可兼容子目录部署。部署到 GitHub Pages 的仓库子路径时，还需将 `vite.config.ts` 的 `base` 改为对应仓库名，例如 `/my_web/`。
