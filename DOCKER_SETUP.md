# Docker Setup Guide - Shopping Online Project

## ✅ Setup Hoàn Thành

Dự án đã được cấu hình thành công với Docker! Tất cả services đang chạy:

- **MySQL 8.0**: Database chính (Port 3306)
- **Server API**: Backend Express.js + TypeScript + Prisma (Port 8080)  
- **Adminer**: Web-based database management (Port 8081)

## 🚀 Services Đang Chạy

| Service | URL | Mô tả |
|---------|-----|-------|
| **Server API** | http://localhost:8080 | Backend API (Express.js + Prisma) |
| **Adminer** | http://localhost:8081 | Database management interface |
| **MySQL** | localhost:3306 | MySQL database server |

## 📋 Thông Tin Database

- **Host**: localhost (hoặc mysql từ container)
- **Port**: 3306
- **Database**: shopping_online
- **Username**: shopping_user
- **Password**: shopping_password
- **Root Password**: root123

## 🛠 Quản Lý Docker

### Khởi động services:
```bash
docker compose up -d
```

### Dừng services:
```bash
docker compose down
```

### Xem logs:
```bash
# Tất cả services
docker compose logs

# Chỉ server
docker compose logs server

# Realtime logs
docker compose logs -f server
```

### Restart services:
```bash
docker compose restart server
docker compose restart mysql
```

### Kiểm tra trạng thái:
```bash
docker compose ps
```

## 🗄 Quản Lý Database

### Sử dụng Adminer (Khuyến nghị):
1. Truy cập http://localhost:8081
2. Chọn "MySQL"
3. Nhập thông tin:
   - Server: mysql
   - Username: shopping_user
   - Password: shopping_password
   - Database: shopping_online

### Sử dụng MySQL CLI:
```bash
# Kết nối với root
docker compose exec mysql mysql -u root -proot123

# Kết nối với user thường
docker compose exec mysql mysql -u shopping_user -pshopping_password shopping_online
```

### Prisma Commands:
```bash
# Generate Prisma client
docker compose exec server npx prisma generate

# Push schema to database
docker compose exec server npx prisma db push

# Open Prisma Studio
docker compose exec server npx prisma studio

# View database
docker compose exec server npx prisma db pull
```

## 🔧 Development Workflow

### 1. Khởi động lần đầu:
```bash
docker compose up -d
# Database và schema đã được tự động setup
```

### 2. Development hàng ngày:
```bash
# Khởi động
docker compose up -d

# Xem logs khi cần debug
docker compose logs -f server

# Restart server khi thay đổi code (nếu cần)
docker compose restart server
```

### 3. Khi thay đổi Prisma schema:
```bash
docker compose exec server npx prisma db push
```

### 4. Kết thúc work:
```bash
docker compose down
```

## 📁 Cấu Trúc Files

```
├── docker-compose.yml          # Docker services configuration
├── packages/server/
│   ├── Dockerfile             # Server container configuration
│   ├── .env                   # Environment variables
│   └── prisma/
│       └── schema.prisma      # Database schema
└── mysql-init/
    └── 01-init.sql           # Database initialization script
```

## 🐛 Troubleshooting

### Server không khởi động:
```bash
# Kiểm tra logs
docker compose logs server

# Restart server
docker compose restart server
```

### Database connection error:
```bash
# Kiểm tra MySQL đã sẵn sàng
docker compose exec mysql mysqladmin ping -h localhost -u shopping_user -pshopping_password

# Restart MySQL
docker compose restart mysql
```

### Port conflicts:
```bash
# Kiểm tra ports đang sử dụng
sudo netstat -tulpn | grep :3306
sudo netstat -tulpn | grep :8080
sudo netstat -tulpn | grep :8081

# Dừng services local nếu cần
sudo systemctl stop mysql
```

### Reset hoàn toàn:
```bash
# Dừng và xóa tất cả data
docker compose down -v

# Khởi động lại từ đầu
docker compose up -d
```

## 🎯 Next Steps

1. **Frontend Development**: Khởi động b2c-client và b2c-admin
   ```bash
   yarn client:dev  # Port 3000
   yarn admin:dev   # Port 3001
   ```

2. **API Testing**: Test các endpoints tại http://localhost:8080

3. **Database Management**: Sử dụng Adminer tại http://localhost:8081

## 📝 Notes

- Server tự động chạy `prisma db push` khi khởi động
- Database được khởi tạo với charset UTF8MB4 (hỗ trợ tiếng Việt)
- Data được persist trong Docker volume `mysql_data`
- Server chạy trong development mode với nodemon (auto-reload)

---

**🎉 Setup thành công! Dự án đã sẵn sàng cho development.** 