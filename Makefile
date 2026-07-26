# Astras Search 便捷命令

.PHONY: help install dev test build docker clean

help: ## 显示帮助信息
	@echo "Astras Search 可用命令:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'

install: ## 安装所有依赖
	@echo "安装前端测试依赖..."
	npm install
	@echo "安装后端依赖..."
	cd backend && npm install

dev: ## 启动开发环境（需同时运行前端服务器和后端）
	@echo "启动后端服务..."
	cd backend && npm run dev &
	@echo "启动前端服务器..."
	npm run serve

test: ## 运行所有测试
	@echo "运行后端测试..."
	cd backend && npm test
	@echo "运行前端测试..."
	npm test

lint: ## 运行代码检查
	cd backend && npm run lint

build: ## 构建 Docker 镜像
	cd backend && docker build -t astras-search:latest .

docker-up: ## 使用 Docker Compose 启动
	cd backend && docker-compose up -d

docker-down: ## 停止 Docker Compose
	cd backend && docker-compose down

clean: ## 清理构建产物
	@echo "清理 node_modules..."
	rm -rf node_modules backend/node_modules
	@echo "清理测试报告..."
	rm -rf coverage playwright-report
	@echo "清理完成"

# 部署命令
deploy-pages: ## 部署到 GitHub Pages（需配置 gh-pages 分支）
	@echo "GitHub Pages 会自动部署 main 分支"
	@echo "请确保 .github/workflows/ci.yml 已配置"

deploy-server: ## 部署到服务器（需配置 SSH）
	@echo "请手动执行以下步骤:"
	@echo "1. 复制文件到服务器"
	@echo "2. 安装依赖: make install"
	@echo "3. 配置 .env 文件"
	@echo "4. 启动服务: make docker-up 或 cd backend && npm start"
