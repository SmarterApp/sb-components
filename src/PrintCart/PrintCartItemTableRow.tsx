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

export interface PrintCartItemTableRowProps {
    ItemCard: ItemCardModel;
    onAddOrRemoveSelectedItems: (item: ItemCardModel) => void;
}

export interface PrintCartItemTableRowState {}

export class PrintCartItemTableRow extends React.Component<
  PrintCartItemTableRowProps,
  PrintCartItemTableRowState
> {
  constructor(props: PrintCartItemTableRowProps) {
    super(props);
    this.state = {};
  }


  onAddOrRemoveSelectedItems = (item:ItemCardModel) => {
    item.selected = item.selected === true? false : true;
    this.props.onAddOrRemoveSelectedItems(item);
  }

  renderActionButton = (item: ItemCardModel) => {
      return (
          <button className="btn btn-sm btn-danger" onClick={()=> this.onAddOrRemoveSelectedItems(item)}>Remove</button>
      );
  }



  render() {
      const item = this.props.ItemCard;
      return (
        <tr key={item.itemKey} className={""}>
        <td>{item.itemKey}</td>
        <td>{item.subjectLabel}</td>
        <td>{item.gradeLabel}</td>
        <td>{item.claimLabel}</td>
        <td>{item.interactionTypeLabel}</td>
        <td>{this.renderActionButton(item)}</td>
      </tr>
      );
  }
}
