FROM node:20.9.0-alpine
WORKDIR /xracademy-quiz
RUN npm install -g pm2
COPY ./package.json ./
RUN npm install --f
COPY ./ ./
RUN npm run build
CMD pm2 start --no-daemon processes.json
