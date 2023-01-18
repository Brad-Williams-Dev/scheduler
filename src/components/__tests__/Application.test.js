import React from "react";
import axios from "axios";
import {
  render,
  cleanup,
  waitForElement,
  fireEvent,

  getByText,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  queryByText,
  getAllByAltText
}
  from "@testing-library/react";



import Application from "components/Application";

afterEach(cleanup);
describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText("Monday"))
      .then(() => {
        fireEvent.click(getByText("Tuesday"));
        expect(getByText("Leopold Silvers")).toBeInTheDocument();
      });
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));

  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(
      container,
      "appointment"
    ).find((appointment) => queryByText(appointment, "Archie Cohen"));

    fireEvent.click(getByAltText(appointment, "Delete"));
    expect(queryByText(appointment, /Are you sure you would like to delete/i)).toBeInTheDocument();


    fireEvent.click(getByText(appointment, "Confirm"));
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    await waitForElement(() => getByAltText(appointment, "Add"));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce(new Error("Error"));

    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const firstEmpty = getAllByAltText(container, "Add")[0];
    fireEvent.click(firstEmpty);


    const input = getByPlaceholderText(container, "Enter Student Name");
    const interviewer = getByAltText(container, "Sylvia Palmer");
    fireEvent.change(input, { target: { value: "Lydia Miller-Jones" } });
    fireEvent.click(interviewer);
    fireEvent.click(getByText(container, "Save"));

    expect(getByText(container, "Saving")).toBeInTheDocument();
    await waitForElement(() => getByText(container, "Error while trying to save!"));
    expect(getByText(container, "Error")).toBeInTheDocument();
  });

  it("shows the delete error when failing to delete an appointment", async () => {
    axios.delete.mockRejectedValueOnce(new Error("Error"));

    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(getByAltText(appointment, "Delete"));

    expect(queryByText(appointment, /are you sure/i)).toBeInTheDocument();

    fireEvent.click(getByText(appointment, "Confirm"));

    expect(getByText(appointment, "Deleting")).toBeInTheDocument();


    await waitForElement(() => getByText(container, "Error while trying to delete!"));
    expect(getByText(container, "Error")).toBeInTheDocument();
  });


})

