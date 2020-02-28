import React, { FunctionComponent } from "react";
import { connect } from "react-redux";
import { Button, Spin, Typography } from "antd";
import ProductCard from "./ProductCard";
import { IProduct, IInitialState, NullProduct } from "../../store";
import { setIsModalProductOpened, setProductModalConfig } from "../../actions";
import "./SectionProducts.css";

export interface ISectionProductsProps {
  products: Array<IProduct>;
  isLoadingProducts: boolean;
  isErrorFetchingProducts: boolean;
  setIsModalProductOpened: (bool: boolean) => any;
  setProductModalConfig: (prod: IProduct) => void;
}

const SectionProducts: FunctionComponent<ISectionProductsProps> = ({
  products,
  isLoadingProducts,
  isErrorFetchingProducts,
  setIsModalProductOpened,
  setProductModalConfig
}) => (
  <div className="section__wrapper">
    <div className="subtitle">Manage products</div>
    <Button
      style={{ width: "fit-content", margin: "4px" }}
      onClick={() => {
        setIsModalProductOpened(true);
        setProductModalConfig(NullProduct);
      }}
    >
      CREATE NEW PRODUCT
    </Button>
    <div style={{ display: "flex", justifyContent: "center" }}>
      {isLoadingProducts ? (
        <Spin size="large" />
      ) : (
        <>
          {isErrorFetchingProducts ? (
            <Typography.Text type="danger">Error fetching products. Please try again later.</Typography.Text>
          ) : (
            <div className="products__wrapper">
              {products.map((product: IProduct) => (
                <ProductCard product={product} key={product.id} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  </div>
);

const mapStateToProps = (state: IInitialState) => ({
  products: state.products,
  isLoadingProducts: state.isLoadingProducts,
  isErrorFetchingProducts: state.isErrorFetchingProducts
});
const mapDispatchToProps = (dispatch: any, _: any) => ({
  setIsModalProductOpened: (bool: boolean) => dispatch(setIsModalProductOpened(bool)),
  setProductModalConfig: (prod: IProduct) => dispatch(setProductModalConfig(prod))
});

export default connect(mapStateToProps, mapDispatchToProps)(SectionProducts);
