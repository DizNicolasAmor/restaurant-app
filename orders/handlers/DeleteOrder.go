package handlers

import (
	"net/http"

	"github.com/gorilla/mux"
	"github.com/restaurant-app/orders/common"
	"github.com/restaurant-app/orders/data"
	"gopkg.in/mgo.v2"
)

// DeleteOrder swagger:route DELETE /api/orders/{id} handlers DeleteOrder
//
// DeleteOrder: find Order in the "orders" collection, based on its "id" and delete it.
// ---
// produces:
// - application/json
//
// Responses:
//   204: description: No content
//   404: notFoundErrorResponse
//   500: serverErrorResponse
func DeleteOrder(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]

	context := NewContext()
	defer context.Close()
	c := context.DbCollection("orders")

	repo := &data.OrderRepository{c}
	err := repo.Delete(id)
	if err != nil {
		if err == mgo.ErrNotFound {
			w.WriteHeader(http.StatusNotFound)
			return
		} else {
			common.DisplayAppError(w, err.Error(), "Server error", 500)
			return
		}
	}

	w.WriteHeader(http.StatusNoContent)
}
