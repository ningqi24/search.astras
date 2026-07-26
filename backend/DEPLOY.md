# 后端部署指南

## 环境要求

- Node.js >= 18.0.0
- 或 Docker + Docker Compose

## 快速开始

### 方式一：本地开发

```bash
cd backend
npm install
cp .env.example .env
# 编辑 .env 填入你的 API Key
npm run dev
```

### 方式二：Docker 部署

```bash
cd backend
cp .env.example .env
# 编辑 .env 填入你的 API Key
docker-compose up -d
```

### 方式三：生产环境（推荐）

1. **使用 PM2 管理 Node 进程**

```bash
npm install -g pm2
npm install --production
cp .env.example .env
# 编辑 .env
pm2 start server.js --name "astras-backend"
pm2 save
pm2 startup
```

2. **配置 Nginx 反向代理**

```nginx
server {
    listen 80;
    server_name api.search.astras.example;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

## 获取 API Key

### Google Custom Search API

1. 访问 [Google Cloud Console](https://console.cloud.google.com/)
2. 创建项目 → 启用 "Custom Search API"
3. 创建 API Key
4. 访问 [Programmable Search Engine](https://programmablesearchengine.google.com/)
5. 创建搜索引擎，记录 Search Engine ID (cx)

### Bing Web Search API

1. 访问 [Azure Portal](https://portal.azure.com/)
2. 创建 "Bing Search v7" 资源
3. 在密钥管理中获取 API Key

## 安全注意事项

- ⚠️ **永远不要将 .env 文件提交到 Git**
- 生产环境使用 HTTPS
- 定期轮换 API Key
- 监控 API 使用量，防止被盗刷
- 使用防火墙限制直接访问后端端口

## API 端点

| 端点 | 方法 | 描述 | 参数 |
|------|------|------|------|
| `/api/health` | GET | 健康检查 | - |
| `/api/suggest` | GET | 搜索建议 | `q` |
| `/api/search` | GET | 聚合搜索 | `q`, `engine`, `page` |
| `/api/stats` | GET | 匿名统计 | - |
