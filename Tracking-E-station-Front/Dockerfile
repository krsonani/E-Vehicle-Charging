FROM node:14-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --force/..
EXPOSE 3000
CMD ["npm", "start"]
