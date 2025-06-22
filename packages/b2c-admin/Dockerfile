FROM node:18-alpine

# Cài đặt các dependencies cần thiết
RUN apk add --no-cache python3 make g++ openssl openssl-dev

# Tạo thư mục làm việc
WORKDIR /app

# Copy toàn bộ source code vào container
COPY . .

RUN yarn corepack enable

# Cài đặt dependencies
RUN yarn install --frozen-lockfile

# Build ứng dụng
# RUN cd packages/b2c-admin && yarn build

# # Chuyển đến thư mục b2c-admin
# WORKDIR /app/packages/b2c-admin

# Expose port 3001
EXPOSE 3001

# Start ứng dụng
CMD ["yarn", "admin:dev"] 