# Используем официальный образ Node.js (Alpine для легковесности)
FROM node:18-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json из backend
COPY package*.json ./
RUN npm install
# Копируем все файлы проекта
COPY . .

# Указываем порт
EXPOSE 3000

# Команда для запуска сервера
CMD ["node", "server.js"]