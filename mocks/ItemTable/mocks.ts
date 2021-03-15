import {
  ItemTableProps,
  ItemTableContainerProps,
  ItemCardModel
} from "@src/index";
import { aboutItemMockModel } from "@mocks/AboutItem/mocks";
import { itemCardList, sortableItemCards } from "@mocks/index";
import {
  ItemColumnHeadersConfig,
  itemColumnsName_Interim
} from "@src/SearchResultContainer/SearchResultModels";

export const tabClassNames = [
  "item",
  "stimulus",
  "item-position-in-test",
  "subject",
  "grade",
  "testname",
  "claim",
  "Target",
  "standard",
  "dok",
  "difficulty",
  "answerkeys"
];

export const itemTableProps: ItemTableContainerProps = {
  isInterimSite: true,
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
  testCodeToLabelMap: { "Test-Name-1": "Test 1", "Test-Name-2": "Test 2" },
  itemColumnHeaderConfig: []
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

export function getColumnsHeaderConfig_mock() {
  const headerModel: ItemColumnHeadersConfig[] = [];
  let i = 0;
  const itemsHeaderName = itemColumnsName_Interim;
  itemsHeaderName.forEach(element => {
    let column: ItemColumnHeadersConfig = {
      headerName: element,
      columnIndex: ++i,
      isHidden: false,
      isSortable: true
    };
    headerModel.push(column);
  });
  return headerModel;
}
