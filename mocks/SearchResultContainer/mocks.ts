import {
  SearchResultContainerProps,
  SearchResultType,
  SearchAPIParamsModel
} from "@src/index";
import {
  itemCardList,
  totalItemsCardList,
  performanceTaskAssociatedItems,
  allAccessibilityResourceGroups
} from "@mocks/index";
import { mockSeachAPI } from "@mocks/ItemSearch/mocks";
import {
  accessibilityEnglishGlossary,
  accessibilityManyOptionsMock
} from "lib/mocks/Accessibility/mocks";
import { translationAccessibilityDropDown } from "@mocks/Accessibility/mocks";

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

  onResetItems: () => {
    let visibleItemCardCopy = [];
    visibleItemCardCopy = itemCardList.slice();
    visibleItemCardCopy.forEach(element => {
      if (element.selected) {
        element.selected = false;
      }
    });
    return;
    //itemCardList = visibleItemCardCopy;
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
  translationAccessibility: translationAccessibilityDropDown
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
