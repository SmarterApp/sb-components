import { ItemCardModel, SearchResultContainerProps } from "..";

export function getUpdatedSelectedItems(
  item: ItemCardModel,
  selectedItems: ItemCardModel[]
) {
  if (item.selected === true) {
    selectedItems.push(item);
  } else {
    selectedItems = selectedItems.filter(
      data => !(data.bankKey === item.bankKey && data.itemKey === item.itemKey)
    );
  }
  return selectedItems;
}

export function shouldUpdateSelectedItemsInState(
  nextProps: SearchResultContainerProps,
  shouldUpdateSelectedItemsState: number
) {
  let selectedItems: ItemCardModel[] = [];
  if (nextProps.totalItemCards) {
    nextProps.totalItemCards.forEach(item => {
      if (item.selected === true) {
        selectedItems.push(item);
        shouldUpdateSelectedItemsState = 1;
      }
    });
  }
  return { selectedItems, shouldUpdateSelectedItemsState };
}

export function areSelectedItemsHaveMath(
  totalSelectedItemsCount: number,
  totalItemsCard?: ItemCardModel[]
) {
  let areSelectedItemsHaveMath: boolean = false;
  if (totalItemsCard !== undefined && totalSelectedItemsCount > 0) {
    let len = totalItemsCard.length;
    for (let i = 0; i < len; i++) {
      if (
        totalItemsCard[i].selected === true &&
        totalItemsCard[i].subjectCode === "MATH"
      ) {
        areSelectedItemsHaveMath = true;
        break;
      }
    }
  }
  return areSelectedItemsHaveMath;
}

export function moveArrayItemToNewIndex(
  array: ItemCardModel[],
  oldIndex: number,
  newIndex: number
) {
  // if (newIndex >= array.length) {
  //   var k = newIndex - array.length + 1;
  //   while (k--) {
  //     array.push(undefined);
  //   }
  // }
  array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
  return array;
}
