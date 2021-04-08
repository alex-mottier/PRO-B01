FROM node:14.16.0-alpine

# Create an application directory
RUN mkdir -p /app

# The /app directory should act as the main application directory
WORKDIR /app

# Copy the app package and package-lock.json file
COPY Client/package*.json ./
#COPY Client/app.json ./

# Install node packages
RUN npm install

# Copy or project directory (locally) in the current directory of our docker image (/app)
COPY Client/ .

#ENV REACT_NATIVE_PACKAGER_HOSTNAME="192.168.1.128"

# Build the app
RUN npm install -g expo-cli

EXPOSE 19000
EXPOSE 19001
EXPOSE 19002

CMD npm i -f && npm start

# Start the app
#CMD [ "npm", "start" ]