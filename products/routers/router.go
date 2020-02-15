package routers

import (
	"net/http"

	"github.com/gorilla/mux"
	"github.com/restaurant-app/products/handlers"
)

func SetProductsRouters(router *mux.Router) *mux.Router {
	router.HandleFunc("/api/products", handlers.CreateProduct).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/products", handlers.GetProducts).Methods("GET")
	router.HandleFunc("/api/products/{id}", handlers.GetProductById).Methods("GET")
	router.HandleFunc("/api/products/{id}", handlers.UpdateProductById).Methods("PUT", "OPTIONS")
	router.HandleFunc("/api/products/{id}", handlers.DeleteProduct).Methods("DELETE", "OPTIONS")
	return router
}

func InitRoutes() *mux.Router {
	router := mux.NewRouter().StrictSlash(false)
	router.Use(accessControlMiddleware)
	router = SetProductsRouters(router)
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
