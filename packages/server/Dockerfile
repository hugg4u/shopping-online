FROM node:18-alpine

# Cài đặt các dependencies cần thiết bao gồm OpenSSL cho Prisma
RUN apk add --no-cache python3 make g++ openssl openssl-dev

# Tạo thư mục app
WORKDIR /app

# Copy toàn bộ project
COPY . .

# Cài đặt dependencies cho toàn bộ workspace từ root
RUN yarn install --frozen-lockfile

# Generate Prisma client
WORKDIR /app/packages/server
RUN npx prisma generate

# Expose port
EXPOSE 8080

# Chờ database và chạy migrations trước khi start
# Chạy server từ thư mục packages/server
CMD ["sh", "-c", "npx prisma db push && yarn server:dev"] 