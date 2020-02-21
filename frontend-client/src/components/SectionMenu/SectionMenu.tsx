import React, { FunctionComponent } from "react";
import { connect } from "react-redux";
import { Spin, Typography } from "antd";
import { ProductCard } from "./ProductCard";
import { IProduct, IInitialState } from "../../store";
import "./SectionMenu.css";
// import mockedProducts from "./mockedProducts";

export interface ISectionMenuProps {
  products: Array<IProduct>;
  isLoading: boolean;
  isError: boolean;
}

const SectionMenu: FunctionComponent<ISectionMenuProps> = ({ products, isLoading, isError }) => (
  <>
    <div className="subtitle">Menu options</div>
    <div style={{ display: "flex", justifyContent: "center" }}>
      {isLoading ? (
        <Spin size="large" />
      ) : (
        <>
          {isError ? (
            <Typography.Text type="danger">An error occurred. Please try again later.</Typography.Text>
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
  </>
);

const mapStateToProps = (state: IInitialState) => ({
  products: state.products,
  isLoading: state.isLoading,
  isError: state.isError
});

export default connect(mapStateToProps)(SectionMenu);
