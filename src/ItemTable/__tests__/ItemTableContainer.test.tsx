import "jsdom-global/register";
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as TestUtils from "react-dom/test-utils";
import { shallow, mount, render } from "enzyme";
import { tabClassNames } from "@mocks/ItemTable/mocks";
import { aboutItemMockModel, itemCardList } from "@mocks/index";
import {
  itemHandler,
  getSelectedItemCount,
  countNumberOfItemsAfterSelection,
  showErrorModal,
  onCountNumberOfItemSelection
} from "./mocks";

import {
  GradeLevels,
  RubricModel,
  AboutItemModel,
  Resource,
  ItemCardModel,
  ItemTableContainerProps,
  ItemTableContainer,
  ItemCardViewer
} from "@src/index";
import { PTassociatedItems } from "@mocks/ItemCard/mocks";

describe("ItemPageTable", () => {
  const selectedItem = itemCardList[0];
  const item: Resource<AboutItemModel> = {
    content: { ...aboutItemMockModel, itemCardViewModel: selectedItem },
    kind: "success"
  };

  const props: ItemTableContainerProps = {
    item: item,
    itemCards: itemCardList,
    onRowSelection: itemHandler,
    onItemSelection: itemHandler,
    isLinkTable: false,
    onCountNumberOfItemSelection: onCountNumberOfItemSelection,
    getSelectedItemCount: getSelectedItemCount,
    numberOfSelectedItem: 3,
    countNumberOfItemsAfterSelection: countNumberOfItemsAfterSelection,
    showErrorModalOnPrintItemsCountExceeded: showErrorModal,
    associatedItems: PTassociatedItems
  };

  const wrapper = mount(<ItemTableContainer {...props} />);

  it("matches snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("sorts list on header click", () => {
    tabClassNames.forEach(tab => {
      wrapper.find(`th.${tab}`).simulate("click");
      expect(wrapper).toMatchSnapshot();
    });
  });

  it("calls onRowSelection()", () => {
    const items = wrapper.find("td.item");
    items.forEach(item => {
      item.simulate("click");
      expect(props.onRowSelection).toHaveBeenCalled();
      expect(props.onRowSelection).toHaveBeenCalled();
    });
  });
});
