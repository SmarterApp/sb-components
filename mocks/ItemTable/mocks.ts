import {
  ItemTableProps,
  ItemTableContainerProps,
  ItemCardModel
} from "@src/index";
import { aboutItemMockModel } from "@mocks/AboutItem/mocks";
import { itemCardList, sortableItemCards } from "@mocks/index";

export const tabClassNames = [
  "item",
  "claimAndTarget",
  "subject",
  "grade",
  "item-type"
];

export const itemTableProps: ItemTableContainerProps = {
  isLinkTable: false,
  onRowSelection: () => {
    return;
  },
  onItemSelection: () => {
    return;
  },
  // onCountNumberOfItemSelection: () => {
  //   return;
  // },
  itemCards: itemCardList,
  item: {
    kind: "none"
  },
  // numberOfSelectedItem: 0
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
