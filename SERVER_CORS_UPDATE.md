# Cập nhật CORS cho Server sau khi Deploy Frontend

## 🔧 Sau khi deploy frontend lên Vercel thành công

### 1. Lấy URL của Vercel deployment
Sau khi deploy, bạn sẽ nhận được URL như:
```
https://your-app-name.vercel.app
```

### 2. Cập nhật CORS_ORIGIN trong server

#### Nếu server chạy local:
Cập nhật file `packages/server/.env`:
```env
CORS_ORIGIN=https://your-app-name.vercel.app,http://localhost:3000,http://localhost:3001
```

#### Nếu server chạy trên Docker:
Cập nhật `docker-compose.yml`:
```yaml
services:
  server:
    environment:
      - CORS_ORIGIN=https://your-app-name.vercel.app,http://localhost:3000,http://localhost:3001
```

Sau đó restart server:
```bash
docker compose restart server
```

### 3. Cập nhật CLIENT_URL trong server
```env
CLIENT_URL=https://your-app-name.vercel.app
```

### 4. Kiểm tra kết nối
Sau khi cập nhật CORS, test các chức năng:
- ✅ Login/Register
- ✅ API calls từ frontend
- ✅ Image loading
- ✅ Payment redirects

## 🚨 Lưu ý quan trọng

1. **HTTPS**: Vercel tự động cung cấp HTTPS, đảm bảo server cũng hỗ trợ HTTPS requests
2. **Domain**: Nếu có custom domain, cần thêm vào CORS_ORIGIN
3. **Preview URLs**: Vercel tạo preview URLs cho mỗi branch, có thể cần thêm pattern:
   ```env
   CORS_ORIGIN=https://*.vercel.app,http://localhost:3000,http://localhost:3001
   ```

## 📝 Example hoàn chỉnh

```env
# Server Configuration
PORT=8080
NODE_ENV=production

# Database Configuration  
DATABASE_URL="mysql://shopping_user:shopping_password@mysql:3306/shopping_online"

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_production
JWT_EXPIRES_IN=7d

# CORS Configuration - CẬP NHẬT DÒNG NÀY
CORS_ORIGIN=https://your-app-name.vercel.app,http://localhost:3000,http://localhost:3001

# Client URL - CẬP NHẬT DÒNG NÀY  
CLIENT_URL=https://your-app-name.vercel.app

# PayOS Configuration
PAYOS_CLIENT_ID=your_payos_client_id
PAYOS_API_KEY=your_payos_api_key
PAYOS_CHECKSUM_KEY=your_payos_checksum_key

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
``` 