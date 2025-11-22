# 环境变量说明

## 当前项目环境变量需求

**✅ 无需配置环境变量**

这是一个纯前端静态网站，所有配置都已硬编码在文件中：
- 域名已配置在 `index.html`、`robots.txt`、`sitemap.xml`
- 无需 API 密钥
- 无需数据库连接
- 无需后端服务

## 如果将来需要环境变量

如果未来需要添加环境变量（例如 API 集成），请遵循以下步骤：

### 1. 在 Vercel 中配置

1. 进入 Vercel 项目设置
2. 点击 "Environment Variables"
3. 添加变量（使用 `VITE_` 前缀）

### 2. 在代码中使用

```typescript
// 访问环境变量
const apiUrl = import.meta.env.VITE_API_URL
```

### 3. 本地开发

创建 `.env.local` 文件（已添加到 .gitignore）：

```env
VITE_API_URL=https://api.example.com
```

## 当前配置状态

- ✅ 域名: `signature-generation.top`（已硬编码）
- ✅ 所有 SEO 标签已配置
- ✅ robots.txt 和 sitemap.xml 已配置
- ✅ 无需环境变量

