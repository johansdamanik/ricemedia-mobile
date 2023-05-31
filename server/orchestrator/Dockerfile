FROM node:18.16.0

ENV NODE_ENV=production
ENV PORT=80

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install 

COPY . .

CMD ["npm", "run", "start"]