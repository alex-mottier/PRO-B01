FROM maven:3.6.1-jdk-8-alpine AS MAVEN_BUILD

COPY Server/pom.xml /build/
COPY Server/src /build/src/
WORKDIR /build/
RUN mvn clean package

FROM openjdk:8-jre-alpine

WORKDIR /app

EXPOSE 27018
EXPOSE 8080

COPY --from=MAVEN_BUILD /build/target/*.jar /app/application.jar

ENTRYPOINT ["java", "-jar", "application.jar"]