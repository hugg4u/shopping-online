FROM node:18-alpine

# Cài đặt các dependencies cần thiết
RUN apk add --no-cache python3 make g++ openssl openssl-dev

# Tạo thư mục làm việc
WORKDIR /app

# Copy toàn bộ source code vào container
COPY . .

# Cài đặt dependencies
RUN yarn install --frozen-lockfile

# Build ứng dụng
RUN cd packages/b2c-client && yarn build

# Chuyển đến thư mục b2c-client
WORKDIR /app/packages/b2c-client

# Expose port 3000
EXPOSE 3000

# Start ứng dụng
CMD ["yarn", "start"] 