FROM golang:1.11.2
ADD . /go/src/github.com/restaurant-app/orders
WORKDIR /go/src/github.com/restaurant-app/orders
RUN go get github.com/restaurant-app/orders
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o orders .
EXPOSE 8080
ENTRYPOINT ["./orders"]
