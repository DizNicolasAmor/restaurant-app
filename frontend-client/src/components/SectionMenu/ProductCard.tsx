import React, { FunctionComponent } from "react";
import { Card } from "antd";
import { IProduct } from "../../store";

const { Meta } = Card;

interface IProductCardProps {
  product: IProduct;
}

export const ProductCard: FunctionComponent<IProductCardProps> = ({
  product
}) => (
  <Card
    hoverable
    style={{ width: 210, margin: "9px" }}
    cover={<img alt={product.name} src={product.image} />}
  >
    <p>{`${product.currency} ${(product.price / 100).toFixed(2)}`}</p>
    <Meta title={product.name} description={product.description} />
  </Card>
);
