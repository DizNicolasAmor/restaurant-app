package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/restaurant-app/products/common"
	"github.com/restaurant-app/products/data"
	"github.com/restaurant-app/products/models"
)

// CreateProduct swagger:route POST /api/products handlers CreateProduct
//
// CreateProduct: create new Product.
// ---
// consumes:
// - application/json
// produces:
// - application/json
//
// Responses:
//   201: productCreatedResponse
//   400: badRequestErrorResponse
//   404: notFoundErrorResponse
//   500: serverErrorResponse
func CreateProduct(w http.ResponseWriter, r *http.Request) {
	var product models.Product
	err := json.NewDecoder(r.Body).Decode(&product)
	if err != nil {
		common.DisplayAppError(w, err.Error(), "Bad request", 400)
		return
	}
	if product.Name == "" {
		common.DisplayAppError(w, "Bad request.", "Field `name` cannot be empty or zero value.", 400)
		return
	}
	if product.Description == "" {
		common.DisplayAppError(w, "Bad request.", "Field `description` cannot be empty or zero value.", 400)
		return
	}
	if product.Price <= 0 {
		common.DisplayAppError(w, "Bad request.", "Wrong value or missing field `price`.", 400)
		return
	}
	if product.Currency == "" {
		common.DisplayAppError(w, "Bad request.", "Field `currency` cannot be empty or zero value.", 400)
		return
	}

	context := NewContext()
	defer context.Close()
	c := context.DbCollection("products")
	repo := &data.ProductRepository{c}
	repo.Create(&product)
	j, err := json.Marshal(product)
	if err != nil {
		common.DisplayAppError(w, err.Error(), "Server error", 500)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	w.Write(j)
}
