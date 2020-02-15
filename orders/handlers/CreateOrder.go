package handlers

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/restaurant-app/orders/common"
	"github.com/restaurant-app/orders/data"
	"github.com/restaurant-app/orders/models"
	"gopkg.in/go-playground/validator.v9"
	"gopkg.in/mgo.v2/bson"
)

// CreateOrder swagger:route POST /api/orders handlers CreateOrder
//
// CreateOrder: create new Order.
// ---
// consumes:
// - application/json
// produces:
// - application/json
//
// Responses:
//   201: orderCreatedResponse
//   400: badRequestErrorResponse
//   404: notFoundErrorResponse
//   500: serverErrorResponse
func CreateOrder(w http.ResponseWriter, r *http.Request) {
	var order models.Order
	errInvalidJSON := json.NewDecoder(r.Body).Decode(&order)
	if errInvalidJSON != nil {
		common.DisplayAppError(w, errInvalidJSON.Error(), "Bad request", 400)
		return
	}

	validate := validator.New()
	errValidation := validate.Struct(order)
	if errValidation != nil {
		common.DisplayAppError(w, "Bad request.", errValidation.Error(), 400)
		return
	}

	obj_id := bson.NewObjectId()
	order.Id = obj_id
	order.CreationDate = time.Now().UTC()
	order.Status = "opened"
	order.TotalPrice = order.ProductPrice * order.Quantity

	context := NewContext()
	defer context.Close()
	c := context.DbCollection("orders")
	repo := &data.OrderRepository{c}
	repo.Create(&order)
	j, err := json.Marshal(order)
	if err != nil {
		common.DisplayAppError(w, err.Error(), "Server error", 500)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	w.Write(j)
}
