import * as React from "react";
import {
  getResourceContent,
  ItemCard,
  ItemTableRow,
  ToolTip,
  ItemCardViewer,
  ItemCardModel,
  itemIdEqual,
  AboutItemModel,
  Resource,
  HeaderSortModel,
  SortColumnModel,
  ColumnGroup
} from "@src/index";
import { PrintCartItemTableRow } from "./PrintCartItemTableRow";
import {
  TestCodeToLabel,
  ItemIdToTestNameMap
} from "@src/ItemSearch/ItemSearchModels";

export interface PrintCartTableProps {
  itemsInPrintCart: ItemCardModel[];
  associatedItemsInPrintCart?: ItemCardModel[];
  sort: HeaderSortModel[];
  onAddOrRemoveSelectedItems: (item: ItemCardModel) => void;
  onItemsReorder: (i: number, j: number) => void;
  columns: ColumnGroup[];
  isLinkTable: boolean;
  isItemSelected: boolean;
  isInterimSite: boolean;
  testCodeToLabelMap: TestCodeToLabel;
  itemIdToTestNameMap: ItemIdToTestNameMap;
}
/**
 * Renders the table populated from an array of ItemCardModels. Also renders an instance of the ItemCardViewer,
 * inserting a responsive sub-table with an iframe that displays the Item Card.
 * @class ItemTable
 * @extends {React.Component<ItemTableProps, {}>}
 */
export class PrintCartTable extends React.Component<PrintCartTableProps, {}> {
  constructor(props: PrintCartTableProps) {
    super(props);
  }

  getLengthOfItemAssociatedItems = (associatedItems: any) => {
    let length = 0;
    if (associatedItems) {
      associatedItems.map((_item: { itemKey: any }) => {
        length = length + 1;
      });
    }
    return length;
  };

  renderAllRows(): JSX.Element[] {
    let nextSequenceIndex = 1;
    return this.props.itemsInPrintCart.map((item, index) => {
      const sequenceIndex = nextSequenceIndex;
      if (
        item.isPerformanceItem === true &&
        this.props.associatedItemsInPrintCart != undefined
      ) {
        const associatedItemsInPrintCart = this.props
          .associatedItemsInPrintCart[item.itemKey];
        nextSequenceIndex =
          nextSequenceIndex +
          this.getLengthOfItemAssociatedItems(associatedItemsInPrintCart);
        return (
          <PrintCartItemTableRow
            ItemCard={item}
            TotalItemsCard={this.props.itemsInPrintCart}
            associatedItemsInPrintCart={associatedItemsInPrintCart}
            onAddOrRemoveSelectedItems={this.props.onAddOrRemoveSelectedItems}
            columns={this.props.columns}
            //   isItemSelected={this.state.isItemSelected}
            isLinkTable={false}
            index={index}
            itemSequence={sequenceIndex}
            onItemsReorder={this.props.onItemsReorder}
            isInterimSite={this.props.isInterimSite}
            testCodeToLabelMap={this.props.testCodeToLabelMap}
            itemIdToTestNameMap={this.props.itemIdToTestNameMap}
          />
        );
      } else {
        nextSequenceIndex = nextSequenceIndex + 1;
        return (
          <PrintCartItemTableRow
            ItemCard={item}
            TotalItemsCard={this.props.itemsInPrintCart}
            onAddOrRemoveSelectedItems={this.props.onAddOrRemoveSelectedItems}
            columns={this.props.columns}
            //   isItemSelected={this.state.isItemSelected}
            isLinkTable={false}
            index={index}
            itemSequence={sequenceIndex}
            onItemsReorder={this.props.onItemsReorder}
            isInterimSite={this.props.isInterimSite}
            testCodeToLabelMap={this.props.testCodeToLabelMap}
            itemIdToTestNameMap={this.props.itemIdToTestNameMap}
          />
        );
      }
    });
  }
  render() {
    let content = <tbody>{this.renderAllRows()}</tbody>;
    return content;
  }
}
