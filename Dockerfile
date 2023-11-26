FROM node:18.13-slim as angular-demo-build
ENV PATH /app/node_modules/.bin:$PATH
RUN mkdir /app
WORKDIR /app
COPY frontend/package.json frontend/package-lock.json ./
RUN npm i
COPY frontend/ ./
RUN ng build
WORKDIR /app/dist \
RUN ls
FROM nginx:1.19 as nginx-build

COPY --from=angular-demo-build /app/dist/angular-lms/ /angular/
ENTRYPOINT ["nginx", "-g", "daemon off;"]
