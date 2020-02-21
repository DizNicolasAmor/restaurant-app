import React, { useEffect, FunctionComponent } from "react";
import { connect } from "react-redux";
import SectionMenu from "../SectionMenu/SectionMenu";
import SectionOrder from "../SectionOrder/SectionOrder";
import "antd/dist/antd.css";
import "./App.css";

import { fetchProducts } from "../../actions";

export interface IAppProps {
  fetchProducts: any;
}

const App: FunctionComponent<IAppProps> = ({ fetchProducts }) => {
  useEffect(fetchProducts, []);

  return (
    <div>
      <h1>Restaurant App</h1>
      <SectionMenu />
      <SectionOrder />
    </div>
  );
};

const mapDispatchToProps = (dispatch: any, _: any) => ({
  fetchProducts: () => dispatch(fetchProducts())
});

export default connect(null, mapDispatchToProps)(App);
