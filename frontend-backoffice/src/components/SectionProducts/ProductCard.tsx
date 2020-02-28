import React, { FunctionComponent } from "react";
import { connect } from "react-redux";
import { Card, Icon, Modal, Typography } from "antd";
import { IProduct } from "../../store";
import { setErrorMessage, setIsModalProductOpened, setProductModalConfig } from "../../actions";
import { deleteProduct } from "./SectionProductsHelpers";

interface IProductCardProps {
  product: IProduct;
  setErrorMessage: (str: string) => void;
  setIsModalProductOpened: (bool: boolean) => any;
  setProductModalConfig: (prod: IProduct) => void;
}

const ProductCard: FunctionComponent<IProductCardProps> = ({
  product,
  setErrorMessage,
  setIsModalProductOpened,
  setProductModalConfig
}) => {
  const handleEdit = () => {
    setIsModalProductOpened(true);
    setProductModalConfig(product);
  };
  const handleDelete = () =>
    Modal.confirm({
      title: "Do you want to delete this product?",
      onOk: () =>
        deleteProduct(product.id)
          .then(() => window.location.reload())
          .catch(() => setErrorMessage(`Error while deleting product ${product.id}`)),
      onCancel: () => {}
    });

  return (
    <Card hoverable style={{ width: 300, margin: "9px", position: "relative" }}>
      <Icon type="edit" className="icon icon__edit" onClick={handleEdit} />
      <Icon type="delete" className="icon icon__delete" onClick={handleDelete} />
      {Object.getOwnPropertyNames(product).map((key: string) => (
        <div key={key}>
          <Typography.Text strong>{key}</Typography.Text>
          <span style={{ marginLeft: "9px" }}>{product[key]}</span>
        </div>
      ))}
    </Card>
  );
};

const mapDispatchToProps = (dispatch: any, _: any) => ({
  setErrorMessage: (str: string) => dispatch(setErrorMessage(str)),
  setIsModalProductOpened: (bool: boolean) => dispatch(setIsModalProductOpened(bool)),
  setProductModalConfig: (prod: IProduct) => dispatch(setProductModalConfig(prod))
});

export default connect(null, mapDispatchToProps)(ProductCard);
