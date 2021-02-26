import { ItemCardModel } from "./ItemCardModels";

export function getContentStandardCode(
  subjectCode: any,
  claimCode: any,
  commonCoreStandardId: any,
  ccssDescription: any
) {
  commonCoreStandardId =
    commonCoreStandardId == null || commonCoreStandardId == undefined
      ? "Not Available"
      : commonCoreStandardId;
  ccssDescription =
    ccssDescription == null || ccssDescription == undefined
      ? "Content Standard information is currently unavailable for this item."
      : ccssDescription;

  //For math items and claim from 2 to 4
  if (
    subjectCode === "MATH" &&
    (claimCode == "MATH2" || claimCode == "MATH3" || claimCode == "MATH4")
  ) {
    commonCoreStandardId = "Math Practice";
    ccssDescription =
      "Items in this claim primarily measure the Standards for Mathematical Practice rather than Content Standards.";
  }

  return { commonCoreStandardId, ccssDescription };
}

/**
 * Get number items that will go to print carts once user selects a item or multiple items
 */
export function countNumberOfItemsAfterSelection(
  items: ItemCardModel[],
  currentCount: number,
  totalAssociatedItems: any
) {
  let itemsToExcludeCounting: number[] = [];
  let count = 0;
  items.forEach(item => {
    if (!item.isPerformanceItem) {
      count = count + 1;
    } else {
      if (item.itemKey in totalAssociatedItems) {
        if (itemsToExcludeCounting.indexOf(item.itemKey) === -1) {
          itemsToExcludeCounting.push(...totalAssociatedItems[item.itemKey]);
          const associatedItemsCount =
            totalAssociatedItems[item.itemKey].length;
          count = count + associatedItemsCount;
        }
      }
    }
  });
  return count + currentCount;
}
