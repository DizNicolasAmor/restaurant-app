import React, { useState } from "react";
import { connect } from "react-redux";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Spin, Typography } from "antd";
import FieldSelect from "./FieldSelect";
import OrderCreated from "./OrderCreated";
import { orderFormConfig } from "./orderFormHelpers";
import { IProduct, IInitialState } from "../../../store";
import { updateNewOrder } from "../../../actions";

const getOptionsFromProducts = (prods: Array<IProduct>) =>
  prods.map(prod => ({
    id: prod.id,
    label: prod.name
  }));

interface IOrderFormProps {
  products: Array<IProduct>;
  newOrder: object;
  updateNewOrder: any;
}

const OrderForm: React.FC<IOrderFormProps> = ({ products, newOrder, updateNewOrder }) => {
  const [messageFromServer, setMessageFromServer] = useState("");

  if (messageFromServer) {
    return (
      <>
        <Typography.Text type="danger">{messageFromServer}</Typography.Text>
        <div>
          <button type="button" onClick={() => setMessageFromServer("")}>
            BACK
          </button>
        </div>
      </>
    );
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", paddingBottom: "90px" }}>
      <Formik
        initialValues={orderFormConfig.initialValues}
        validationSchema={orderFormConfig.validationSchema}
        onSubmit={(values, { setSubmitting }) =>
          orderFormConfig.onSubmit(values, products, setSubmitting, setMessageFromServer, updateNewOrder)
        }
      >
        {({ isSubmitting, resetForm, setFieldValue, values }) => (
          <div>
            {!!Object.values(newOrder).length ? (
              <OrderCreated orderData={newOrder} resetForm={resetForm} updateNewOrder={updateNewOrder} />
            ) : (
              <>
                {isSubmitting ? (
                  <Spin size="large" />
                ) : (
                  <Form>
                    {orderFormConfig.inputs.map(input => (
                      <div key={input.name}>
                        <div className="input__wrapper">
                          <div className={`input title ${input.name}`}>{input.title}</div>
                          {input.type === "select" && (
                            <Field
                              component={FieldSelect}
                              name={input.name}
                              placeholder={input.placeholder}
                              value={values.selectedProduct}
                              onChange={(value: string) => setFieldValue("selectedProduct", value)}
                              options={getOptionsFromProducts(products)}
                            />
                          )}
                          {input.type !== "select" && (
                            <Field type={input.type} name={input.name} className="input body" placeholder={input.placeholder} />
                          )}
                          <ErrorMessage name={input.name} component={"div"} className="input error" />
                        </div>
                      </div>
                    ))}
                    <div className="form-button-wrapper">
                      <button type="submit" disabled={isSubmitting}>
                        SUBMIT ORDER
                      </button>
                    </div>
                  </Form>
                )}
              </>
            )}
          </div>
        )}
      </Formik>
    </div>
  );
};

const mapStateToProps = (state: IInitialState) => ({
  products: state.products,
  newOrder: state.newOrder
});
const mapDispatchToProps = (dispatch: any, _: any) => ({
  updateNewOrder: (newOrder: object) => dispatch(updateNewOrder(newOrder))
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderForm);
