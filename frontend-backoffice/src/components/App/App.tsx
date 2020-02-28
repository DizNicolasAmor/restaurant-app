import React, { useEffect, FunctionComponent } from "react";
import { connect } from "react-redux";
import { Alert } from "antd";
import SectionProducts from "../SectionProducts/SectionProducts";
import SectionOrders from "../SectionOrders/SectionOrders";
import { setErrorMessage, fetchOrders, fetchProducts, setIsModalProductOpened } from "../../actions";
import { IInitialState } from "../../store";
import "antd/dist/antd.css";
import "./App.css";
import ModalProduct from "../ModalProduct/ModalProduct";

export interface IAppProps {
  errorMessage: string;
  fetchOrders: any;
  fetchProducts: any;
  isProductModalOpened: boolean;
  setErrorMessage: (str: string) => void;
}

const App: FunctionComponent<IAppProps> = ({ errorMessage, fetchOrders, fetchProducts, isProductModalOpened, setErrorMessage }) => {
  useEffect(fetchProducts, []);
  useEffect(fetchOrders, []);

  return (
    <div>
      {!!errorMessage.length && <Alert message={errorMessage} type="error" closable onClose={() => setErrorMessage("")} />}
      <h1>Backoffice Restaurant App</h1>
      <div className="sections__wrapper">
        <SectionProducts />
        <SectionOrders />
        {isProductModalOpened && <ModalProduct />}
      </div>
    </div>
  );
};

const mapStateToProps = (state: IInitialState) => ({
  errorMessage: state.errorMessage,
  isProductModalOpened: state.isProductModalOpened
});

const mapDispatchToProps = (dispatch: any, _: any) => ({
  fetchOrders: () => dispatch(fetchOrders()),
  fetchProducts: () => dispatch(fetchProducts()),
  setErrorMessage: (str: string) => dispatch(setErrorMessage(str))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
