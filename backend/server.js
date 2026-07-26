/**
 * Astras Search - 后端代理服务
 * 
 * 功能：
 * 1. 代理搜索请求，隐藏第三方 API Key
 * 2. 提供搜索建议 API（转发 Google Suggest）
 * 3. 记录匿名访问日志（仅用于统计，不含个人身份信息）
 * 
 * 部署方式：
 * - 本地开发：node server.js
 * - 生产环境：建议使用 PM2 或 Docker 部署
 */

const express = require('express');
const cors = require('cors');
const axios = require('axios');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// ==================== 安全配置 ====================
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    }
  }
}));

app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:8080', 'https://search.astras.example'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

// 速率限制：防止滥用
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15分钟
  max: 100, // 每个IP最多100次请求
  message: { error: '请求过于频繁，请稍后再试' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

app.use(express.json());

// ==================== 搜索引擎配置 ====================
const SEARCH_ENGINES = {
  google: {
    url: 'https://www.googleapis.com/customsearch/v1',
    apiKey: process.env.GOOGLE_API_KEY,
    cx: process.env.GOOGLE_CX,
  },
  bing: {
    url: 'https://api.bing.microsoft.com/v7.0/search',
    apiKey: process.env.BING_API_KEY,
  }
};

// ==================== 路由 ====================

/**
 * 健康检查
 */
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    version: '2.0.0'
  });
});

/**
 * 搜索建议 API
 * 转发至 Google Suggest（无需 API Key）
 */
app.get('/api/suggest', async (req, res) => {
  const { q } = req.query;
  if (!q || q.trim().length === 0) {
    return res.json({ suggestions: [] });
  }

  try {
    // 使用 Google Suggest API（公开，无需认证）
    const response = await axios.get(
      `https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${encodeURIComponent(q)}`,
      { timeout: 3000 }
    );

    // Google 返回格式：[query, [suggestions]]
    const suggestions = response.data[1] || [];
    res.json({ suggestions: suggestions.slice(0, 8) });
  } catch (error) {
    console.error('Suggest error:', error.message);
    res.json({ suggestions: [] });
  }
});

/**
 * 聚合搜索 API
 * 调用第三方搜索引擎 API 并返回结果
 */
app.get('/api/search', async (req, res) => {
  const { q, engine = 'google', page = 1 } = req.query;

  if (!q || q.trim().length === 0) {
    return res.status(400).json({ error: '搜索词不能为空' });
  }

  const config = SEARCH_ENGINES[engine];
  if (!config) {
    return res.status(400).json({ error: '不支持的搜索引擎' });
  }

  if (!config.apiKey) {
    return res.status(503).json({ 
      error: '该搜索引擎未配置 API Key',
      message: '请联系管理员配置 ' + engine.toUpperCase() + '_API_KEY 环境变量'
    });
  }

  try {
    let results = [];

    if (engine === 'google') {
      const response = await axios.get(config.url, {
        params: {
          key: config.apiKey,
          cx: config.cx,
          q: q,
          start: (page - 1) * 10 + 1,
          num: 10,
        },
        timeout: 10000,
      });

      results = (response.data.items || []).map(item => ({
        title: item.title,
        link: item.link,
        snippet: item.snippet,
        source: 'Google'
      }));
    } 
    else if (engine === 'bing') {
      const response = await axios.get(config.url, {
        headers: { 'Ocp-Apim-Subscription-Key': config.apiKey },
        params: {
          q: q,
          offset: (page - 1) * 10,
          count: 10,
        },
        timeout: 10000,
      });

      results = (response.data.webPages?.value || []).map(item => ({
        title: item.name,
        link: item.url,
        snippet: item.snippet,
        source: 'Bing'
      }));
    }

    res.json({
      query: q,
      engine: engine,
      page: parseInt(page),
      totalResults: results.length,
      results: results,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Search error:', error.message);
    res.status(500).json({ 
      error: '搜索服务暂时不可用',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * 匿名统计（仅记录请求次数，不含任何个人数据）
 */
app.get('/api/stats', (req, res) => {
  res.json({
    message: '统计数据功能开发中',
    note: '本项目承诺不收集任何个人身份信息'
  });
});

// ==================== 错误处理 ====================
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: '服务器内部错误',
    requestId: req.id 
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Astras Search 后端服务已启动`);
  console.log(`📡 监听端口: ${PORT}`);
  console.log(`🔒 速率限制: 100 请求/15分钟/IP`);
  console.log(`📋 可用端点:`);
  console.log(`   GET /api/health    - 健康检查`);
  console.log(`   GET /api/suggest   - 搜索建议`);
  console.log(`   GET /api/search    - 聚合搜索`);
  console.log(`   GET /api/stats     - 匿名统计`);
});
