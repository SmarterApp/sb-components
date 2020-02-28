import { ItemCardModel, SearchResultContainerProps } from "..";

export function getUpdatedSelectedItems(item: ItemCardModel, selectedItems: ItemCardModel[]) {
    if (item.selected === true) {
      selectedItems.push(item);
    }
    else {
      selectedItems = selectedItems.filter(data => !(data.bankKey === item.bankKey &&
        data.itemKey === item.itemKey));
    }
    return selectedItems;
  }

export function shouldUpdateSelectedItemsInState(nextProps: SearchResultContainerProps, shouldUpdateSelectedItemsState: number) {
    let selectedItems: ItemCardModel[] = [];
    if (nextProps.totalItemCards) {
      nextProps.totalItemCards.forEach((item) => {
        if (item.selected === true) {
          selectedItems.push(item);
          shouldUpdateSelectedItemsState = 1;
        }
      });
    }
    return { selectedItems, shouldUpdateSelectedItemsState };
  }