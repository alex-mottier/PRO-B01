# Phase de build 
FROM maven:3.6.1-jdk-8-slim AS build

# Create an application directory
RUN mkdir -p /app

COPY Server/pom.xml /app
COPY Server/src /app/src

# The /app directory should act as the main application directory
WORKDIR /app

RUN mvn -f pom.xml clean package

#Phase de RUN
#FROM openjdk:8

# Copy or project directory (locally) in the current directory of our docker image (/app)
COPY Server/target/*.jar ./app.jar

# Expose $PORT on container.
# We use a varibale here as the port is something that can differ on the environment.
EXPOSE 27017
EXPOSE 8080

# Start the app
CMD [ "java", "-jar", "./app.jar" ]