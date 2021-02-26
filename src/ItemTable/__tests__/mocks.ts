import { ItemCardModel } from "@src/index";

export const itemHandler = jest.fn((item: ItemCardModel) => {
  return undefined;
});

export const getSelectedItemCount = jest.fn(() => {
  return;
});

export const countNumberOfItemsAfterSelection = jest.fn(
  (currentItems: ItemCardModel[], selectedItemsCount: number) => {
    return;
  }
);

export const showErrorModal = jest.fn(() => {
  return undefined;
});

export const onCountNumberOfItemSelection = jest.fn(() => {
  return undefined;
});
