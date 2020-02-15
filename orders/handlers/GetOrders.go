package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/restaurant-app/orders/common"
	"github.com/restaurant-app/orders/data"
)

// GetOrders swagger:route GET /api/orders handlers GetOrders
//
// GetOrders: hit the "orders" collection. If it is empty, return null, else return an array of all Order elements
// ---
// produces:
// - application/json
//
// Responses:
//        200: allOrdersResponse
//        500: serverErrorResponse
func GetOrders(w http.ResponseWriter, r *http.Request) {
	context := NewContext()
	defer context.Close()
	c := context.DbCollection("orders")
	repo := &data.OrderRepository{c}
	orders := repo.GetAll()
	j, err := json.Marshal(orders)
	if err != nil {
		common.DisplayAppError(w, err.Error(), "Server error", 500)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(j)
}
