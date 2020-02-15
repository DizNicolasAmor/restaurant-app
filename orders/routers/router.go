package routers

import (
	"net/http"

	"github.com/gorilla/mux"
	"github.com/restaurant-app/orders/handlers"
)

func SetOrdersRouters(router *mux.Router) *mux.Router {
	router.HandleFunc("/api/orders", handlers.CreateOrder).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/orders", handlers.GetOrders).Methods("GET")
	router.HandleFunc("/api/orders/{id}", handlers.GetOrderById).Methods("GET")
	router.HandleFunc("/api/orders/{id}/patch-status", handlers.PatchOrderStatus).Methods("PATCH", "OPTIONS")
	router.HandleFunc("/api/orders/{id}", handlers.DeleteOrder).Methods("DELETE", "OPTIONS")
	return router
}

func InitRoutes() *mux.Router {
	router := mux.NewRouter().StrictSlash(false)
	router.Use(accessControlMiddleware)
	router = SetOrdersRouters(router)
	return router
}

func accessControlMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, PATCH, DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")

		if r.Method == "OPTIONS" {
			return
		}

		next.ServeHTTP(w, r)
	})
}
