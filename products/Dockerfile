FROM golang:1.11.2
ADD . /go/src/github.com/restaurant-app/products
WORKDIR /go/src/github.com/restaurant-app/products
RUN go get github.com/restaurant-app/products
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o products .
EXPOSE 8080
ENTRYPOINT ["./products"]
