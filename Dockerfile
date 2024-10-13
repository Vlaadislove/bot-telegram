# Используем Node.js как базовый образ
FROM node:18

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /usr/src/app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь код приложения
COPY . .

# Открываем порт, который слушает ваше приложение (например, 3000)
EXPOSE 3000

# Запускаем приложение
CMD ["node", "index.js"]