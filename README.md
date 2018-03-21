# SystemWithDocker

docker pull mysql ; docker pull phpmyadmin/phpmyadmin; docker build -t studentsystem .

docker run --name mysql -e MYSQL_ROOT_PASSWORD=root -d mysql:latest; docker run --name myadmin -d --link mysql:db -p 8080:80 phpmyadmin/phpmyadmin; 

go to localhost:8080 root:root create database University and paste sql commands to console in phpmyadmin, then

docker run -d -p 8081:8081 studentsystem

go to localhost:8081
