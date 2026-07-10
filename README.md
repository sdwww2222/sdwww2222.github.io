# 乔锦阳个人介绍网站

这是一个纯静态个人介绍网站，可以直接打开 `index.html` 预览，也可以部署到 GitHub Pages、Vercel、Netlify 等静态托管平台。

## 本地预览

直接双击 `index.html` 即可打开。

如果想用本地服务预览，也可以在当前目录运行：

```powershell
python -m http.server 8080
```

然后访问 `http://localhost:8080`。

## 修改个人信息

- 页面内容：修改 `index.html`
- 视觉样式：修改 `styles.css`
- 首屏背景图：替换 `assets/hero-workspace.png`
- 邮箱和社交链接：修改 `index.html` 里 `#contact` 区域的链接

## 部署到 GitHub Pages

1. 在 GitHub 新建一个仓库，例如 `personal-site`。
2. 把本目录里的文件提交并推送到仓库。
3. 打开仓库的 `Settings`。
4. 进入 `Pages`。
5. `Build and deployment` 选择 `Deploy from a branch`。
6. `Branch` 选择 `main` 和 `/root`，保存。
7. 等待 GitHub 生成网址，通常是 `https://你的用户名.github.io/personal-site/`。

## 部署到 Vercel

1. 登录 https://vercel.com。
2. 导入这个 GitHub 仓库。
3. Framework Preset 选择 `Other`。
4. Build Command 留空。
5. Output Directory 留空或填 `.`。
6. 点击 Deploy。

## 部署到 Netlify

1. 登录 https://www.netlify.com。
2. 选择 Add new site。
3. 导入这个 GitHub 仓库，或者直接拖拽整个文件夹。
4. Build command 留空。
5. Publish directory 填 `.`。
6. 点击 Deploy。
