import { ItemCardModel, SearchResultContainerProps } from "..";
import {
  TestNameItemsPoolModel,
  itemKeys
} from "@src/ItemSearch/ItemSearchModels";

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
        selectedItems.push(item);
        shouldUpdateSelectedItemsState = true;
      }
    });

    if (selectedItems !== undefined && selectedItems.length > 0) {
      selectedItems.sort(function(a, b) {
        if (a.selectionIndex !== undefined && b.selectionIndex !== undefined)
          return a.selectionIndex - b.selectionIndex;
        else return 0 - 0;
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
        if (item.selected == true) {
        }
      });
    }
  }
  if (nextProps.totalItemCards) {
    nextProps.totalItemCards.forEach(item => {
      if (item.selected == true) {
      }
    });
  }

  return { selectedItems, associatedItems, shouldUpdateSelectedItemsState };
}

export function isPTAssociatedItemsInCart(
  item: ItemCardModel,
  associatedItemsInPrintCart: any
) {
  let result = false;
  const associatedItemKeyArray: any[] = Object.keys(associatedItemsInPrintCart);

  associatedItemKeyArray.forEach(itemKey_string => {
    const associateditems =
      associatedItemsInPrintCart[parseInt(itemKey_string)];
    associateditems.forEach((element: { itemKey: number }[]) => {
      if (element[0].itemKey === item.itemKey) {
        result = true;
      }
    });
  });
  return result;
}

export function getAssociatedItemCards(
  item: ItemCardModel,
  performanceTaskAssociatedItems: any[],
  totalItemCards?: ItemCardModel[]
) {
  let associatedItems: any = {};
  if (totalItemCards && item.itemKey in performanceTaskAssociatedItems) {
    const associatedItemsKey: any =
      performanceTaskAssociatedItems[item.itemKey];
    const itemCards =
      totalItemCards !== undefined ? totalItemCards.slice() : undefined;
    if (itemCards) {
      // associatedItems[item.itemKey] = itemCards.filter(item => associatedItems.includes(item.itemKey));
      let associatedItems_temp = [];
      for (let i = 0; i < associatedItemsKey.length; i++) {
        const x = itemCards.filter(
          item => item.itemKey === associatedItemsKey[i]
        );
        associatedItems_temp.push(x);
      }
      associatedItems[item.itemKey] = associatedItems_temp;
      return associatedItems[item.itemKey];
    }
  }
  return {};
}

export function deleteTestNameDetails(
  associatedItems: any,
  totalItemCards?: ItemCardModel[]
) {
  if (totalItemCards && totalItemCards.length > 0) {
    associatedItems.forEach((element: { itemKey: number }[]) => {
      let item = totalItemCards.filter(x => x.itemKey === element[0].itemKey);
      delete item[0].testNameInPrintCart;
      delete item[0].testOrderInPrintCart;
    });
  }
}

export function addTestNameDetails(
  item: ItemCardModel,
  testName: string,
  totalItemCards?: ItemCardModel[]
) {
  item.testNameInPrintCart =
    item.testName === undefined ? undefined : item.testName;
  item.testOrderInPrintCart =
    item.testOrder === undefined ? undefined : item.testOrder;
}

export function getItemPositionInTest(
  item: ItemCardModel,
  itemListInTest: itemKeys[]
) {
  for (let i = 0; i < itemListInTest.length; i++) {
    if (itemListInTest[i].itemKey === item.itemKey) {
      return itemListInTest[i];
    }
  }
  return null;
}

export function addTestName_associatedItems(
  associatedItems: any,
  testName: string,
  testItemsPool: TestNameItemsPoolModel[],
  totalItemCards?: ItemCardModel[]
) {
  const itemDetailsInTest = testItemsPool.filter(x => x.code === testName);
  const itemListInTest: itemKeys[] = itemDetailsInTest[0].itemKeys;
  if (totalItemCards && totalItemCards.length > 0) {
    associatedItems.forEach((element: { itemKey: number }[]) => {
      let item = totalItemCards.filter(
        x => x.itemKey === element[0].itemKey
      )[0];
      const itemKeyAndPosition = getItemPositionInTest(item, itemListInTest);
      if (itemKeyAndPosition !== null) {
        item.testNameInPrintCart = testName;
        item.testOrderInPrintCart = itemKeyAndPosition.itemPosition;
      } else {
        item.testNameInPrintCart =
          item.testName === undefined ? undefined : item.testName;
        item.testOrderInPrintCart =
          item.testOrder === undefined ? undefined : item.testOrder;
      }
    });
  }
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
  //reorder selectedItemIndex in original item list
  const oldIndexedItemSelectedIndex = array[oldIndex].selectionIndex;
  array[oldIndex].selectionIndex = array[newIndex].selectionIndex;
  array[newIndex].selectionIndex = oldIndexedItemSelectedIndex;
  array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
  return array;
}
