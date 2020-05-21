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
import { ToolTip, generateTooltip } from "../index";
import { getContentStandardCode } from "@src/ItemCard/ItemContentStandardHelper";

export interface PrintCartItemTableRowProps {
  ItemCard: ItemCardModel;
  TotalItemsCard: ItemCardModel[];
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
        className="btn btn-sm btn-danger btn-remove-item-print-cart"
        onClick={() => this.onAddOrRemoveSelectedItems(item)}
      >
        X
      </button>
    );
  };
  renderTableHeader() {}

  getContentStandardToolTip(
    subjectCode: any,
    claimCode: any,
    commonCoreStandardId: any,
    ccssDescription: any
  ) {
    //get the new and logically updated commonCoreStandardId, ccssDescription value
    const standard = getContentStandardCode(
      subjectCode,
      claimCode,
      commonCoreStandardId,
      ccssDescription
    );
    commonCoreStandardId = standard["commonCoreStandardId"];
    ccssDescription = standard["ccssDescription"];
    const tooltipCcontentStandard = generateTooltip({
      displayIcon: true,
      className: "box",
      helpText: <span>{ccssDescription}</span>,
      displayText: ""
    });
    return (
      <>
        <span>{commonCoreStandardId} </span>
        <span>{tooltipCcontentStandard}</span>
      </>
    );
  }

  getToolTipForAssociatedGroupItems() {
    const MsgForAssociatedItems =
      "This is a Performance Task and must be selected as a group in a predefined sequence. PTs are designed as a complete activity to measure a student’s ability to demonstrate critical-thinking, problem-solving skills and/or complex analysis, and writing and research skills.";
    const tooltipCcontentStandard = generateTooltip({
      displayIcon: true,
      className: "box",
      helpText: <span>{MsgForAssociatedItems}</span>,
      displayText: ""
    });
    return tooltipCcontentStandard;
  }

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
            subjectCode: any;
            claimCode: any;
            commonCoreStandardId: any;
            ccssDescription: any;
            targetId: any;
          }[]
        ) => {
          return (
            <tr key={item[0].itemKey} className="table-row-associated-item">
              {/* <td>{this.renderActionButton()}</td> */}
              <td>{this.getToolTipForAssociatedGroupItems()}</td>
              <td>{item[0].itemKey}</td>
              <td>{item[0].subjectLabel}</td>
              <td>{item[0].gradeLabel.split(" ")[1]}</td>
              <td>{item[0].claimLabel}</td>
              <td>{item[0].targetId}</td>
              <td>
                {this.getContentStandardToolTip(
                  item[0].subjectCode,
                  item[0].claimCode,
                  item[0].commonCoreStandardId,
                  item[0].ccssDescription
                )}
              </td>
              <td>{item[0].interactionTypeLabel}</td>
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
    const shouldReorderingButtonBeDisabled = (arrowButtonaName: string) => {
      const currentItemIndex = this.props.index;
      const TotalItemsCard_length = this.props.TotalItemsCard.length;
      if (arrowButtonaName === "UpArrowButton" && currentItemIndex === 0) {
        return "disabled";
      }
      if (
        arrowButtonaName === "DownArrowButton" &&
        currentItemIndex === TotalItemsCard_length - 1
      ) {
        return "disabled";
      }
      return "";
    };
    const item = this.props.ItemCard;
    return (
      <>
        <tr key={item.itemKey} className={""}>
          <td>{this.renderActionButton(item)}</td>
          <td>{item.itemKey}</td>
          <td>{item.subjectLabel}</td>
          <td>{item.gradeLabel.split(" ")[1]}</td>
          <td>{item.claimLabel}</td>
          <td>{item.targetId}</td>
          <td>
            {this.getContentStandardToolTip(
              item.subjectCode,
              item.claimCode,
              item.commonCoreStandardId,
              item.ccssDescription
            )}
          </td>
          <td>{item.interactionTypeLabel}</td>

          <td>
            <div className="btn-group">
              <button
                type="button"
                onClick={this.handleOnUpArrowClick}
                className={`btn btn-sm btn-primary ${shouldReorderingButtonBeDisabled(
                  "UpArrowButton"
                )}`}
              >
                <i className="fa fa-arrow-up" />
              </button>
              <button
                type="button"
                onClick={this.handleOnDownArrowClick}
                className={`btn btn-sm btn-primary ${shouldReorderingButtonBeDisabled(
                  "DownArrowButton"
                )}`}
              >
                <i className="fa fa-arrow-down" />
              </button>
            </div>
          </td>
        </tr>
        {this.renderAssociatedItemsInGroup()}
      </>
    );
  }
}
