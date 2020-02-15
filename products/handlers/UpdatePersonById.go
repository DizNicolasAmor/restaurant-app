package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/restaurant-app/products/common"
	"github.com/restaurant-app/products/data"
	"github.com/restaurant-app/products/models"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

// UpdateProductById swagger:route PUT /api/products/{id} handlers UpdateProductById
//
// UpdateProductById: find Procuct in the "products" collection, based on its "id" and update it with submitted values.
// ---
// consumes:
// - application/json
// produces:
// - application/json
//
// Responses:
//   200: productResponse
//   400: badRequestErrorResponse
//   404: notFoundErrorResponse
//   500: serverErrorResponse
func UpdateProductById(w http.ResponseWriter, r *http.Request) {
	var newProduct models.Product
	invalidJSONerror := json.NewDecoder(r.Body).Decode(&newProduct)
	if invalidJSONerror != nil {
		common.DisplayAppError(w, invalidJSONerror.Error(), "Bad request", 400)
		return
	}

	if newProduct.Name == "" {
		common.DisplayAppError(w, "Bad request.", "Field `name` cannot be empty or zero value.", 400)
		return
	}
	if newProduct.Description == "" {
		common.DisplayAppError(w, "Bad request.", "Field `description` cannot be empty or zero value.", 400)
		return
	}
	if newProduct.Price <= 0 {
		common.DisplayAppError(w, "Bad request.", "Wrong value or missing field `price`.", 400)
		return
	}
	if newProduct.Currency == "" {
		common.DisplayAppError(w, "Bad request.", "Field `currency` cannot be empty or zero value.", 400)
		return
	}

	vars := mux.Vars(r)
	id := vars["id"]

	context := NewContext()
	defer context.Close()
	c := context.DbCollection("products")

	repo := &data.ProductRepository{c}

	newProduct.Id = bson.ObjectIdHex(id)
	err := repo.Update(&newProduct)
	if err != nil {
		if err == mgo.ErrNotFound {
			w.WriteHeader(http.StatusNotFound)
			return
		} else {
			common.DisplayAppError(w, err.Error(), "Server error", 500)
			return
		}
	}

	j, encodingError := json.Marshal(newProduct)
	if encodingError != nil {
		common.DisplayAppError(w, encodingError.Error(), "Server error", 500)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(j)
}
