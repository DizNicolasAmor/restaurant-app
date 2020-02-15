// API orders.
//
// This API handles data related to orders.
//
//     Schemes: http, https
//     Version: 0.1
//     Contact: diz.nicolasamor@gmail.com
//     Consumes:
//     - application/json
//     Produces:
//     - application/json
//
// swagger:meta
package main

import (
	"log"
	"net/http"

	"github.com/restaurant-app/orders/common"
	"github.com/restaurant-app/orders/routers"
)

func main() {
	common.StartUp()
	router := routers.InitRoutes()

	server := &http.Server{
		Addr:    common.AppConfig.Server,
		Handler: router,
	}
	log.Println("Listening...")

	server.ListenAndServe()
}
