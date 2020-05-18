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
import { PrintCartRowGroup } from "@src/PrintCart/PrintCartRowGroup";
export interface PrintCartItemTableRowProps {
  ItemCard: ItemCardModel;
  associatedItemsInPrintCart?: any;
  onAddOrRemoveSelectedItems: (item: ItemCardModel) => void;
  onItemsReorder: (i: number, j: number) => void;
  columns: ColumnGroup[];
  isLinkTable: boolean;
  index: number;
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

  handleOnUpArrowClick = () => {
    const currentIndex = this.props.index;
    this.props.onItemsReorder(currentIndex, currentIndex - 1);
  };
  handleOnDownArrowClick = () => {
    const currentIndex = this.props.index;
    this.props.onItemsReorder(currentIndex, currentIndex + 1);
  };

  onAddOrRemoveSelectedItems = (item: ItemCardModel) => {
    item.selected = item.selected === true ? false : true;
    this.props.onAddOrRemoveSelectedItems(item);
  };

  renderActionButton = (item: ItemCardModel) => {
    return (
      <button
        className="btn btn-sm btn-danger"
        onClick={() => this.onAddOrRemoveSelectedItems(item)}
      >
        Remove
      </button>
    );
  };
  renderTableHeader() {}

  renderAssociatedItemsInGroup() {
    if (this.props.associatedItemsInPrintCart !== undefined) {
      return this.props.associatedItemsInPrintCart.map(
        (
          item: {
            itemKey: any;
            subjectLabel: any;
            gradeLabel: any;
            claimLabel: any;
            interactionTypeLabel: any;
          }[]
        ) => {
          console.log(item[0].itemKey);
          return (
            <tr key={item[0].itemKey} className="table-row-associated-item">
              <td />
              <td>{item[0].itemKey}</td>
              <td>{item[0].subjectLabel}</td>
              <td>{item[0].gradeLabel}</td>
              <td>{item[0].claimLabel}</td>
              <td>{item[0].interactionTypeLabel}</td>
              <td />
              <td />
            </tr>
          );
        }
      );
    } else {
      return null;
    }
  }

  render() {
    const item = this.props.ItemCard;
    return (
      <>
        <tr key={item.itemKey} className={""}>
          <td />
          <td>{item.itemKey}</td>
          <td>{item.subjectLabel}</td>
          <td>{item.gradeLabel}</td>
          <td>{item.claimLabel}</td>
          <td>{item.interactionTypeLabel}</td>
          <td>{this.renderActionButton(item)}</td>
          <td>
            <div className="btn-group">
              <i
                className="fa fa-arrow-up"
                onClick={this.handleOnUpArrowClick}
              />
              <i
                className="fa fa-arrow-down"
                onClick={this.handleOnDownArrowClick}
              />
            </div>
          </td>
        </tr>
        {this.renderAssociatedItemsInGroup()}
      </>
    );
  }
}
