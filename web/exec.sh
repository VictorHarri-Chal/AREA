sudo docker build -f Dockerfile -t client .
sudo docker run -it -p 8081:3000 client