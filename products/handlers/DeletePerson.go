package handlers

import (
	"net/http"

	"github.com/gorilla/mux"
	"github.com/restaurant-app/products/common"
	"github.com/restaurant-app/products/data"
	"gopkg.in/mgo.v2"
)

// DeleteProduct swagger:route DELETE /api/products/{id} handlers DeleteProduct
//
// DeleteProduct: find Product in the "products" collection, based on its "id" and delete it.
// ---
// produces:
// - application/json
//
// Responses:
//   204: description: No content
//   404: notFoundErrorResponse
//   500: serverErrorResponse
func DeleteProduct(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]

	context := NewContext()
	defer context.Close()
	c := context.DbCollection("products")

	repo := &data.ProductRepository{c}
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
