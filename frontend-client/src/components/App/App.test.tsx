import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";
import { initialState } from "../../store";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("<App />", () => {
  const store = mockStore(initialState);
  let component: any;

  beforeEach(() => {
    component = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });

  it("Renders text Restaurant App", () => {
    expect(component.getByText(/Restaurant App/i)).toBeInTheDocument();
  });
});
