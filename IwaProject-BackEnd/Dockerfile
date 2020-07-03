FROM openjdk:11.0.5-jdk-slim as BACK-BUIDLER

WORKDIR /workdir

# Dependences
COPY .mvn /workdir/.mvn
COPY pom.xml /workdir/pom.xml
COPY mvnw /workdir/mvnw

RUN chmod +x mvnw && ./mvnw dependency:go-offline

# Project Sources
COPY src /workdir/src

RUN ./mvnw package -DskipTests

FROM openjdk:11-jre-slim

COPY --from=BACK-BUILDER /workdir/target/*.jar /iwaproject.jar

EXPOSE 8080

CMD ["java", "-jar", "/iwaproject.jar"]