# Astras Search v2

> ⚠️ **重要声明：本项目仅为个人学习实验项目，不可用于生产环境或商业用途。**

Astras Search 是一个极简风格的**搜索聚合入口**，允许用户通过一个统一的界面快速切换并搜索多个主流搜索引擎。

## 功能特性

- 🔍 **多引擎聚合**：支持 Google、Bing、百度、搜狗、360、神马、DuckDuckGo、Yandex
- 🌙 **深色模式**：支持亮色/深色主题切换，偏好自动保存
- ⌨️ **键盘快捷键**：`Ctrl+K` 聚焦搜索框，`↑↓` 选择建议，`Esc` 关闭
- 📱 **响应式设计**：适配桌面端和移动端
- 🔒 **隐私优先**：不收集、不存储任何用户数据，搜索请求直接由浏览器发送至目标搜索引擎
- 📄 **法律合规**：包含完整的隐私政策和免责声明页面
- 🖥️ **后端代理（可选）**：提供 Node.js 后端服务，保护 API Key 并提供搜索建议

## 项目架构

```
search.astras/
├── index.html          # 主页面（搜索界面）
├── privacy.html        # 隐私政策
├── terms.html          # 免责声明
├── favicon.ico         # 网站图标
├── CNAME               # 自定义域名配置
├── sitemap.xml         # 站点地图
├── LICENSE             # 许可证
├── README.md           # 项目文档
└── backend/            # 后端代理服务（可选）
    ├── server.js       # Express 服务主文件
    ├── package.json    # Node.js 依赖
    ├── Dockerfile      # Docker 镜像配置
    ├── docker-compose.yml
    ├── .env.example    # 环境变量模板
    ├── .gitignore
    └── DEPLOY.md       # 后端部署指南
```

## 两种运行模式

### 模式一：纯前端（默认）

无需后端，直接打开 `index.html` 即可使用。搜索请求由浏览器直接发送至第三方搜索引擎。

**适用场景**：个人使用、快速部署、无服务器环境

**部署方式**：

```bash
# GitHub Pages（推荐）
1. Fork 本仓库
2. Settings → Pages → Deploy from a branch → main
3. 访问 https://<your-username>.github.io/search.astras/
```

### 模式二：前端 + 后端代理

启动 Node.js 后端服务，前端自动检测并接入。后端提供：

- 🔐 **API Key 保护**：第三方搜索 API Key 不再暴露在前端
- 💡 **搜索建议**：通过后端代理获取 Google Suggest 等建议
- 🛡️ **速率限制**：防止 API 被滥用
- 📊 **匿名统计**：仅记录请求次数（不含个人数据）

**适用场景**：需要搜索建议、计划扩展功能、有服务器资源

**部署方式**：

```bash
cd backend
npm install
cp .env.example .env
# 编辑 .env 填入你的 API Key
npm start
```

详细后端部署指南请查看 [backend/DEPLOY.md](backend/DEPLOY.md)。

## 技术栈

| 层级 | 技术 | 说明 |
|------|------|------|
| 前端 | HTML5 + CSS3 + Vanilla JS | 无框架依赖，纯原生实现 |
| 后端（可选）| Node.js + Express | 代理服务，保护 API Key |
| 部署 | GitHub Pages / Docker | 静态托管或容器化部署 |

## 隐私说明

- **不收集数据**：不记录 IP、搜索词、Cookie 或个人身份信息
- **无后端服务（默认模式）**：所有搜索请求由浏览器直接发送至第三方搜索引擎
- **后端代理模式**：后端仅做请求转发，不存储搜索内容，API Key 安全存储于服务器环境变量
- **透明开源**：完整源代码托管于 GitHub，欢迎社区审查

详细隐私政策请查看 [privacy.html](privacy.html)。

## 法律声明

- 本项目**不生成、不索引、不存储**任何搜索内容
- 搜索结果由第三方搜索引擎提供，本项目不对其内容负责
- 禁止将本项目用于任何非法活动或商业用途

详细免责声明请查看 [terms.html](terms.html)。

## 安全建议

1. **API Key 保护**：如使用后端模式，务必将 `.env` 加入 `.gitignore`
2. **HTTPS 强制**：生产环境必须启用 HTTPS
3. **速率限制**：后端已内置 100 请求/15分钟/IP 的限制
4. **定期轮换**：定期更换第三方 API Key
5. **监控用量**：关注 API 使用量，防止异常消耗

## 改进路线图

| 优先级 | 内容 | 状态 |
|--------|------|------|
| P0 | 隐私政策与免责声明 | ✅ 已完成 |
| P0 | 后端代理服务（API Key 保护） | ✅ 已完成 |
| P1 | 深色模式与响应式设计 | ✅ 已完成 |
| P1 | 搜索建议与键盘导航 | ✅ 已完成 |
| P2 | 后端 Docker 部署 | ✅ 已完成 |
| P2 | 自建搜索索引 | 📝 远期目标 |
| P3 | 国际化支持 | 📝 规划中 |
| P3 | 搜索历史（本地存储） | 📝 规划中 |

## 开源协议

本项目采用 [MIT License](LICENSE) 开源。

## 联系方式

- 📧 邮箱：contact@astras-search.example（请替换为真实邮箱）
- 🐛 Issues：[GitHub Issues](https://github.com/ningqi24/search.astras/issues)

---

*本项目由 [ningqi24](https://github.com/ningqi24) 创建，仅供技术学习交流。*
