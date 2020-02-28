import React from "react";
import FormProduct from "./FormProduct";
import "./ModalProduct.css";

const ModalProduct: React.FC = () => (
  <div className="modal">
    <div className="backdrop" />
    <div className="content">
      <FormProduct />
    </div>
  </div>
);

export default ModalProduct;
