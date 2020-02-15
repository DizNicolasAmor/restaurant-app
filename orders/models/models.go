package models

import (
	"time"

	"gopkg.in/mgo.v2/bson"
)

type Order struct {
	Id                 bson.ObjectId `bson:"_id,omitempty" json:"id"`
	BuyerName          string        `json:"buyername" validate:"required,min=1"`
	BuyerEmail         string        `json:"buyeremail" validate:"required,email"`
	CreationDate       time.Time     `json:"creationdate"`
	ProductCurrency    string        `json:"productcurrency" validate:"required"`
	ProductDescription string        `json:"productdescription" validate:"required"`
	ProductName        string        `json:"productname" validate:"required"`
	ProductPrice       int           `json:"productprice" validate:"required,min=0"`
	Quantity           int           `json:"quantity" validate:"required,min=0"`
	Status             string        `json:"status"`
	TotalPrice         int           `json:"totalprice"`
}
