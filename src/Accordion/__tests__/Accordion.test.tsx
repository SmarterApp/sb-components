import * as React from "react";
import { shallow } from "enzyme";
import { Accordion, AccordionProps, AccordionState } from "../Accordion";

function getJSXElement() {
  return <div>test</div>;
}

const accordionProps: AccordionProps = {
  accordionTitle: "testAccordion",
  isOpen: false
};

const accordionState: AccordionState = {
  title: "testAccordion",
  isOpen: true
};

describe("Accordion", () => {
  const wrapper = shallow(<Accordion {...accordionProps} />);

  it("matches snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("renders open accordion", () => {
    const wrapperInstance = wrapper.instance() as Accordion;
    wrapperInstance.setState({ isOpen: accordionState.isOpen });

    expect(wrapper).toMatchSnapshot();
  });

  it("call handle show content", () => {
    const wrapperInstance = wrapper.instance() as Accordion;
    wrapperInstance.handleShowContent();
    expect(wrapper).toMatchSnapshot();
  });
});
