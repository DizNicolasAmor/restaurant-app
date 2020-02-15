package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/restaurant-app/products/common"
	"github.com/restaurant-app/products/data"
)

// GetProducts swagger:route GET /api/products handlers GetProducts
//
// GetProducts: hit the "products" collection. If it is empty, return null, else return an array of all Product elements
// ---
// produces:
// - application/json
//
// Responses:
//        200: allProductsResponse
//        500: serverErrorResponse
func GetProducts(w http.ResponseWriter, r *http.Request) {
	context := NewContext()
	defer context.Close()
	c := context.DbCollection("products")
	repo := &data.ProductRepository{c}
	products := repo.GetAll()
	j, err := json.Marshal(products)
	if err != nil {
		common.DisplayAppError(w, err.Error(), "Server error", 500)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(j)
}
