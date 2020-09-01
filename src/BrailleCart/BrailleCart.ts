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
  selectedBrailleValue: string[],
  enableAllOptions?: boolean
) {
  let brailleDropdownOptions: any[] = [];

  //enable all options if parameter is provided for that
  if (enableAllOptions !== undefined && enableAllOptions === true) {
    brailleTotalDropdownOptions.forEach(option => {
      brailleDropdownOptions.push({
        label: option.label,
        value: option.value
      });
    });
  } else {
    //Enable only avaialble options and assign true to selected if option is already selected
    //and is already attached with item property - selectedBrailleValue
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
  }

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

export function getBrailleLabelFromCode(brailleShortCode: string) {
  let brailleFullName: string | null = null;
  const brailleOptions = brailleDropdownOptions;
  for (let i = 0; i < brailleOptions.length; i++) {
    if (brailleOptions[i].value === brailleShortCode) {
      brailleFullName = brailleOptions[i].label;
    }
  }
  return brailleFullName;
}

//Get associated items for a PT item in form of array of type - ItemCardModel[]
//return empty arrays if associated items not found
export function getAssociatedItems(
  item: ItemCardModel,
  associatedItems?: any[]
) {
  let associatedPtItems: ItemCardModel[] = [];
  if (item.isPerformanceItem && associatedItems !== undefined) {
    if (item.itemKey in associatedItems) {
      const associatedItemsArray = associatedItems[item.itemKey];
      for (let i = 0; i < associatedItemsArray.length; i++) {
        associatedPtItems.push(associatedItemsArray[i][0]);
      }
    }
  }
  return associatedPtItems;
}

export function isAnyBrailleOptionSelected(itemsInCart: ItemCardModel[]) {
  let isAnyBrailleOptionSelected: boolean = false;
  itemsInCart.forEach(item => {
    if (item.selectedBrailleTypes && item.selectedBrailleTypes.length > 0) {
      isAnyBrailleOptionSelected = true;
    }
  });
  return isAnyBrailleOptionSelected;
}

export const ptItemsToolTipMessage =
  "This is a Performance Task and must be selected as a group in a predefined sequence. PTs are designed as a complete activity to measure a student’s ability to demonstrate critical-thinking, problem-solving skills and/or complex analysis, and writing and research skills.";

//get universal braille selection options
export function getBrailleUniversalOptions(
  brailleTotalDropdownOptions: any[],
  selectedBrailleValue: string[]
) {
  let brailleDropdownOptions: any[] = [];

  brailleTotalDropdownOptions.forEach(option => {
    const isSelected =
      selectedBrailleValue.indexOf(option.value) !== -1 ? true : false;
    brailleDropdownOptions.push({
      label: option.label,
      value: option.value,
      selected: isSelected
    });
  });
  return brailleDropdownOptions;
}
