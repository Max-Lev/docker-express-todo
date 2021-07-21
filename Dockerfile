# Filename: Dockerfile 
FROM node:14
COPY package*.json ./img
RUN npm install
COPY . .
ENV GENERATE_SOURCEMAP=false
EXPOSE 3000
CMD ["npm", "start","--max-old-space-size=8192"]