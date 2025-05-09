FROM node:22-alpine

WORKDIR /usr/src/app

# Copy package.json trước để cache layer install
COPY package.json package-lock.json ./

# Copy Prisma nếu có
COPY prisma ./prisma
RUN npx prisma generate

RUN npm install



# Không cần copy toàn bộ source ở đây (sẽ mount bằng volume ở docker-compose)

# CMD dev mode
CMD ["npx", "next", "dev", "-p", "3000"]
