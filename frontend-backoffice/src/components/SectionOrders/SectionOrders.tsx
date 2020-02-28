import React, { FunctionComponent } from "react";
import { connect } from "react-redux";
import { Alert, Spin, Typography } from "antd";
import OrderCard from "./OrderCard";
import { IOrder, IInitialState } from "../../store";
import "./SectionOrders.css";

export interface ISectionOrdersProps {
  orders: Array<IOrder>;
  isLoadingOrders: boolean;
  isErrorFetchingOrders: boolean;
}

const SectionOrders: FunctionComponent<ISectionOrdersProps> = ({ orders, isLoadingOrders, isErrorFetchingOrders }) => (
  <div className="section__wrapper">
    <div className="subtitle">Manage orders</div>
    <Alert message="only their status values" type="info" showIcon />
    <div style={{ display: "flex", justifyContent: "center" }}>
      {isLoadingOrders ? (
        <Spin size="large" />
      ) : (
        <>
          {isErrorFetchingOrders ? (
            <Typography.Text type="danger">Error fetching orders. Please try again later.</Typography.Text>
          ) : (
            <div className="orders__wrapper">
              {orders.map((order: IOrder) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  </div>
);

const mapStateToProps = (state: IInitialState) => ({
  orders: state.orders,
  isLoadingOrders: state.isLoadingOrders,
  isErrorFetchingOrders: state.isErrorFetchingOrders
});

export default connect(mapStateToProps)(SectionOrders);
