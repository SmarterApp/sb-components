import {
  ItemTableProps,
  ItemTableContainerProps,
  ItemCardModel
} from "@src/index";
import { aboutItemMockModel } from "@mocks/AboutItem/mocks";
import { itemCardList, sortableItemCards } from "@mocks/index";

export const tabClassNames = [
  "item",
  "claim",
  "standard",
  "subject",
  "grade",
  "item-type",
  "Target"
];

export const itemTableProps: ItemTableContainerProps = {
  isInterimSite: false,
  isLinkTable: false,
  onRowSelection: () => {
    return;
  },
  onItemSelection: () => {
    return;
  },
  onCountNumberOfItemSelection: () => {
    return;
  },
  itemCards: itemCardList,
  item: {
    kind: "none"
  },

  numberOfSelectedItem: 0,
  getSelectedItemCount: () => {
    return 0;
  },
  showErrorModalOnPrintItemsCountExceeded: () => {
    return;
  },
  associatedItems: [],
  countNumberOfItemsAfterSelection: () => {
    return 0;
  },
  testCodeToLabelMap: { "Test-Name-1": "Test 1", "Test-Name-2": "Test 2" }
};

export const itemTableSortProps: ItemTableContainerProps = {
  ...itemTableProps,
  item: {
    kind: "none"
  },
  itemCards: sortableItemCards
};

export const itemTableSelectProps: ItemTableContainerProps = {
  ...itemTableProps,
  item: {
    kind: "success",
    content: aboutItemMockModel
  }
};
