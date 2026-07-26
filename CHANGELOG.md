# 更新日志

所有 notable 更改都将记录在此文件中。

格式基于 [Keep a Changelog](https://keepachangelog.com/)，版本号遵循 [Semantic Versioning](https://semver.org/)。

## [2.0.0] - 2026-07-26

### 新增

- 🔒 **隐私政策页面** (`privacy.html`)：详细说明数据收集政策
- ⚖️ **免责声明页面** (`terms.html`)：明确法律责任边界
- 🖥️ **后端代理服务**：Node.js + Express，保护 API Key
- 🌙 **深色模式**：支持亮色/深色主题切换
- ⌨️ **键盘导航**：`↑↓` 选择建议，`Esc` 关闭
- 📱 **响应式设计**：移动端适配优化
- 🔍 **搜索建议**：支持后端代理获取实时建议
- 🐳 **Docker 支持**：提供 Dockerfile 和 docker-compose.yml
- 📄 **完整文档**：README、DEPLOY、CONTRIBUTING、SECURITY

### 改进

- 重构 CSS 使用 CSS 变量，支持主题切换
- 添加后端状态检测指示器
- 优化搜索框交互体验
- 增加输入防抖，减少请求频率

### 安全

- 后端添加速率限制（100 请求/15分钟/IP）
- 添加 Helmet 安全中间件
- 配置 CSP 内容安全策略
- API Key 不再暴露在前端

## [1.0.0] - 2026-07-25

### 新增

- 基础搜索聚合功能
- 支持 8 个搜索引擎
- 极简 UI 设计
- GitHub Pages 部署
