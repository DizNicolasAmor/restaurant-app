package data

import (
	"github.com/restaurant-app/orders/models"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

type OrderRepository struct {
	C *mgo.Collection
}

func (r *OrderRepository) Create(order *models.Order) error {
	err := r.C.Insert(&order)
	return err
}

func (r *OrderRepository) GetAll() []models.Order {
	orders := make([]models.Order, 0)
	iter := r.C.Find(nil).Iter()
	result := models.Order{}
	for iter.Next(&result) {
		orders = append(orders, result)
	}
	return orders
}

func (r *OrderRepository) GetById(id string) (order models.Order, err error) {
	err = r.C.FindId(bson.ObjectIdHex(id)).One(&order)
	return
}

func (r *OrderRepository) Delete(id string) error {
	err := r.C.Remove(bson.M{"_id": bson.ObjectIdHex(id)})
	return err
}

func (r *OrderRepository) UpdateStatusValue(id string, newStatus string) error {
	err := r.C.Update(bson.M{"_id": bson.ObjectIdHex(id)}, bson.M{"$set": bson.M{"status": newStatus}})
	return err
}
