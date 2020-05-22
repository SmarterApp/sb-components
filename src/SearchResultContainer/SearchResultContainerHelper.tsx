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
  shouldUpdateSelectedItemsState: boolean
) {
  let selectedItems: ItemCardModel[] = [];
  let associatedItems: any = [];
  shouldUpdateSelectedItemsState = false;
  if (
    nextProps.totalItemCards !== undefined &&
    nextProps.performanceTaskAssociatedItems !== undefined
  ) {
    nextProps.totalItemCards.forEach(item => {
      if (item.selected === true) {
        console.log(item.selectionIndex);
        selectedItems.push(item);
        shouldUpdateSelectedItemsState = true;
      }
    });

    if (selectedItems !== undefined && selectedItems.length > 0) {
      selectedItems.sort(function(a, b) {
        return (
          (a.selectionIndex !== undefined ? a.selectionIndex : -666) -
          (b.selectionIndex !== undefined ? b.selectionIndex : -665)
        );
      });
    }
    selectedItems.forEach(item => {
      if (item.isPerformanceItem) {
        const associatedItemsKey: any =
          nextProps.performanceTaskAssociatedItems[item.itemKey];
        const itemCards =
          nextProps.totalItemCards !== undefined
            ? nextProps.totalItemCards.slice()
            : undefined;
        if (itemCards) {
          // associatedItems[item.itemKey] = itemCards.filter(item => associatedItems.includes(item.itemKey));
          let associatedItems_temp = [];
          for (let i = 0; i < associatedItemsKey.length; i++) {
            const x = itemCards.filter(
              (associateditem: { itemKey: any }) =>
                associateditem.itemKey === associatedItemsKey[i]
            );
            associatedItems_temp.push(x);
          }
          associatedItems[item.itemKey] = associatedItems_temp;
        }
        //this.setState({ associatedItemsInPrintCart: associatedItems });
      }
    });

    if (nextProps.totalItemCards) {
      nextProps.totalItemCards.forEach(item => {
        if (item.selected == true)
          console.log(
            "total items cart after mount before setting  state : ",
            item
          );
      });
    }
  }
  if (nextProps.totalItemCards) {
    nextProps.totalItemCards.forEach(item => {
      if (item.selected == true)
        console.log(
          "total items cart after mount before setting  state : ",
          item
        );
    });
  }

  return { selectedItems, associatedItems, shouldUpdateSelectedItemsState };
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
  newIndex: number,
  totalItemsCard?: ItemCardModel[]
) {
  // if (newIndex >= array.length) {
  //   var k = newIndex - array.length + 1;
  //   while (k--) {
  //     array.push(undefined);
  //   }
  // }
  //reorder selectedItemIndex in original item list
  const oldIndexedItemSelectedIndex = array[oldIndex].selectionIndex;
  array[oldIndex].selectionIndex = array[newIndex].selectionIndex;
  array[newIndex].selectionIndex = oldIndexedItemSelectedIndex;
  array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
  return array;
}
