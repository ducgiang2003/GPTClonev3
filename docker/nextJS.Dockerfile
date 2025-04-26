FROM node:22-alpine

# Thiết lập thư mục làm việc
WORKDIR /usr/src/app

# Sao chép các tệp package.json và package-lock.json
COPY package.json package-lock.json ./


COPY prisma ./prisma

RUN npx prisma generate

# Cài đặt các thư viện và dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn của ứng dụng
COPY . .

# Chạy Next.js ở chế độ phát triển
CMD ["npx", "next", "dev"]