#! /bin/bash
mongorestore -d orders -c orders /backup/orders/orders.bson
mongorestore -d products -c products /backup/products/products.bson
