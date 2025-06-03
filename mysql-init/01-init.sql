-- Khởi tạo database với charset UTF8MB4 để hỗ trợ tiếng Việt và emoji
CREATE DATABASE IF NOT EXISTS shopping_online 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

-- Tạo user và cấp quyền
CREATE USER IF NOT EXISTS 'shopping_user'@'%' IDENTIFIED BY 'shopping_password';
GRANT ALL PRIVILEGES ON shopping_online.* TO 'shopping_user'@'%';
FLUSH PRIVILEGES;

-- Sử dụng database
USE shopping_online;

-- Thông báo hoàn thành
SELECT 'Database shopping_online initialized successfully!' as message; 