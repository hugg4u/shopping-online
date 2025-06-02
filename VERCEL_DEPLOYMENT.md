# Vercel Deployment Guide - B2C Client

## 🚀 Deploy Frontend Client lên Vercel

### 📋 Thông tin cấu hình:
- **API URL**: https://8080--main--hungpc--hung.coder1.hirogo-dev.com
- **Framework**: Next.js 14
- **Package Manager**: Yarn (Monorepo)

## 🛠 Bước 1: Chuẩn bị dự án

### 1.1 Kiểm tra cấu hình đã sẵn sàng:
```bash
# Kiểm tra cấu hình files
ls packages/b2c-client/vercel.json
ls packages/b2c-client/env.example

# Test build local trước khi deploy
cd packages/b2c-client
yarn build
```

### 1.2 Các file đã được cấu hình:
- ✅ `packages/b2c-client/vercel.json` - Cấu hình Vercel
- ✅ `packages/b2c-client/next.config.js` - Tối ưu cho Vercel & monorepo
- ✅ `packages/b2c-client/tsconfig.json` - TypeScript paths cho monorepo
- ✅ `packages/b2c-client/env.example` - Environment variables template

## 🌐 Bước 2: Deploy lên Vercel

### 2.1 Sử dụng Vercel CLI (Khuyến nghị):

```bash
# Cài đặt Vercel CLI
npm install -g vercel

# Login vào Vercel
vercel login

# Deploy từ thư mục root của project
vercel

# Hoặc deploy với config cụ thể
vercel --prod
```

### 2.2 Sử dụng Vercel Dashboard:

1. **Import Repository**:
   - Truy cập https://vercel.com/dashboard
   - Click "New Project"
   - Import Git repository

2. **Configure Project**:
   - **Framework Preset**: Next.js
   - **Root Directory**: `packages/b2c-client`
   - **Build Command**: `cd packages/b2c-client && yarn build`
   - **Output Directory**: `packages/b2c-client/.next`
   - **Install Command**: `yarn install`

## ⚙️ Bước 3: Cấu hình Environment Variables

Trên Vercel Dashboard, thêm các Environment Variables sau:

### Production Environment:
```env
NEXT_PUBLIC_SITE=CLIENT
NEXT_PUBLIC_API_BASE_URL=https://8080--main--hungpc--hung.coder1.hirogo-dev.com
NEXT_PUBLIC_APP_NAME=Perfume Shop Client
NEXT_PUBLIC_APP_DESCRIPTION=E-commerce platform for perfumes
NEXT_PUBLIC_CLIENT_URL=https://your-app-name.vercel.app
NODE_ENV=production
```

### Preview/Development:
```env
NEXT_PUBLIC_SITE=CLIENT
NEXT_PUBLIC_API_BASE_URL=https://8080--main--hungpc--hung.coder1.hirogo-dev.com
NEXT_PUBLIC_APP_NAME=Perfume Shop Client (Dev)
NEXT_PUBLIC_CLIENT_URL=https://your-app-name-git-branch.vercel.app
NODE_ENV=development
```

## 🔧 Bước 4: Vercel Project Settings

### 4.1 Build & Development Settings:
- **Framework Preset**: Next.js
- **Root Directory**: `packages/b2c-client`
- **Build Command**: `yarn build`
- **Output Directory**: `.next`
- **Install Command**: `yarn install`
- **Development Command**: `yarn dev`

### 4.2 Functions (nếu cần):
- **Node.js Version**: 18.x
- **Region**: Washington, D.C., USA (iad1) - hoặc gần nhất với API server

## 🚨 Troubleshooting

### Build Errors:

#### 1. Module not found 'common':
```bash
# Đảm bảo next.config.js có cấu hình đúng alias
# Kiểm tra tsconfig.json có paths mapping
```

#### 2. Dependency issues:
```bash
# Clear cache và reinstall
yarn cache clean
rm -rf node_modules packages/*/node_modules
yarn install
```

#### 3. Environment variables không load:
```bash
# Đảm bảo tên biến bắt đầu với NEXT_PUBLIC_
# Restart Vercel deployment sau khi thêm env vars
```

### Runtime Errors:

#### 1. API calls fail (CORS):
- Kiểm tra server có cấu hình CORS cho domain Vercel
- Cập nhật `CORS_ORIGIN` trong server environment

#### 2. Images không load:
- Kiểm tra `next.config.js` có `remotePatterns` config
- Verify image URLs đúng format

## 📝 Deployment Commands Summary

```bash
# Deploy production
vercel --prod

# Deploy preview
vercel

# Check deployment status
vercel ls

# View logs
vercel logs [deployment-url]

# Set environment variable
vercel env add NEXT_PUBLIC_API_BASE_URL

# Remove deployment
vercel rm [deployment-url]
```

## 🔗 Sau khi Deploy thành công

1. **Update API Server CORS**:
   ```env
   CORS_ORIGIN=https://your-app-name.vercel.app,http://localhost:3000,http://localhost:3001
   ```

2. **Update CLIENT_URL trong server**:
   ```env
   CLIENT_URL=https://your-app-name.vercel.app
   ```

3. **Test chức năng**:
   - ✅ Login/Register
   - ✅ API calls
   - ✅ Image loading
   - ✅ Payment redirects

## 📋 Checklist Deploy

- [ ] Build thành công local
- [ ] Environment variables đã được set
- [ ] API server đã cấu hình CORS
- [ ] Vercel project settings đúng
- [ ] Domain custom (nếu có)
- [ ] Analytics/monitoring setup

---

**🎉 Deployment hoàn tất! Frontend client đã sẵn sàng trên Vercel.**

### 🔗 Links hữu ích:
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Monorepo on Vercel](https://vercel.com/docs/concepts/git/monorepos) 