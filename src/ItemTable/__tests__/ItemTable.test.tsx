import "jsdom-global/register";
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as TestUtils from "react-dom/test-utils";
import { shallow, mount, render } from "enzyme";
import { itemCardList, testCodeToLabelMap_mock } from "@mocks/ItemCard/mocks";
import {
  getColumnsHeaderConfig_mock,
  tabClassNames
} from "@mocks/ItemTable/mocks";
import { itemHandler, getSelectedItemCount } from "./mocks";
import { aboutItemMockModel } from "@mocks/index";
import {
  ItemCardModel,
  GradeLevels,
  RubricModel,
  AboutItemModel,
  Resource,
  headerColumns,
  ItemCardViewer,
  ItemTable,
  ItemTableProps
} from "@src/index";
import { getUpdatedItemColumnsHeaderConfig } from "@src/SearchResultContainer/SearchResultContainerHelper";
import {
  ItemColumnHeadersConfig,
  itemColumnsName_Interim
} from "@src/SearchResultContainer/SearchResultModels";

describe("ItemTable", () => {
  const selectedItem = itemCardList[0];
  const itemResource: Resource<AboutItemModel> = {
    content: { ...aboutItemMockModel, itemCardViewModel: selectedItem },
    kind: "success"
  };

  const props: ItemTableProps = {
    cardRows: itemCardList,
    onRowExpand: itemHandler,
    onRowSelect: itemHandler,
    sort: [],
    columns: headerColumns,
    isLinkTable: false,
    isItemSelected: false,
    numberOfSelectedItem: 0,
    getSelectedItemCount: getSelectedItemCount,
    showErrorModalOnPrintItemsCountExceeded: itemHandler,
    associatedItems: [],
    countNumberOfItemsAfterSelection: itemHandler,
    isInterimSite: true,
    testCodeToLabelMap: testCodeToLabelMap_mock,
    itemTableConfig: getColumnsHeaderConfig_mock()
  };

  const propsExpanded: ItemTableProps = {
    ...props,
    item: itemResource,
    expandedRow: selectedItem
  };

  const wrapper = mount(
    <table>
      <ItemTable {...props} />
    </table>
  );
  const wrapperExpanded = mount(
    <table>
      <ItemTable {...propsExpanded} />
    </table>
  );

  it("matches snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("calls onRowSelection()", () => {
    const items = wrapper.find("td.item");
    items.forEach(item => {
      item.simulate("click");
      expect(props.onRowSelect).toHaveBeenCalled();
      // expect(props.onRowExpand).toHaveBeenCalled();
    });
  });

  // it("expands matches snapshot", () => {
  //   expect(wrapperExpanded).toMatchSnapshot();
  //   const itemCardViewer = wrapperExpanded.findWhere(
  //     node => node.type() === ItemCardViewer
  //   );
  //   expect(itemCardViewer).toBeDefined();
  // });
});
