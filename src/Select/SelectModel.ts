import { dir } from "console";

export interface MultiSelectValue {
  value: string;
  label: string;
  selected: boolean;
  disabled?: boolean;
}

export const UP_KEY = 38;
export const DOWN_KEY = 40;

export interface MultiSelectToggle {
  selectedItemsCount: number;
  isAllSelected: boolean;
}

export const multiSelectOptions: MultiSelectValue[] = [
  {
    value: "tb_in",
    label: "EBAE Contracted",
    disabled: true,
    selected: false
  },
  {
    value: "xy_zb",
    label: "EBAE with Nemeth Uncontracted",
    disabled: false,
    selected: false
  },
  {
    value: "op_gh",
    label: "EBAE with Nemeth Contracted",
    disabled: true,
    selected: false
  },
  {
    value: "xy_zb_2",
    label: "EBAE with Nemeth Uncontracted",
    disabled: false,
    selected: false
  }
];

export const getItemIndexInDirection = (
  itemArray: MultiSelectValue[],
  currentIndex: number,
  direction: string
) => {
  // let currentIndex = getIndexOfItemInArray(itemArray, currentIndexValue);
  if (currentIndex !== -1 && direction === "NEXT") {
    currentIndex += 1;
    while (currentIndex < itemArray.length) {
      if (
        itemArray[currentIndex].disabled !== undefined &&
        itemArray[currentIndex].disabled !== true
      ) {
        return currentIndex;
      }
      currentIndex++;
    }
  }
  if (currentIndex !== -1 && direction === "PREVIOUS") {
    currentIndex -= 1;
    while (currentIndex >= 0) {
      if (
        itemArray[currentIndex].disabled !== undefined &&
        itemArray[currentIndex].disabled !== true
      ) {
        return currentIndex;
      }
      currentIndex--;
    }
  }
};

export const getIndexOfItemInArray = (
  itemArray: MultiSelectValue[],
  value: string
) => {
  for (let i = 0; i < itemArray.length; i++) {
    if (itemArray[i].value === value) {
      return i;
    }
  }
  return -1;
};

export const getFirstEnabledItem = (itemArray: MultiSelectValue[]) => {
  for (let i = 0; i < itemArray.length; i++) {
    if (
      itemArray[i].disabled !== undefined &&
      itemArray[i].disabled === false
    ) {
      return i;
    }
  }
  return -1;
};

export const getButtonTextDetails = (
  itemArray: MultiSelectValue[]
): MultiSelectToggle => {
  let selectedItemsCount: number = 0;
  let isAllSelected: boolean = true;
  itemArray.forEach(item => {
    if (item.disabled !== undefined && item.disabled === false) {
      if (item.selected) {
        selectedItemsCount++;
      } else {
        isAllSelected = false;
      }
    }
  });
  return { isAllSelected, selectedItemsCount };
};

export const getFirstSelectedItem = (itemArray: MultiSelectValue[]) => {
  for (let i = 0; i < itemArray.length; i++) {
    if (
      itemArray[i].disabled !== undefined &&
      itemArray[i].disabled === false &&
      itemArray[i].selected === true
    ) {
      return itemArray[i].label;
    }
  }
  return null;
};
