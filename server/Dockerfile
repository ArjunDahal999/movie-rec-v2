FROM node:20-alpine3.18

WORKDIR /app

# Copy the package.json and package-lock.json first for better layer caching
COPY package*.json ./

RUN npm install

# Copy the rest of the app (including .env) into the image
COPY . . 

EXPOSE 4000 

RUN npm run build

CMD npm run dev
