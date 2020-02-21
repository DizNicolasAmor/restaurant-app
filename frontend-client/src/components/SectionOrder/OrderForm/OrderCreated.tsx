import React from "react";
import { Button, Typography } from "antd";

interface IOrderCreatedProps {
  orderData: any;
  resetForm: () => void;
  updateNewOrder: (order: object) => void;
}
const OrderCreated: React.FC<IOrderCreatedProps> = ({ orderData, resetForm, updateNewOrder }) => {
  const handleClick = () => {
    const emptyOrder = {};
    updateNewOrder(emptyOrder);
    resetForm();
  };
  return (
    <div className="modal">
      <div className="backdrop" />
      <div className="content">
        <Typography.Title level={4}>ORDER CREATED</Typography.Title>
        {Object.getOwnPropertyNames(orderData).map((key: string) => (
          <p key={key}>
            {key} : {orderData[key]}
          </p>
        ))}
        <Button type="primary" onClick={handleClick}>
          MAKE A NEW ORDER
        </Button>
      </div>
    </div>
  );
};

export default OrderCreated;
