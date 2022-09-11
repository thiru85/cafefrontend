FROM alpine:latest
RUN apk add --update nodejs npm wget aws-cli
RUN mkdir app
COPY . app/
WORKDIR app
RUN "npm" "install"
ENTRYPOINT "npm" "start"
EXPOSE 3000