import { ItemCardModel, BrailleTypeModel } from "@src/ItemCard/ItemCardModels";
import { SelectOptionProps } from "@src/Select/SelectOption";

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
    // if (item.isPerformanceItem && associatedItems) {
    //   if (item.itemKey in associatedItems) {
    //     const associatedItemsArray = associatedItems[item.itemKey];
    //     for (let i = 0; i < associatedItemsArray.length; i++) {
    //       if (item.selectedBrailleTypes)
    //         itemsWithSelectedBraille[associatedItemsArray[i][0].itemKey] =
    //           item.selectedBrailleTypes;
    //     }
    //   }
    // }
  });
  return itemsWithSelectedBraille;
}

// export function getBrailleLabelFromCode(brailleShortCode: string) {
//   let brailleFullName: string | null = null;
//   const brailleOptions = brailleDropdownOptions;
//   for (let i = 0; i < brailleOptions.length; i++) {
//     if (brailleOptions[i].value === brailleShortCode) {
//       brailleFullName = brailleOptions[i].label;
//     }
//   }
//   return brailleFullName;
// }

export function getBrailleLabelFromCode(
  availableBrailleTypes: BrailleTypeModel[],
  brailleShortCode: string
) {
  let brailleFullName: string | null = null;
  for (let i = 0; i < availableBrailleTypes.length; i++) {
    if (availableBrailleTypes[i].selectionCode === brailleShortCode) {
      brailleFullName = availableBrailleTypes[i].label;
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

export function getBrailleOptions(itemModel: ItemCardModel) {
  let _options: any[] = [];
  itemModel.availableBrailleTypes.forEach(option => {
    if (option.selectionCode !== "TDS_BT0") {
      _options.push({
        label: option.label,
        value: option.selectionCode,
        selected:
          itemModel.selectedBrailleTypes !== undefined
            ? itemModel.selectedBrailleTypes.indexOf(option.selectionCode) !==
              -1
              ? true
              : false
            : false,
        disabled: option.disabled
      });
    }
  });
  return _options;
}

//get universal braille selection options
export function getBrailleUniversalOptions(
  itemsInCart: ItemCardModel[],
  selectedBrailleValue: string[]
) {
  let brailleDropdownOptions: any[] = [];

  itemsInCart.forEach(option => {
    option.availableBrailleTypes.forEach(bt => {
      if (bt.selectionCode !== "TDS_BT0") {
        if (
          brailleDropdownOptions.filter(bo => bo.value == bt.selectionCode)
            .length == 0
        ) {
          const isSelected =
            selectedBrailleValue.indexOf(bt.selectionCode) !== -1
              ? true
              : false;
          brailleDropdownOptions.push({
            label: bt.label,
            value: bt.selectionCode,
            selected: isSelected,
            disabled: true
          });
        }
      }
    });

    if (
      brailleDropdownOptions != undefined &&
      brailleDropdownOptions.length > 0
    )
      option.availableBrailleTypes.forEach(bt => {
        var brailleIndex = brailleDropdownOptions.findIndex(
          obj => obj.value == bt.selectionCode && obj.disabled == true
        );
        if (brailleIndex !== -1) {
          brailleDropdownOptions[brailleIndex].disabled =
            bt.disabled == false ? false : true;
        }
      });
  });
  return brailleDropdownOptions;
}
