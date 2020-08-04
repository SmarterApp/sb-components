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
import { PrintCartTable } from "@src/PrintCart/PrintCartTable";
import { PrintAccessibilityContainerProps } from "@src/Accessibility/PrintAccessibilityModal";
import { PrintCartItemTableRow } from "./PrintCartItemTableRow";
import { timingSafeEqual } from "crypto";
import { PrintcartHeaderTable } from "./PrintcartHeaderTable";
import { headerColumns_nonInterimSite } from "@src/ItemTable/ItemTableModels";
import {
  TestCodeToLabel,
  ItemIdToTestNameMap
} from "@src/ItemSearch/ItemSearchModels";
import {
  printCartColumnsInterim,
  printCartColumnsNonInterimSite
} from "./PrintCartModel";

export interface PrintCartItemTableContainerProps {
  ItemsInPrintCart: ItemCardModel[];
  onAddOrRemoveSelectedItems: (item: ItemCardModel) => void;
  onItemsReorder: (i: number, j: number) => void;
  associatedItemsInPrintCart?: any[];
  handleUpdateItemsinPrintCart: (itemsInPrintCart: ItemCardModel[]) => void;
  isInterimSite: boolean;
  testCodeToLabelMap: TestCodeToLabel;
  itemIdToTestNameMap: ItemIdToTestNameMap;
}

export interface PrintCartItemTableContainerState {
  sorts: HeaderSortModel[];
  isItemSelected: boolean;
}

export class PrintCartTableContainer extends React.Component<
  PrintCartItemTableContainerProps,
  PrintCartItemTableContainerState
> {
  private pageHeaderColumns = this.props.isInterimSite
    ? printCartColumnsInterim
    : printCartColumnsNonInterimSite;

  constructor(props: PrintCartItemTableContainerProps) {
    super(props);
    this.state = {
      sorts: [],
      isItemSelected: false
    };
  }

  /**
   * On header click, the column that was clicked will be added to the
   * sorts array in state or its sort status will be removed.
   * @memberOf {ItemTableContainer}
   * @function {onClickHeader}
   * @param {ColumnGroup} col
   */
  onClickHeader = (col: ColumnGroup) => {
    const sortCheck = (this.state.sorts || []).slice();
    const unmatchFound = sortCheck.findIndex(
      hs => hs.col.header !== col.header
    );
    const newSortModel: HeaderSortModel = {
      col,
      direction: SortDirection.NoSort,
      resetSortCount: 0
    };
    if (unmatchFound > -1) {
      this.state = {
        sorts: [newSortModel],
        isItemSelected: this.state.isItemSelected
      };
    }
    const newSorts = (this.state.sorts || []).slice();
    const headIdx = newSorts.findIndex(hs => hs.col.header === col.header);

    if (headIdx !== -1) {
      const newSort = { ...newSorts[headIdx] };
      if (newSort.direction === SortDirection.Ascending) {
        newSort.direction = SortDirection.Descending;
      } else if (newSort.direction === SortDirection.Descending) {
        newSort.direction = SortDirection.NoSort;
      } else {
        newSort.direction = SortDirection.Ascending;
      }
      newSorts[headIdx] = newSort;
    } else {
      const newSort: HeaderSortModel = {
        col,
        direction: SortDirection.Ascending,
        resetSortCount: 0
      };
      newSorts.push(newSort);
    }
    this.setState({ sorts: newSorts });
  };

  /**
   * Sorts two ItemCardModels on the property specified by the sort parameter
   * @param {HeaderSortModel} sort
   * @param {ItemCardModel} lhs
   * @param {ItemCardModel} rhs
   */
  invokeMultiSort(
    sort: HeaderSortModel,
    lhs: ItemCardModel,
    rhs: ItemCardModel
  ): number {
    return sort.col.compare(lhs, rhs) * sort.direction;
  }
  /**
   * Sorts the data that is shown in the table on each of the 'sorts' that are
   * stored in state.
   * @function {getTableData}
   */
  getTableData = (): ItemCardModel[] | undefined => {
    const sorts = this.state.sorts || [];
    let itemsInPrintCart = (this.props.ItemsInPrintCart || []).slice();
    sorts.forEach(sort => {
      itemsInPrintCart = itemsInPrintCart.sort((lhs, rhs) =>
        this.invokeMultiSort(sort, lhs, rhs)
      );
    });
    if (
      JSON.stringify(this.props.ItemsInPrintCart) ===
      JSON.stringify(itemsInPrintCart)
    ) {
    } else {
      this.props.handleUpdateItemsinPrintCart(itemsInPrintCart);
    }
    return itemsInPrintCart;
  };

  onItemsReorder = (i: number, j: number) => {
    this.setState({ sorts: [] });
    this.props.onItemsReorder(i, j);
  };

  renderTableHeader() {
    return (
      <PrintcartHeaderTable
        sorts={this.state.sorts}
        onHeaderClick={this.onClickHeader}
        columns={this.pageHeaderColumns}
        isLinkTable={false}
      />
    );
  }

  renderTable() {
    const itemCards = this.getTableData();

    let content = (
      <span className="placeholder-text" role="alert">
        No item found in Print Cart.
      </span>
    );
    if (itemCards !== undefined && itemCards.length !== 0) {
      content = (
        <PrintCartTable
          itemsInPrintCart={itemCards}
          associatedItemsInPrintCart={this.props.associatedItemsInPrintCart}
          onAddOrRemoveSelectedItems={this.props.onAddOrRemoveSelectedItems}
          sort={this.state.sorts}
          columns={this.pageHeaderColumns}
          isItemSelected={this.state.isItemSelected}
          isLinkTable={false}
          onItemsReorder={this.onItemsReorder}
          isInterimSite={this.props.isInterimSite}
          testCodeToLabelMap={this.props.testCodeToLabelMap}
          itemIdToTestNameMap={this.props.itemIdToTestNameMap}
        />
      );
    }
    return content;
  }

  render() {
    return (
      <div className="section item-table-container">
        <table className="item-table">
          {this.renderTableHeader()}
          {this.renderTable()}
        </table>
      </div>
    );
  }
}
