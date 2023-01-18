import React from "react";
import { render } from "@testing-library/react";
import Application from "components/Application";

describe("Application", () => {

  it("renders without crashing", () => {
    render(<Application />);
  });

});
