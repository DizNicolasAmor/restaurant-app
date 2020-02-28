import React, { useState } from "react";
import { connect } from "react-redux";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Button, Spin, Typography } from "antd";
import { formProductConfig } from "./formProductHelpers";
import { IProduct, IInitialState } from "../../store";
import { setIsModalProductOpened } from "../../actions";
import "./FormProduct.css";

interface IFormProductProps {
  productModalConfig: IProduct;
  setIsModalProductOpened: (bool: boolean) => any;
}

const FormProduct: React.FC<IFormProductProps> = ({ productModalConfig, setIsModalProductOpened }) => {
  const [messageFromServer, setMessageFromServer] = useState("");

  if (messageFromServer) {
    return (
      <>
        <Typography.Text type="danger">{messageFromServer}</Typography.Text>
        <Button
          type="default"
          onClick={() => {
            setMessageFromServer("");
            setIsModalProductOpened(false);
          }}
          style={{ display: "block", margin: "12px auto" }}
        >
          BACK
        </Button>
      </>
    );
  }

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Formik
        initialValues={productModalConfig}
        validationSchema={formProductConfig.validationSchema}
        onSubmit={(values, { setSubmitting }) =>
          formProductConfig.onSubmit(values, setSubmitting, setMessageFromServer, productModalConfig.id)
        }
      >
        {({ isSubmitting, submitForm }) => (
          <div>
            {isSubmitting ? (
              <Spin size="large" />
            ) : (
              <Form>
                {formProductConfig.inputs.map(input => (
                  <div key={input.name}>
                    <div className="input__wrapper">
                      <div className={`input title ${input.name}`}>{input.title}</div>
                      <Field
                        type={input.type}
                        name={input.name}
                        className="input body"
                        placeholder={input.placeholder}
                        disabled={input.disabled}
                      />
                      <ErrorMessage name={input.name} component={"div"} className="input error" />
                    </div>
                  </div>
                ))}
                <div className="form-button-wrapper">
                  <Button type="primary" onClick={() => submitForm()} disabled={isSubmitting}>
                    SUBMIT
                  </Button>
                  <Button type="danger" onClick={() => setIsModalProductOpened(false)}>
                    CANCEL
                  </Button>
                </div>
              </Form>
            )}
          </div>
        )}
      </Formik>
    </div>
  );
};

const mapStateToProps = (state: IInitialState) => ({
  productModalConfig: state.productModalConfig
});
const mapDispatchToProps = (dispatch: any, _: any) => ({
  setIsModalProductOpened: (bool: boolean) => dispatch(setIsModalProductOpened(bool))
});

export default connect(mapStateToProps, mapDispatchToProps)(FormProduct);
