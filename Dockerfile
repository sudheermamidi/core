FROM node:23.4.0
WORKDIR /App
COPY paackage*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node","index.js"]