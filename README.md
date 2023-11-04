# queuesWithNode

This project is a API that is responsible for return the menu of a burguer restaurant and receive orders from the clients.

The API is developed with NodeJS and MongoDB.

# Create a mongoDB container

docker run -d -p 27017:27017 --name=burguer-mongo mongo:latest

# Create rabbitMQ container

docker run -d --hostname host-rabbitt --name rabbit-queue -p 8080:15672 -p 5672:5672 rabbitmq:3-management

# Run the Burger API

```bash
npm run dev
```
