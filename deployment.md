# MBTI 测试系统部署指南

## 目录
1. [准备工作](#准备工作)
2. [本地构建](#本地构建)
3. [1Panel 配置](#1panel-配置)
4. [文件部署](#文件部署)
5. [Nginx 配置](#nginx-配置)
6. [SSL 配置](#ssl-配置)
7. [性能优化](#性能优化)
8. [故障排查](#故障排查)

## 准备工作

### 系统要求
- 1Panel 安装完成
- Node.js v14 或以上（本地构建用）
- 域名（已解析到服务器）
- 服务器配置建议：
  - CPU: 1核心或以上
  - 内存: 1GB或以上
  - 存储: 10GB或以上

### 域名准备
1. 购买域名（如果没有）
2. 将域名解析到服务器IP
   - 添加 A 记录
   - 记录值为服务器IP
   - TTL 建议设置为600秒

## 本地构建

1. 安装依赖：
```bash
npm install
```

2. 构建生产版本：
```bash
npm run build
```

3. 检查构建结果：
- 确认 build 目录已生成
- 检查 build 目录下的文件是否完整
  - index.html
  - static/css/
  - static/js/
  - static/media/（如果有）

## 1Panel 配置

### 创建网站
1. 登录 1Panel 控制台
2. 进入 "应用商店" -> "网站"
3. 点击 "创建网站"
4. 填写配置信息：
   - 域名：输入你的域名
   - 网站目录：建议使用 `/www/wwwroot/mbti`
   - 运行用户：www
   - PHP：不需要
   - 启用 HTTPS：建议启用

### 配置网站目录
1. 在 1Panel 中进入 "文件管理"
2. 导航到网站根目录（如 `/www/wwwroot/mbti`）
3. 创建目录结构：
```
/www/wwwroot/mbti/
└── build/
```

## 文件部署

### 上传文件
1. 使用 SFTP 工具（如 FileZilla）连接服务器
2. 上传文件：
   - 源目录：本地的 `build` 目录下所有文件
   - 目标目录：`/www/wwwroot/mbti/build`

### 设置权限
```bash
# 设置目录所有权
chown -R www:www /www/wwwroot/mbti

# 设置目录权限
chmod -R 755 /www/wwwroot/mbti
chmod -R 644 /www/wwwroot/mbti/build/*
```

## Nginx 配置

### 上传配置文件
1. 将 `mbti.conf` 上传到 `/www/server/nginx/conf.d/` 目录
2. 修改配置文件：
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;  # 替换为你的域名

       root /www/wwwroot/mbti/build;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
           add_header Cache-Control "no-cache, no-store, must-revalidate";
       }

       location /static {
           expires 1y;
           add_header Cache-Control "public";
       }

       # 开启 gzip 压缩
       gzip on;
       gzip_vary on;
       gzip_min_length 10240;
       gzip_proxied expired no-cache no-store private auth;
       gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml application/javascript;
       gzip_disable "MSIE [1-6]\.";
   }
   ```

### 检查和重启 Nginx
1. 检查配置文件语法：
```bash
nginx -t
```

2. 重启 Nginx：
```bash
nginx -s reload
```

## SSL 配置

### 申请证书
1. 在 1Panel 中进入 "SSL 证书"
2. 点击 "申请证书"
3. 选择证书提供商（如 Let's Encrypt）
4. 填写域名信息
5. 完成域名验证

### 配置 HTTPS
1. 修改 Nginx 配置：
```nginx
server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;

    # ... 其他配置保持不变 ...
}

# HTTP 重定向到 HTTPS
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}
```

## 性能优化

### 浏览器缓存
已在 Nginx 配置中设置：
- 静态资源缓存 1 年
- HTML 文件不缓存

### Gzip 压缩
已在 Nginx 配置中启用，支持常见文件类型的压缩

### CDN 配置（可选）
1. 购买 CDN 服务
2. 配置 CDN 域名
3. 设置源站信息
4. 配置缓存规则

## 故障排查

### 常见问题
1. **网站无法访问**
   - 检查域名解析是否正确
   - 检查 Nginx 是否运行
   - 检查防火墙设置

2. **页面样式丢失**
   - 检查静态文件是否上传完整
   - 检查文件权限
   - 检查 Nginx 配置中的 root 路径

3. **刷新页面 404**
   - 确认 Nginx 配置中有 `try_files $uri $uri/ /index.html;`

### 查看日志
```bash
# Nginx 错误日志
tail -f /www/server/nginx/logs/error.log

# Nginx 访问日志
tail -f /www/server/nginx/logs/access.log
```

## 维护建议

### 定期备份
1. 备份网站文件
2. 备份 Nginx 配置
3. 备份 SSL 证书

### 监控
1. 配置站点监控
2. 设置异常告警
3. 定期检查日志

### 更新
1. 定期更新 SSL 证书
2. 检查并更新 Nginx 版本
3. 检查系统安全更新

## 联系方式
如遇到部署问题，请联系技术支持。
