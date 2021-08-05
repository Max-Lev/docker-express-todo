# Filename: Dockerfile 
FROM node:14
COPY package*.json ./img
RUN npm install
ENV GENERATE_SOURCEMAP=false
EXPOSE 3000
COPY . .
CMD ["npm", "start","--max-old-space-size=8192"]