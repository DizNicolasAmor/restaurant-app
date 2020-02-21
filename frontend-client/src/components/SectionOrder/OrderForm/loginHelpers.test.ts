import { IOrderFormInputs, orderFormConfig } from "./orderFormHelpers";

describe("orderFormHelpers.ts", () => {
  it("inputs is not empty", () => {
    expect(orderFormConfig.inputs.length > 0).toBe(true);
  });

  it("inputs must contain an email input", () => {
    const doesContainAnEmailTypeInput = (obj: IOrderFormInputs) => obj.type === "email";
    expect(orderFormConfig.inputs.some(doesContainAnEmailTypeInput)).toBe(true);
  });

  it("inputs must contain a select input", () => {
    const doesContainAnEmailTypeInput = (obj: IOrderFormInputs) => obj.type === "select";
    expect(orderFormConfig.inputs.some(doesContainAnEmailTypeInput)).toBe(true);
  });

  it("initialValues must contain a key buyername", () => {
    expect(Object.keys(orderFormConfig.initialValues).includes("buyername")).toBe(true);
  });

  it("initialValues must contain a key buyeremail", () => {
    expect(Object.keys(orderFormConfig.initialValues).includes("buyeremail")).toBe(true);
  });
});
