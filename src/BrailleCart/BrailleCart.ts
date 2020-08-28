import { ItemCardModel } from "@src/ItemCard/ItemCardModels";
import { SelectOptionProps } from "@src/Select/SelectOption";

export const brailleDropdownOptions = [
  // { label: "No Braille", value: "TDS_BT0" },
  { label: "EBAE Contracted", value: "TDS_BT_ECL" },
  { label: "EBAE Uncontracted", value: "TDS_BT_EXL" },
  { label: "EBAE with Nemeth Contracted", value: "TDS_BT_ECN" },
  { label: "EBAE with Nemeth Uncontracted", value: "TDS_BT_EXN" },
  { label: "UEB Contracted", value: "TDS_BT_UCL" },
  { label: "UEB Uncontracted", value: "TDS_BT_UXL" },
  { label: "UEB with Nemeth Contracted", value: "TDS_BT_UCN" },
  { label: "UEB with Nemeth Uncontracted", value: "TDS_BT_UXN" },
  { label: "UEB with UEB Technical Contracted", value: "TDS_BT_UCT" },
  { label: "UEB with UEB Technical Uncontracted", value: "TDS_BT_UXT" }
];

//get dropdown options for available braille types for an specific item
export function getBrailleDowndrownOptions(
  brailleTotalDropdownOptions: any[],
  availableBrailleValue: string[],
  selectedBrailleValue: string[]
) {
  let brailleDropdownOptions: any[] = [];
  brailleTotalDropdownOptions.forEach(option => {
    if (availableBrailleValue.indexOf(option.value) !== -1) {
      brailleDropdownOptions.push({
        label: option.label,
        value: option.value,
        selected:
          selectedBrailleValue.indexOf(option.value) !== -1 ? true : false
      });
    } else {
      brailleDropdownOptions.push({
        label: option.label,
        value: option.value,
        selected: false,
        disabled: true
      });
    }
  });
  return brailleDropdownOptions;
}

export function getBrailleMenuOptions(
  braileTypes: string[],
  selectedBraille: string
) {
  const brailleTypeOptions: SelectOptionProps[] = [];
  braileTypes.forEach(braileType => {
    brailleTypeOptions.push({
      label: braileType,
      value: braileType,
      disabled: false,
      selected: selectedBraille === braileType
    });
  });
  return brailleTypeOptions;
}

//get selected braille type of each items in cart
//in key value pair as associative array
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
