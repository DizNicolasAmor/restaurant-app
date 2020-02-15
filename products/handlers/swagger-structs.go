package handlers

// swagger:model product
type ProductBody struct {
	// Required: true
	Name string `json:"name"`
	// Required: true
	Description string `json:"description"`
	Image       string `json:"image"`
	// Required: true
	Price int `json:"price"`
	// Required: true
	Currency string `json:"currency"`
}

// swagger:parameters CreateProduct UpdateProductById
type ProductBodyParams struct {
	// in: body
	Product *ProductBody `json:"Product"`
}

type ProductResponseBase struct {
	Id          string `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Image       string `json:"image"`
	Price       int    `json:"price"`
	Currency    string `json:"currency"`
}

// Ok
// swagger:response productResponse
type ProductResponse struct {
	// in: body
	Body *ProductResponseBase
}

// Created
// swagger:response productCreatedResponse
type ProductCreatedResponse struct {
	// in: body
	Body *ProductResponseBase
}

// Ok
// swagger:response allProductsResponse
type AllProductsResponse struct {
	// in: body
	Body *[]ProductResponseBase
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
