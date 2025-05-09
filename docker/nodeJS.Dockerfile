FROM node:22-alpine


WORKDIR /usr/src/app

COPY package.json package-lock.json ./

# Cài đặt các thư viện và dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn của ứng dụng
COPY . .


CMD ["npx", "nodemon", "--legacy-watch", "/usr/src/app/src/app.js"]