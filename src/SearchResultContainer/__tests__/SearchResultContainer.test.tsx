import * as React from "react";
import * as ReactDOM from "react-dom";
import * as TestUtils from "react-dom/test-utils";
import { shallow, mount, render, ShallowWrapper } from "enzyme";
import {
  mockSearchResultTableProps,
  mockSearchResultCardProps,
  mockSearchResultEmptyProps
} from "@mocks/SearchResultContainer/mocks";
import { SearchResultContainer } from "@src/index";

describe("SearchResultContainer", () => {
  it("onload matches snapshot table", () => {
    const wrapper = shallow(
      <SearchResultContainer {...mockSearchResultTableProps} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("onload matches snapshot ItemCards", () => {
    const wrapper = shallow(
      <SearchResultContainer {...mockSearchResultCardProps} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("empty itemCards", () => {
    const wrapper = shallow(
      <SearchResultContainer {...mockSearchResultEmptyProps} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("table to card transition", () => {
    const wrapper = shallow(
      <SearchResultContainer {...mockSearchResultTableProps} />
    );
    const eventMock = { currentTarget: { value: "1" } };

    wrapper
      .findWhere(node => node.type() === "button")
      .at(1)
      .simulate("click", eventMock);
    expect(wrapper).toMatchSnapshot();
  });

  it("card to table transition", () => {
    const wrapper = shallow(
      <SearchResultContainer {...mockSearchResultCardProps} />
    );
    const eventMock = { currentTarget: { value: "0" } };

    wrapper
      .findWhere(node => node.type() === "button")
      .at(0)
      .simulate("click", eventMock);
    expect(wrapper).toMatchSnapshot();
  });

  it("<clear> button should be disabled and <Select all> button should be enabled if no item is selected", () => {
    const wrapper = shallow(
      <SearchResultContainer {...mockSearchResultCardProps} />
    );
    const isClearButtonDisabled = wrapper
      .find(`button[id="reset-item-selection"]`)
      .hasClass("disabled");
    const isSelectAllButtonDisabled = wrapper
      .find(`button[id="select-all-items-btn"]`)
      .hasClass("disabled");
    expect(isClearButtonDisabled).toBe(true);
    expect(isSelectAllButtonDisabled).toBe(false);
  });

  //If a PT item is clicked its PT associated items also get added to print cart
  //In mocks 1st, 2nd and 3rd items are PT Items. Go through the mock if test get failed and change accordingly
  it(
    "on selection of 1st and last(4th) item in table <clear> & <Select all> button should get enabled and disabled respectively "
  ),
    () => {
      const wrapper = shallow(
        <SearchResultContainer {...mockSearchResultCardProps} />
      );
      wrapper
        .find(`button.btn-item-add-remove-grid`)
        .at(0)
        .simulate("click");
      wrapper
        .find(`button.btn-item-add-remove-grid`)
        .at(3)
        .simulate("click");
      const isClearButtonDisabled = wrapper
        .find(`button[title="Clear Selection"]`)
        .hasClass("disabled");
      const isSelectAllButtonDisabled = wrapper
        .find(`button[title="Select All"]`)
        .hasClass("disabled");
      expect(isClearButtonDisabled).toBe(false);
      expect(isSelectAllButtonDisabled).toBe(true);
    };

  //run same as above for item card also
  it(
    "on selection of 1st and last(4th) item in card view <clear> & <Select all> button should get enabled and disabled respectively "
  ),
    () => {
      const wrapper = shallow(
        <SearchResultContainer {...mockSearchResultCardProps} />
      );
      wrapper
        .find(`button.btn-add-remove-print-selection`)
        .at(0)
        .simulate("click");
      wrapper
        .find(`button.btn-add-remove-print-selection`)
        .at(3)
        .simulate("click");
      const isClearButtonDisabled = wrapper
        .find(`button[title="Clear Selection"]`)
        .hasClass("disabled");
      const isSelectAllButtonDisabled = wrapper
        .find(`button[title="Select All"]`)
        .hasClass("disabled");
      expect(isClearButtonDisabled).toBe(false);
      expect(isSelectAllButtonDisabled).toBe(true);
    };
});
