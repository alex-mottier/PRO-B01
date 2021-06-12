FROM maven:3.6.1-jdk-8 AS MAVEN_BUILD

COPY pom.xml /build/
COPY src /build/src/
WORKDIR /build/
RUN mvn clean package

FROM openjdk:8-jdk

WORKDIR /app

EXPOSE 27017
#Local EXPOSE 8080
EXPOSE $PORT

COPY --from=MAVEN_BUILD /build/target/*.jar /app/application.jar

ENTRYPOINT ["java", "-jar", "-Dserver.port=$PORT", "application.jar"]