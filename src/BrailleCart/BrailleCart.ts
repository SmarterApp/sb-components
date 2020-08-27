import { ItemCardModel } from "@src/ItemCard/ItemCardModels";

export function getItemsWithSelectedBraille(
  itemsInCart: ItemCardModel[],
  associatedItems?: any[]
): { [key: number]: string[] } {
  let itemsWithSelectedBraille: { [key: number]: string[] } = {};
  itemsInCart.forEach(item => {
    if (item.selectedBrailleTypes !== undefined) {
      itemsWithSelectedBraille[item.itemKey] = item.selectedBrailleTypes;
    }
    if (item.isPerformanceItem && associatedItems) {
      if (item.itemKey in associatedItems) {
        const associatedItemsArray = associatedItems[item.itemKey];
        for (let i = 0; i < associatedItemsArray.length; i++) {
          if (item.selectedBrailleTypes)
            itemsWithSelectedBraille[associatedItemsArray[i][0].itemKey] =
              item.selectedBrailleTypes;
        }
      }
    }
  });
  return itemsWithSelectedBraille;
}
