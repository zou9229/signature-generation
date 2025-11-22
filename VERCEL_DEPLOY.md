# Vercel 部署指南

## 域名配置
- **你的域名**: `signature-generation.top`
- 所有配置文件已更新为你的域名

## 部署步骤

### 1. 通过 Vercel CLI 部署

```bash
# 安装 Vercel CLI（如果还没有）
npm i -g vercel

# 登录 Vercel
vercel login

# 部署
vercel

# 生产环境部署
vercel --prod
```

### 2. 通过 GitHub 自动部署

1. 将代码推送到 GitHub 仓库
2. 访问 [Vercel Dashboard](https://vercel.com/dashboard)
3. 点击 "Add New Project"
4. 导入你的 GitHub 仓库
5. Vercel 会自动检测 Vite 项目并配置

### 3. 绑定自定义域名

1. 在 Vercel 项目设置中，进入 "Domains"
2. 添加 `signature-generation.top`
3. 按照提示配置 DNS 记录：
   - **A 记录**: `@` → Vercel 提供的 IP 地址
   - **CNAME 记录**: `www` → `cname.vercel-dns.com`
   - 或者使用 Vercel 推荐的 DNS 配置

## 环境变量

**当前项目不需要环境变量**，因为：
- 所有 URL 已硬编码在 HTML 文件中
- 这是一个纯前端应用，无需后端 API
- 所有配置都在构建时确定

如果将来需要添加环境变量：
1. 在 Vercel 项目设置中添加环境变量
2. 使用 `VITE_` 前缀（Vite 要求）
3. 在代码中使用 `import.meta.env.VITE_*` 访问

## 验证部署

部署成功后，访问以下 URL 验证：

- ✅ 主页: https://signature-generation.top/
- ✅ robots.txt: https://signature-generation.top/robots.txt
- ✅ sitemap.xml: https://signature-generation.top/sitemap.xml

## 提交到搜索引擎

### Google Search Console
1. 访问 https://search.google.com/search-console
2. 添加属性: `https://signature-generation.top`
3. 验证域名所有权
4. 提交 sitemap: `https://signature-generation.top/sitemap.xml`

### Bing Webmaster Tools
1. 访问 https://www.bing.com/webmasters
2. 添加网站: `https://signature-generation.top`
3. 验证所有权
4. 提交 sitemap: `https://signature-generation.top/sitemap.xml`

## 自动更新 Sitemap

每次部署后，建议更新 sitemap 日期：

```bash
node scripts/update-sitemap.js
git add public/sitemap.xml
git commit -m "Update sitemap date"
git push
```

或者可以在 Vercel 的构建命令中添加自动更新（可选）：

```json
{
  "buildCommand": "node scripts/update-sitemap.js && npm run build"
}
```

## 性能优化

Vercel 会自动：
- ✅ 启用 CDN 加速
- ✅ 自动 HTTPS
- ✅ 压缩静态资源
- ✅ 缓存优化

## 监控和分析

建议添加：
- Google Analytics（如果需要）
- Vercel Analytics（Vercel 内置）

## 故障排查

如果部署失败：
1. 检查 `vercel.json` 配置是否正确
2. 确认 `package.json` 中的构建脚本
3. 查看 Vercel 构建日志
4. 确保所有依赖都已安装

