package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/restaurant-app/orders/common"
	"github.com/restaurant-app/orders/data"
	"gopkg.in/mgo.v2"
)

// GetOrderById swagger:route GET /api/orders/{id} handlers GetOrderById
//
// GetOrderById: find Order in the "orders" collection, based on its "id".
// ---
// produces:
// - application/json
//
// Responses:
//   200: orderResponse
//   404: notFoundErrorResponse
//   500: serverErrorResponse
func GetOrderById(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]

	context := NewContext()
	defer context.Close()
	c := context.DbCollection("orders")

	repo := &data.OrderRepository{c}
	order, err := repo.GetById(id)
	if err != nil {
		if err == mgo.ErrNotFound {
			w.WriteHeader(http.StatusNotFound)
			return
		} else {
			common.DisplayAppError(w, err.Error(), "Server error", 500)
			return
		}
	}

	j, err := json.Marshal(order)
	if err != nil {
		common.DisplayAppError(w, err.Error(), "Server error", 500)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(j)
}
