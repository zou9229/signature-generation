# SEO配置文件说明

## 文件位置

- `public/robots.txt` - 搜索引擎爬虫规则文件
- `public/sitemap.xml` - 网站地图文件
- `index.html` - 已包含sitemap引用

## 重要：部署前必须修改

### 1. 更新域名URL

在以下文件中，将所有 `https://signature-generation.com/` 替换为你的实际域名：

- `public/robots.txt` (第11行)
- `public/sitemap.xml` (第6行)
- `index.html` (第18行和其他meta标签)

### 2. 更新sitemap日期

每次部署后，更新 `public/sitemap.xml` 中的 `<lastmod>` 日期为当前日期（格式：YYYY-MM-DD）

或者运行更新脚本：
```bash
node scripts/update-sitemap.js
```

## robots.txt 说明

当前配置：
- ✅ 允许所有搜索引擎和AI爬虫访问
- ✅ 包含Google、Bing、Yahoo等主流搜索引擎
- ✅ 包含AI模型爬虫（GPTBot、Claude等）
- ✅ 指向sitemap位置

## sitemap.xml 说明

当前包含：
- 主页URL（优先级1.0）
- 更新频率：weekly（每周）
- 最后修改日期：需要定期更新

## 验证配置

部署后，访问以下URL验证：
- `https://yourdomain.com/robots.txt`
- `https://yourdomain.com/sitemap.xml`

## 提交到搜索引擎

### Google Search Console
1. 登录 [Google Search Console](https://search.google.com/search-console)
2. 添加属性（你的域名）
3. 提交sitemap：`https://yourdomain.com/sitemap.xml`

### Bing Webmaster Tools
1. 登录 [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. 添加网站
3. 提交sitemap：`https://yourdomain.com/sitemap.xml`

## AI模型爬虫支持

robots.txt已配置支持以下AI爬虫：
- GPTBot (ChatGPT)
- ChatGPT-User
- CCBot (Common Crawl)
- anthropic-ai (Claude)
- Claude-Web

这些配置有助于AI模型在训练和检索时发现你的网站内容。

