package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/restaurant-app/orders/common"
	"github.com/restaurant-app/orders/data"
	"gopkg.in/mgo.v2"
)

// PatchOrderStatus swagger:route PATCH /api/orders/{id}/patch-status handlers PatchOrderStatus
//
// PatchOrderStatus: find 'Order' bi 'id' and patch its 'status' value.
// ---
// consumes:
// - application/json
// produces:
// - application/json
//
// Responses:
//   200: patchOrderStatusResponse
//   400: badRequestErrorResponse
//   404: notFoundErrorResponse
//   500: serverErrorResponse
func PatchOrderStatus(w http.ResponseWriter, r *http.Request) {
	var patchReqBody struct {
		Status string `json:"status"`
	}

	errInvalidJSON := json.NewDecoder(r.Body).Decode(&patchReqBody)
	if errInvalidJSON != nil {
		common.DisplayAppError(w, errInvalidJSON.Error(), "Bad request", 400)
		return
	}
	if patchReqBody.Status == "" {
		common.DisplayAppError(w, "Bad request.", "Field `status` cannot be empty or zero value.", 400)
		return
	}

	vars := mux.Vars(r)
	id := vars["id"]

	context := NewContext()
	defer context.Close()
	c := context.DbCollection("orders")

	repo := &data.OrderRepository{c}

	err := repo.UpdateStatusValue(id, patchReqBody.Status)
	if err != nil {
		if err == mgo.ErrNotFound {
			w.WriteHeader(http.StatusNotFound)
			return
		} else {
			common.DisplayAppError(w, err.Error(), "Server error", 500)
			return
		}
	}

	j, err := json.Marshal(patchReqBody)
	if err != nil {
		common.DisplayAppError(w, err.Error(), "Server error", 500)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	w.Write(j)
}
