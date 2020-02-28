import * as React from "react";
import {
  HeaderSortModel,
  SortColumnModel,
  SortDirection,
  headerColumns,
  ColumnGroup,
  ItemModel,
  HeaderTable,
  ItemTable,
  Resource,
  ItemCardModel,
  AboutItemModel
} from "@src/index";
import { PrintCartButtonProps } from "./PrintCartButton";
import { PrintAccessibilityContainerProps } from "@src/Accessibility/PrintAccessibilityModal";
import { PrintCartItemTableRow } from "./PrintCartItemTableRow";
import { timingSafeEqual } from "crypto";

export interface PrintCartItemTableContainerProps {
  ItemsInPrintCart: ItemCardModel[];
  onAddOrRemoveSelectedItems: (item: ItemCardModel) => void;
}

export interface PrintCartItemTableContainerState {}

export class PrintCartTableContainer extends React.Component<
  PrintCartItemTableContainerProps,
  PrintCartItemTableContainerState
> {
  constructor(props: PrintCartItemTableContainerProps) {
    super(props);
    this.state = {};
  }

  renderTableData() {
    return this.props.ItemsInPrintCart.map(item => {
      return (
        <PrintCartItemTableRow
          ItemCard={item}
          onAddOrRemoveSelectedItems={this.props.onAddOrRemoveSelectedItems}
        />
      );
    });
  }

  renderTableHeader() {
    const header = ["Item", "Subject", "Grade", "Claim/Target", "Item Type", "Action"];
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  }

  render() {
    return (
      <div className="section item-table-container">
        <table className="item-table">
          <thead>
            <tr className="primary" key="1">
              {this.renderTableHeader()}
            </tr>
          </thead>
          <tbody>{this.renderTableData()}</tbody>
        </table>
      </div>
    );
  }
}
