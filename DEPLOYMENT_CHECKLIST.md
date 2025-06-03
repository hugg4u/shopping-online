# 📋 Deployment Checklist - Shopping Online Project

## ✅ Frontend (B2C Client) - Vercel Deployment

### Pre-deployment:
- [x] Build thành công local (`yarn build`)
- [x] Cấu hình `vercel.json`
- [x] Cấu hình `next.config.js` cho monorepo
- [x] Cấu hình `tsconfig.json` paths
- [x] Environment variables template (`env.example`)
- [x] TypeScript errors đã được sửa
- [x] ESLint errors đã được sửa

### Deployment Steps:
1. **Vercel Dashboard Method**:
   - [ ] Truy cập https://vercel.com/dashboard
   - [ ] Click "New Project"
   - [ ] Import Git repository
   - [ ] Configure settings:
     - Framework: Next.js
     - Root Directory: `packages/b2c-client`
     - Build Command: `yarn build`
     - Output Directory: `.next`
     - Install Command: `yarn install`

2. **Environment Variables** (Vercel Dashboard):
   ```env
   NEXT_PUBLIC_SITE=CLIENT
   NEXT_PUBLIC_API_BASE_URL=https://8080--main--hungpc--hung.coder1.hirogo-dev.com
   NEXT_PUBLIC_APP_NAME=Perfume Shop Client
   NEXT_PUBLIC_APP_DESCRIPTION=E-commerce platform for perfumes
   NEXT_PUBLIC_CLIENT_URL=https://your-app-name.vercel.app
   NODE_ENV=production
   ```

3. **Deploy**:
   - [ ] Click "Deploy"
   - [ ] Wait for build completion
   - [ ] Note down the deployment URL

### Post-deployment:
- [ ] Test deployment URL
- [ ] Verify environment variables loaded
- [ ] Check console for errors

## 🔧 Backend (Server) - CORS Update

### After Frontend Deployment:
1. **Get Vercel URL**: `https://your-app-name.vercel.app`

2. **Update Server CORS**:
   - [ ] Update `docker-compose.yml`:
     ```yaml
     services:
       server:
         environment:
           - CORS_ORIGIN=https://your-app-name.vercel.app,http://localhost:3000,http://localhost:3001
           - CLIENT_URL=https://your-app-name.vercel.app
     ```

3. **Restart Server**:
   ```bash
   docker compose restart server
   ```

4. **Verify Server Logs**:
   ```bash
   docker compose logs server
   ```

## 🧪 Testing Checklist

### Frontend Testing:
- [ ] Homepage loads correctly
- [ ] Product listing works
- [ ] Product detail pages work
- [ ] Search functionality
- [ ] Navigation works
- [ ] Images load properly
- [ ] Responsive design on mobile

### API Integration Testing:
- [ ] API calls successful (check Network tab)
- [ ] Authentication works
- [ ] Product data loads
- [ ] Cart functionality
- [ ] User registration/login
- [ ] Error handling works

### Cross-Origin Testing:
- [ ] No CORS errors in console
- [ ] API requests from Vercel to server work
- [ ] Authentication cookies work
- [ ] File uploads work (if any)

## 🚨 Troubleshooting

### Common Issues:

1. **Build Errors**:
   - Check TypeScript errors
   - Check ESLint errors
   - Verify all imports are correct
   - Check monorepo paths

2. **Runtime Errors**:
   - Check environment variables
   - Verify API URL is correct
   - Check CORS configuration
   - Check browser console

3. **API Connection Issues**:
   - Verify server is running
   - Check CORS_ORIGIN includes Vercel URL
   - Check API URL in environment variables
   - Test API endpoints directly

## 📊 Performance Checklist

- [ ] Lighthouse score > 90
- [ ] Images optimized
- [ ] Bundle size reasonable
- [ ] Loading states implemented
- [ ] Error boundaries in place

## 🔐 Security Checklist

- [ ] Environment variables secure
- [ ] No sensitive data in client code
- [ ] HTTPS enabled (automatic on Vercel)
- [ ] CORS properly configured
- [ ] Authentication working

## 📝 Documentation

- [ ] README updated with deployment info
- [ ] Environment variables documented
- [ ] API endpoints documented
- [ ] Troubleshooting guide created

---

## 🎉 Final Verification

### Production URLs:
- **Frontend**: `https://your-app-name.vercel.app`
- **API**: `https://8080--main--hungpc--hung.coder1.hirogo-dev.com`
- **Admin Panel**: `http://localhost:3001` (if needed)

### Success Criteria:
- [ ] Frontend loads without errors
- [ ] API integration works
- [ ] User can browse products
- [ ] User can register/login
- [ ] Cart functionality works
- [ ] Payment flow works (if implemented)

**🚀 Deployment Complete!** 