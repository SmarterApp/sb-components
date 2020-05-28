import "jsdom-global/register";
import * as React from "react";
import * as TestUtils from "react-dom/test-utils";
import { shallow, mount, render } from "enzyme";
import { itemCardList, PTassociatedItems } from "@mocks/ItemCard/mocks";

import { onAddOrRemoveSelectedItems, onItemsReorder } from "./mocks";
import {
  RubricModel,
  headerColumns,
  PrintCartItemTableRow,
  PrintCartItemTableRowProps
} from "@src/index";

describe("ItemTableRow", () => {
  const rubrics: RubricModel[] = [];
  const selectedItem = itemCardList[1];

  const props: PrintCartItemTableRowProps = {
    ItemCard: selectedItem,
    TotalItemsCard: itemCardList,
    associatedItemsInPrintCart: PTassociatedItems[3206],
    onAddOrRemoveSelectedItems: onAddOrRemoveSelectedItems,
    onItemsReorder: onItemsReorder,
    columns: headerColumns,
    isLinkTable: false,
    itemSequence: 2,
    index: 1
  };

  const wrapper = mount(
    <table>
      <tbody>
        <PrintCartItemTableRow {...props} />
      </tbody>
    </table>
  );

  it("matches snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
