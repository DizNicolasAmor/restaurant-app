import React, { FunctionComponent, useState } from "react";
import { connect } from "react-redux";
import { Button, Card, Modal, Select, Typography } from "antd";
import { IOrder } from "../../store";
import { setErrorMessage } from "../../actions";
import { updateOrderStatus } from "./SectionOrdersHelpers";

interface IOrderCardProps {
  order: IOrder;
  setErrorMessage: (str: string) => void;
}

const OrderCard: FunctionComponent<IOrderCardProps> = ({ order, setErrorMessage }) => {
  const [newStatus, setNewStatus] = useState(order.status);
  const options: Array<string> = ["opened", "pending", "finished", "canceled"];
  const handleUpdate = () =>
    Modal.confirm({
      title: `Do you want to update status to ${newStatus}?`,
      onOk: () =>
        updateOrderStatus(order.id, newStatus)
          .then(() => window.location.reload())
          .catch(() => setErrorMessage(`Error while updating status of order ${order.id}`)),
      onCancel: () => {}
    });

  return (
    <Card hoverable style={{ width: 300, margin: "9px", position: "relative" }}>
      {Object.getOwnPropertyNames(order).map((key: string) => (
        <div key={key}>
          <Typography.Text strong>{key}:</Typography.Text>
          <span style={{ marginLeft: "9px" }}>{order[key]}</span>
        </div>
      ))}
      <Typography.Text strong>Change status:</Typography.Text>
      <Select defaultValue={order.status} onChange={setNewStatus} style={{ marginLeft: "9px" }}>
        {options.map(option => (
          <Select.Option key={option} value={option} disabled={order.status === option}>
            {option}
          </Select.Option>
        ))}
      </Select>
      <Button onClick={handleUpdate} disabled={order.status === newStatus} className="orders__card--button">
        UPDATE
      </Button>
    </Card>
  );
};

const mapDispatchToProps = (dispatch: any, _: any) => ({
  setErrorMessage: (str: string) => dispatch(setErrorMessage(str))
});

export default connect(null, mapDispatchToProps)(OrderCard);
