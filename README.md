# queuesWithNode

This project has a API that is responsible for return the menu of a burguer restaurant and receive orders from the clients.

And have a consumer that is responsible for receive the orders and send to the kitchen.

The API is developed with NodeJS and MongoDB.
The consumer was developed with NodeJS and RabbitMQ.

# How to run
```
You must have installed a node version 20.6.0 or higher
```
## Create a mongoDB container

docker run -d -p 27017:27017 --name=burguer-mongo mongo:latest

## Create rabbitMQ container

docker run -d --hostname host-rabbitt --name rabbit-queue -p 8080:15672 -p 5672:5672 rabbitmq:3-management

# Run the Burger API

```bash
cd api
npm install
npm run dev
```

# Run the Consumer

```bash
cd consumer
npm install
npm run dev
```

# Data to create menu itens

```json
{
  "id": 1,
  "description": "Hamburguer clássico",
  "nome": "Hamburguer",
  "preco": 15,
}

{
  "id": 2,
  "description": "Fritas crocantes",
  "nome": "Fritas",
  "preco": 10,
}

{
  "id": 3,
  "description": "Hamburguer com bacon extra",
  "nome": "Hamburguer Super Bacon",
  "preco": 20,
}

{
  "id": 4,
  "description": "Fritas com pedaços de bacon",
  "nome": "Fritas com Bacon",
  "preco": 12,
}

{
  "id": 5,
  "description": "Refrigerante",
  "nome": "Coca cola",
  "preco": 12,
}

```

# Example of how to create a order

```json
{
  "pedido": [
    {
      "id": 1
    },
    {
      "id": 2
    },
    {
      "id": 3
    },
    {
      "id": 4
    },
    {
      "id": 5
    }
  ]
}
```
