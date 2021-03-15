import "jsdom-global/register";
import * as React from "react";
import { shallow, mount, render } from "enzyme";
import { itemCardList, testCodeToLabelMap_mock } from "@mocks/ItemCard/mocks";
import { itemHandler } from "./mocks";
import {
  GradeLevels,
  RubricModel,
  AboutItemModel,
  Resource,
  ItemCardModel,
  headerColumns,
  ItemTableRowProps,
  ItemTableRow
} from "@src/index";
import { getColumnsHeaderConfig_mock } from "../mocks";

describe("ItemTableRow", () => {
  const rubrics: RubricModel[] = [];
  const selectedItem = itemCardList[0];

  const props: ItemTableRowProps = {
    rowData: selectedItem,
    hasControls: true,
    columns: headerColumns,
    isExpanded: false,
    onRowExpand: itemHandler,
    onRowSelect: itemHandler,
    isInterimSite: true,
    testCodeToLabelMap: testCodeToLabelMap_mock,
    associatedItems: [],
    countNumberOfItemsAfterSelection: () => 1,
    isItemSelected: true,
    getSelectedItemCount: () => 4,
    itemTableConfig: getColumnsHeaderConfig_mock(),
    numberOfSelectedItem: 4,
    showErrorModalOnPrintItemsCountExceeded: () => false
  };

  const wrapper = mount(
    <table>
      <tbody>
        <ItemTableRow {...props} />
      </tbody>
    </table>
  );
  const wrapperExpanded = shallow(
    <ItemTableRow {...props} isExpanded={true} />
  );

  it("matches snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("matches expand snapshot", () => {
    expect(wrapperExpanded).toMatchSnapshot();
  });

  it("calls row events", () => {
    const item = wrapper.find("td.item");
    item.simulate("click");
    expect(props.onRowSelect).toHaveBeenCalled();
    expect(props.onRowExpand).toHaveBeenCalled();
  });
});
