package data

import (
	"github.com/restaurant-app/products/models"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

type ProductRepository struct {
	C *mgo.Collection
}

func (r *ProductRepository) Create(product *models.Product) error {
	obj_id := bson.NewObjectId()
	product.Id = obj_id
	err := r.C.Insert(&product)
	return err
}

func (r *ProductRepository) GetAll() []models.Product {
	products := make([]models.Product, 0)
	iter := r.C.Find(nil).Iter()
	result := models.Product{}
	for iter.Next(&result) {
		products = append(products, result)
	}
	return products
}

func (r *ProductRepository) GetById(id string) (product models.Product, err error) {
	err = r.C.FindId(bson.ObjectIdHex(id)).One(&product)
	return
}

func (r *ProductRepository) Delete(id string) error {
	err := r.C.Remove(bson.M{"_id": bson.ObjectIdHex(id)})
	return err
}

func (r *ProductRepository) Update(product *models.Product) error {
	err := r.C.UpdateId(product.Id, product)
	return err
}
