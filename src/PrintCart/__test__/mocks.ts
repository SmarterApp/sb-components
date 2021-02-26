import { ItemCardModel } from "@src/index";
import { currentId } from "async_hooks";

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

export const onAddOrRemoveSelectedItems = jest.fn((item: ItemCardModel) => {
  return;
});

export const onItemsReorder = jest.fn((i: number, j: number) => {
  return;
});
