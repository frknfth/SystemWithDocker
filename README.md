# Docker: Golang web + MySQL

Reusable docker setup to start writing web apps with the [Go Programing Language](https://golang.org/). Generates a web container with Go and a db container with MySQL.

Requirements: Go, [Docker](https://www.docker.com/) and a [Go workspace](https://golang.org/doc/code.html#Workspaces).

Steps:

```
# cd into workspace directory
cd $GOPATH

# Clone the project
go get github.com/frknfth/SystemWithDocker

# cd into project directory
cd src/github.com/frknfth/SystemWithDocker

# Run containers
sudo docker-compose build
sudo docker-compose up -d
Our Database is empty

# Confirm it all went up correctly. Exit with Ctrl+C
docker-compose logs
```
phpMyAdmin : 
```
localhost:8080
user name - password : root - root
```
Our App :
```
localhost:8081
```


