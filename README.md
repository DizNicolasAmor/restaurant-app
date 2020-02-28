# restaurant-app

### Overview

This full stack app is a Restaurant system Demo: in the frontend-client UI, the user can see the menu options and submit an order (via orders API written in Golang), that will be stored in the mongo database. In addition, in frontend-backoffice, another user can update the status of these orders and also manage the menu options (products API).

### Deployment

The application can be deployed in your: **local machine**.

#### Requirements

- Docker 18.06.1-ce
- Docker Compose 1.23.1

#### Services management

```
    # starting services
    docker-compose up -d

    # stoping services
    docker-compose stop

    # including new changes: if you need change some source code you can deploy it typing:
    docker-compose build


    # purging: purging All Unused or Dangling Images, Containers, Volumes, and Networks:
    docker system prune -a
```

#### Restore database information

You can start using an empty database for all microservices, but if you want to restore a preconfigured data execute this step:

```
    # run the environment
    docker-compose up

    # restore db info
    docker-compose exec db /bin/bash /backup/restore.sh

    # if you have some local data and you wanna create a new backup, run
    docker-compose exec db mongodump --out ./backup
```

#### Usage

After running your local environment with `docker-compose up`, you can open any browser and hit the following URLs:

- `http://localhost:9003/` to see the backoffice, that is the UI tool to manage products and orders.
- `http://localhost:9002/` to see the client UI, where a client can submit a new order.
- `http://localhost:9001/api/orders` to see the orders API.
- `http://localhost:9000/api/products` to see the products API.

### API Services

#### Products Service (runs in port 9000)

- POST a new product: `/api/products`
- GET all products: `/api/products`
- GET product by id: `/api/products/{id}`
- UPDATE product by id: `/api/products/{id}`
- DELETE product by id: `/api/products/{id}`

#### Orders Service (runs in port 9001)

- POST a new order: `/api/orders`
- GET all orders: `/api/orders`
- GET order by id: `/api/orders/{id}`
- PATCH status in order: `/api/orders/{id}/patch-status`
- DELETE order by id: `/api/orders/{id}`

_For more information, see swagger documentation:_

#### How to see swagger documentation

```
    # CD to the api folder. For example, `products`.
    cd api-folder

    # install go-swagger if you do not have it installed yet.
    go get github.com/go-swagger/go-swagger/cmd/swagger

    # Generate the swagger specification if you do not have it.
    swagger generate spec -o ./swagger.json

    # Serve the spec for the browser locally.
    swagger serve swagger.json

    # Serve the spec for the browser remotely.
    swagger serve -F=swagger ./swagger.json
```
