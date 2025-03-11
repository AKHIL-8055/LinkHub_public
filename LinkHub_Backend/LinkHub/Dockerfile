# # Use Maven as the builder image
# FROM maven:3.9.2-eclipse-temurin-17-alpine as builder

# # Copy project files
# COPY ./src src/
# COPY ./pom.xml pom.xml

# # Build the application (skipping tests for faster builds)
# RUN mvn clean package -DskipTests

# # Use a lightweight JDK runtime for the final image
# FROM eclipse-temurin:17-jre-alpine

# # Copy the JAR file from the builder stage
# COPY --from=builder target/*.jar app.jar

# # Expose the application port
# EXPOSE 8080

# # Command to run the application
# CMD ["java","-jar","app.jar"]






# ahhhh this works but react not installed 
# 🌟 Stage 1: Build the Spring Boot Application
FROM maven:3.9.2-eclipse-temurin-17-alpine AS builder

# Set working directory
WORKDIR /app

# Copy Maven project files
COPY pom.xml .  
COPY src/ ./src  

# Ensure static files (React build) are included
RUN mkdir -p src/main/resources/static
COPY src/main/resources/static/ src/main/resources/static/

# Build the Spring Boot application (skip tests for faster builds)
RUN mvn clean package -DskipTests


# 🌟 Stage 2: Create a lightweight image to run the built JAR
FROM eclipse-temurin:17-jre-alpine

# Set working directory
WORKDIR /app

# Copy the built JAR from the builder stage
COPY --from=builder /app/target/*.jar app.jar

# Expose port 8080
EXPOSE 8080

# Run the Spring Boot application
CMD ["java", "-jar", "app.jar"]


# # 🌟 Stage 1: Build React App
# FROM node:18-alpine AS frontend-builder

# # Set working directory
# WORKDIR /app

# # Copy package.json and package-lock.json
# COPY src/main/resources/static/package.json src/main/resources/static/package-lock.json ./

# # Install dependencies
# RUN npm install

# # Copy all React files and build
# COPY src/main/resources/static/ ./
# RUN npm run build

# # 🌟 Stage 2: Build Spring Boot Application
# FROM maven:3.9.2-eclipse-temurin-17-alpine AS builder

# WORKDIR /app

# # Copy Maven project files
# COPY pom.xml .  
# COPY src/ ./src  

# # Copy React build output to Spring Boot static folder
# RUN mkdir -p src/main/resources/static
# COPY --from=frontend-builder /app/build/ src/main/resources/static/

# # Build Spring Boot application
# RUN mvn clean package -DskipTests

# # 🌟 Stage 3: Run the built JAR in a lightweight image
# FROM eclipse-temurin:17-jre-alpine

# WORKDIR /app

# # Copy built JAR from builder stage
# COPY --from=builder /app/target/*.jar app.jar

# # Expose port 8080
# EXPOSE 8080

# # Run the application
# CMD ["java", "-jar", "app.jar"]

