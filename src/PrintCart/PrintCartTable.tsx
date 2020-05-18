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

export interface PrintCartTableProps {
  itemsInPrintCart: ItemCardModel[];
  associatedItemsInPrintCart?: ItemCardModel[];
  sort: HeaderSortModel[];
  onAddOrRemoveSelectedItems: (item: ItemCardModel) => void;
  onItemsReorder: (i: number, j: number) => void;
  columns: ColumnGroup[];
  isLinkTable: boolean;
  isItemSelected: boolean;
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

  renderAllRows(): JSX.Element[] {
    return this.props.itemsInPrintCart.map((item, index) => {
      if (
        item.isPerformanceItem === true &&
        this.props.associatedItemsInPrintCart != undefined
      ) {
        const associatedItemsInPrintCart = this.props
          .associatedItemsInPrintCart[item.itemKey];
        return (
          <PrintCartItemTableRow
            ItemCard={item}
            associatedItemsInPrintCart={associatedItemsInPrintCart}
            onAddOrRemoveSelectedItems={this.props.onAddOrRemoveSelectedItems}
            columns={this.props.columns}
            //   isItemSelected={this.state.isItemSelected}
            isLinkTable={false}
            index={index}
            onItemsReorder={this.props.onItemsReorder}
          />
        );
      } else {
        return (
          <PrintCartItemTableRow
            ItemCard={item}
            onAddOrRemoveSelectedItems={this.props.onAddOrRemoveSelectedItems}
            columns={this.props.columns}
            //   isItemSelected={this.state.isItemSelected}
            isLinkTable={false}
            index={index}
            onItemsReorder={this.props.onItemsReorder}
          />
        );
      }
    });
  }

  //   renderExpandedRow(item: Resource<AboutItemModel>): JSX.Element | undefined {
  //     let result: JSX.Element | undefined;
  //     const itemContent = getResourceContent(item);
  //     if (itemContent) {
  //       result = (
  //         <tr key="item-card-viewer">
  //           <td colSpan={7}>
  //             <ItemCardViewer item={itemContent} />
  //           </td>
  //         </tr>
  //       );
  //     }

  //     return result;
  //   }

  //   renderRow(rowData: ItemCardModel): JSX.Element[] {
  //     const {
  //       expandedRow,
  //       columns,
  //       item,
  //       isLinkTable,
  //       onRowExpand,
  //       onRowSelect
  //     } = this.props;
  //     const rows: JSX.Element[] = [];
  //     const isExpanded =
  //       expandedRow && itemIdEqual(expandedRow, rowData) ? true : false;

  //     rows.push(
  //       <ItemTableRow
  //         key={`${rowData.bankKey}-${rowData.itemKey}`}
  //         rowData={rowData}
  //         hasControls={!isLinkTable}
  //         columns={columns}
  //         isExpanded={isExpanded}
  //         onRowExpand={onRowExpand}
  //         onRowSelect={onRowSelect}
  //         isItemSelected={this.props.isItemSelected}
  //         // numberOfSelectedItem = {this.props.numberOfSelectedItem}
  //         numberOfSelectedItem={this.props.numberOfSelectedItem}
  //         getSelectedItemCount={this.props.getSelectedItemCount}
  //         showErrorModalOnPrintItemsCountExceeded={
  //           this.props.showErrorModalOnPrintItemsCountExceeded
  //         }
  //       />
  //     );

  //     if (isExpanded && item) {
  //       const expandContent = this.renderExpandedRow(item);
  //       if (expandContent) {
  //         rows.push(expandContent);
  //       }
  //     }

  //     return rows;
  //   }

  render() {
    // const { cardRows } = this.props;
    // let content = <div>No Items.</div>;
    // if (cardRows) {
    let content = <tbody>{this.renderAllRows()}</tbody>;
    // }

    return content;
  }
}
