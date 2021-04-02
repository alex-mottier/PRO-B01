FROM maven:3.6.1-jdk-8-alpine AS MAVEN_BUILD

COPY Server/pom.xml /build/
COPY Server/src /build/src/
WORKDIR /build/
RUN mvn package

FROM openjdk:8-jre-alpine

WORKDIR /app

COPY --from=MAVEN_BUILD /build/target/*.jar /app/application.jar

ENTRYPOINT ["java", "-jar", "application.jar"]