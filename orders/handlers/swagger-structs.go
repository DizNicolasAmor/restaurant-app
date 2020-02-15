package handlers

import (
	"time"
)

// swagger:model order
type OrderBody struct {
	// Required: true
	BuyerName string `json:"buyername"`
	// Required: true
	BuyerEmail string `json:"buyeremail"`
	// Required: true
	ProductCurrency string `json:"productcurrency"`
	// Required: true
	ProductDescription string `json:"productdescription"`
	// Required: true
	ProductName string `json:"productname"`
	// Required: true
	ProductPrice int `json:"productprice"`
	// Required: true
	Quantity int `json:"quantity"`
}

// swagger:parameters CreateOrder
type OrderBodyParams struct {
	// in: body
	Order *OrderBody `json:"Order"`
}

type OrderResponseBase struct {
	Id                 string    `json:"id"`
	BuyerName          string    `json:"buyername"`
	BuyerEmail         string    `json:"buyeremail"`
	CreationDate       time.Time `json:"creationdate"`
	ProductCurrency    string    `json:"productcurrency"`
	ProductDescription string    `json:"productdescription"`
	ProductName        string    `json:"productname"`
	ProductPrice       int       `json:"productprice"`
	Quantity           int       `json:"quantity"`
	Status             string    `json:"status"`
	TotalPrice         int       `json:"totalprice"`
}

// Ok
// swagger:response orderResponse
type OrderResponse struct {
	// in: body
	Body *OrderResponseBase
}

// Created
// swagger:response orderCreatedResponse
type OrderCreatedResponse struct {
	// in: body
	Body *OrderResponseBase
}

// Ok
// swagger:response allOrdersResponse
type AllOrdersResponse struct {
	// in: body
	Body *[]OrderResponseBase
}

// swagger:parameters PatchOrderStatus
type PatchOrderStatusBodyParams struct {
	// in: body
	Body struct {
		// Required: true
		Status string `json:"status"`
	}
}

// Ok
// swagger:response patchOrderStatusResponse
type PatchOrderStatusResponse struct {
	// in: body
	Body struct {
		// Required: true
		Status string `json:"status"`
	}
}

type CustomErrorResponse struct {
	Error   string `json:"error"`
	Message string `json:"message"`
	Status  int    `json:"status"`
}

// Bad request
// swagger:response badRequestErrorResponse
type BadRequestErrorResponse struct {
	// in: body
	Body *CustomErrorResponse
}

// Not found
// swagger:response notFoundErrorResponse
type NotFoundErrorResponse struct {
	// in: body
	Body *CustomErrorResponse
}

// Server error
// swagger:response serverErrorResponse
type ServerErrorResponse struct {
	// in: body
	Body *CustomErrorResponse
}
