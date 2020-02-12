import { SearchResultContainerProps, SearchResultType } from "@src/index";
import { itemCardList } from "@mocks/index";

export const mockSearchResultCardProps: SearchResultContainerProps = {
  isLinkTable: false,
  onRowSelection: () => {
    return;
  },
  onItemSelection: () => {
    return;
  },
  onResetItems: () => {
    let visibleItemCardCopy = [];
    visibleItemCardCopy = itemCardList.slice();
    visibleItemCardCopy.forEach((element) => {
      if (element.selected) {
        element.selected = false;
      }
    });
    return;
    //itemCardList = visibleItemCardCopy;
  },
  onPrintItems: () => {
    //console.log("Base method");
    return "";
  },
  itemCards: itemCardList,
  item: {
    kind: "none"
  },
  defaultRenderType: SearchResultType.ItemCard
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
