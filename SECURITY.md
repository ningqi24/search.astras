# 安全政策

## 支持的版本

| 版本 | 支持状态 |
|------|----------|
| 2.x  | ✅  actively supported |
| 1.x  | ❌  no longer supported |

## 报告漏洞

如果您发现安全漏洞，请通过以下方式报告：

1. **GitHub Security Advisories**（推荐）：
   - 访问仓库 → Security → Advisories → New draft security advisory

2. **邮箱**：security@astras-search.example（请替换为真实邮箱）

**请勿**在公开的 Issue 或 Discussion 中报告安全漏洞。

## 响应时间

- 确认收到：48 小时内
- 初步评估：7 天内
- 修复发布：根据严重程度，30-90 天内

## 安全最佳实践

### 部署安全

- 始终使用 HTTPS
- 定期更新依赖（`npm audit`）
- 启用 CSP（Content Security Policy）
- 配置适当的 CORS 白名单

### API Key 安全

- 绝不将 API Key 提交到 Git
- 使用环境变量或密钥管理服务
- 定期轮换 API Key
- 监控异常使用量

### 用户数据

- 本项目承诺不收集用户个人数据
- 搜索日志（如有）仅保留 7 天
- 所有数据处理遵循最小必要原则
