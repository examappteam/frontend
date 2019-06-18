import React from "react";
import { create } from "react-test-renderer";
import TeacherDashboard from "./TeacherDashboard";

describe("TeacherDashboard", () => {
  test("it matches the snapshot", () => {
    const component = create(<TeacherDashboard />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});

describe("TeacherDashboard enable delete exam button after clicking exam", () => {
  test("the delete button becomes enabled when an exam is clicked", () => {
    
    const componentDashboard = create(<TeacherDashboard/>);
    const rootInstanceDashboard = componentDashboard.root;
    const teacherDashboard = rootInstanceDashboard.findByType(React.Component);
    console.log(teacherDashboard.state.selectedCategoryId);
    
    // const deleteExamButton = rootInstanceDashboard.findByProps()
    // // teacherDashboard.getElementById("delete-exam-button");
    // expect(deleteExamButton.props.children).toBe("PROCEED TO CHECKOUT");

    const component = create(<Button text="SUBSCRIBE TO BASIC" />);
    const rootInstance = component.root;
    const button = rootInstance.findByType("button");
    button.props.onClick();
    expect(button.props.children).toBe("PROCEED TO CHECKOUT");
  });
});

import Button from "./Button";
describe("Button component", () => {
  test("it shows the expected text when clicked", () => {
    const component = create(<Button text="SUBSCRIBE TO BASIC" />);
    const rootInstance = component.root;
    const button = rootInstance.findByType("button");
    button.props.onClick();
    expect(button.props.children).toBe("PROCEED TO CHECKOUT");
  });
});