package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/restaurant-app/products/common"
	"github.com/restaurant-app/products/data"
	"gopkg.in/mgo.v2"
)

// GetProductById swagger:route GET /api/products/{id} handlers GetProductById
//
// GetProductById: find Product in the "products" collection, based on its "id".
// ---
// produces:
// - application/json
//
// Responses:
//   200: productResponse
//   404: notFoundErrorResponse
//   500: serverErrorResponse
func GetProductById(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]

	context := NewContext()
	defer context.Close()
	c := context.DbCollection("products")

	repo := &data.ProductRepository{c}
	product, err := repo.GetById(id)
	if err != nil {
		if err == mgo.ErrNotFound {
			w.WriteHeader(http.StatusNotFound)
			return
		} else {
			common.DisplayAppError(w, err.Error(), "Server error", 500)
			return
		}
	}

	j, err := json.Marshal(product)
	if err != nil {
		common.DisplayAppError(w, err.Error(), "Server error", 500)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(j)
}
