import {
  SearchResultContainerProps,
  SearchResultType,
  SearchAPIParamsModel
} from "@src/index";
import {
  itemCardList,
  totalItemsCardList,
  performanceTaskAssociatedItems
} from "@mocks/index";
import { mockSeachAPI } from "@mocks/ItemSearch/mocks";

export const mockSearchResultCardProps: SearchResultContainerProps = {
  isLinkTable: false,
  isInterimSite: true,
  totalItemCards: totalItemsCardList,
  showSelectAllButton: true,
  isPrintLimitEnabled: true,
  testItemsPool: [
    {
      code: "Test-Name-1",
      itemKeys: [
        {
          itemKey: 3206,
          itemPosition: 1
        },
        {
          itemKey: 3163,
          itemPosition: 2
        },
        {
          itemKey: 3615,
          itemPosition: 3
        }
      ]
    }
  ],
  onRowSelection: () => {
    return;
  },
  onItemSelection: () => {
    return;
  },

  onDownloadBraille: (selectedBrailleType: { [key: number]: string[] }) => {
    return;
  },

  onResetItems: () => {
    let visibleItemCardCopy = [];
    visibleItemCardCopy = itemCardList.slice();
    visibleItemCardCopy.forEach(element => {
      if (element.selected) {
        element.selected = false;
      }
    });
    return;
  },
  onSelectAll: () => {
    let visibleItemCardCopy = [];
    visibleItemCardCopy = itemCardList.slice();
    visibleItemCardCopy.forEach(element => {
      if (!element.selected) {
        element.selected = true;
      }
    });
    return;
  },
  onPrintItems: () => {
    return "";
  },
  searchAPI: mockSeachAPI,
  itemCards: itemCardList,
  item: {
    kind: "none"
  },
  defaultRenderType: SearchResultType.ItemCard,
  performanceTaskAssociatedItems: performanceTaskAssociatedItems,
  testCodeToLabelMap: { "Test-Name-1": "Test 1", "Test-Name-2": "Test 2" },
  itemIdToTestNameMap: {
    3206: {
      testName: "Test 1",
      testOrder: 1
    },
    3163: {
      testName: "Test 1",
      testOrder: 2
    },
    3615: {
      testName: "Test 1",
      testOrder: 3
    },
    2928: {
      testName: "Test 2",
      testOrder: 1
    }
  }
};

export const mockSearchResultTableProps: SearchResultContainerProps = {
  ...mockSearchResultCardProps,
  defaultRenderType: SearchResultType.Table
};

export const mockSearchResultEmptyProps: SearchResultContainerProps = {
  ...mockSearchResultCardProps,
  itemCards: undefined,
  item: {
    kind: "none"
  },
  defaultRenderType: SearchResultType.ItemCard
};
