# Astras Search 后端服务 Docker 镜像
FROM node:20-alpine

# 安装安全更新
RUN apk add --no-cache dumb-init

WORKDIR /app

# 先复制依赖文件，利用 Docker 缓存层
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# 复制应用代码
COPY server.js ./

# 创建非 root 用户运行服务
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001
USER nodejs

# 暴露端口
EXPOSE 3000

# 健康检查
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => r.statusCode === 200 ? process.exit(0) : process.exit(1))"

# 使用 dumb-init 处理信号
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "server.js"]
