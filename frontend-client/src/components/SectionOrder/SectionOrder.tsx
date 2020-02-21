import React from "react";
import OrderForm from "./OrderForm/OrderForm";
import "./SectionOrder.css";

export default function SectionOrder() {
  return (
    <React.Fragment>
      <div className="subtitle">Create your order:</div>
      <OrderForm />
    </React.Fragment>
  );
}
