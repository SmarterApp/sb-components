import * as React from "react";
import {
  ItemCardModel,
  ToolTip,
  generateTooltip,
  SortColumnModel,
  ColumnGroup
} from "@src/index";
import { TestCodeToLabel } from "@src/ItemSearch/ItemSearchModels";
import {
  mapItemGrade,
  mapItemSubjectlabel,
  mapItemClaim
} from "@src/PrintCart/PrintCartItemTableRow";

export interface ItemTableRowProps {
  rowData: ItemCardModel;
  hasControls: boolean;
  columns: ColumnGroup[];
  isExpanded: boolean;
  onRowExpand: (item: ItemCardModel) => void;
  onRowSelect: (item: ItemCardModel) => void;
  isItemSelected: boolean;
  numberOfSelectedItem: number;
  getSelectedItemCount: () => number;
  showErrorModalOnPrintItemsCountExceeded: () => void;
  associatedItems: any[];
  countNumberOfItemsAfterSelection: (
    currentItems: ItemCardModel[],
    selectedItemsCount: number
  ) => number;
  isInterimSite: boolean;
  testCodeToLabelMap: TestCodeToLabel;
}

const unChecked = (
  <i className="fa fa-square-o fa-sm table-icon" aria-hidden="true" />
);
const checked = (
  <i className="fa fa-check-square-o fa-sm table-icon" aria-hidden="true" />
);
const collapse = (
  <i className="fa fa-chevron-right fa-sm table-icon" aria-hidden="true" />
);
const expand = (
  <i className="fa fa-chevron-down fa-sm table-icon" aria-hidden="true" />
);

export class ItemTableRow extends React.Component<ItemTableRowProps, {}> {
  constructor(props: ItemTableRowProps) {
    super(props);
  }

  shouldComponentUpdate(nextProps: ItemTableRowProps, nextState: {}) {
    // return (
    //   this.props.isExpanded !== nextProps.isExpanded ||
    //   this.props.rowData.selected !== nextProps.rowData.selected ||
    //   this.props.isItemSelected !== nextProps.isItemSelected ||
    //   this.props.numberOfSelectedItem !== nextProps.numberOfSelectedItem
    // );
    return true;
  }

  handleRowClick = (rowData: ItemCardModel) => {
    this.props.onRowExpand(rowData);
  };

  handleKeyUpEnter = (
    e: React.KeyboardEvent<HTMLTableRowElement>,
    rowData: ItemCardModel
  ) => {
    if (e.keyCode === 13) {
      this.props.onRowExpand(rowData);
    }
  };

  handleCheckboxKeyUpEnter = (
    e: React.KeyboardEvent<HTMLTableDataCellElement>,
    rowData: ItemCardModel
  ) => {
    if (e.keyCode === 13) {
      e.stopPropagation();
      this.props.onRowSelect(rowData);
    }
  };

  handleCheckboxClick = (
    e: React.MouseEvent<HTMLTableDataCellElement>,
    rowData: ItemCardModel,
    shouldBeDisabled: string
  ) => {
    let currentItems: ItemCardModel[] = [];
    currentItems[0] = rowData;
    e.stopPropagation();
    if (
      shouldBeDisabled == "disabled" &&
      (rowData.selected === undefined || rowData.selected === false)
    ) {
      return;
    }
    let selectedItemsCount = this.props.getSelectedItemCount();
    if (
      rowData.selected !== true &&
      this.props.countNumberOfItemsAfterSelection(
        currentItems,
        selectedItemsCount
      ) > 50
    ) {
      this.props.showErrorModalOnPrintItemsCountExceeded();
      return;
    } else {
      if (rowData.selected === true) rowData.selected = false;
      else rowData.selected = true;
      this.props.onRowSelect(rowData);
      e.stopPropagation();
    }
  };

  handleKeyUpSpacebar = (
    e: React.KeyboardEvent<HTMLTableDataCellElement>,
    rowData: ItemCardModel
  ) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      return;
    }
    if (e.keyCode === 32) {
      e.preventDefault();
      let selectedItemsCount = this.props.getSelectedItemCount();

      if (rowData.selected !== true && selectedItemsCount >= 20) {
        this.props.showErrorModalOnPrintItemsCountExceeded();
        return;
      } else {
        if (rowData.selected === true) rowData.selected = false;
        else rowData.selected = true;
        this.props.onRowSelect(rowData);
      }
      e.preventDefault();
    }
  };

  handleKeyUpEnterStopPropogation = (e: React.SyntheticEvent) => {
    e.stopPropagation();
  };

  renderColumnGroup(
    colGroup: ColumnGroup,
    cellData: ItemCardModel
  ): JSX.Element {
    const colValues = colGroup.cols.map(c => this.renderCell(c, cellData));
    const { headerClassName } = colGroup;

    return (
      <td
        key={`${headerClassName}-${cellData.bankKey}-${cellData.itemKey}`}
        className={headerClassName}
        role="gridcell"
      >
        {colValues}
      </td>
    );
  }

  renderCell(col: SortColumnModel, cellData: ItemCardModel): JSX.Element {
    const columnText = col.accessor(cellData);
    let content: JSX.Element | React.ReactText | undefined;

    if (col.helpText) {
      content = generateTooltip({
        helpText: <p>{col.helpText(cellData)}</p>,
        position: "bottom",
        displayIcon: true,
        className: "box",
        displayText: columnText
      });
    } else if (col.className === "item" && !this.props.hasControls) {
      content = (
        <a tabIndex={0} role="link">
          {columnText}
        </a>
      );
    } else if (col.className === "subject") {
      content = (
        <span
          className={`table-subject-highlight ${cellData.subjectCode.toLowerCase()}`}
        >
          {mapItemSubjectlabel(columnText.toString())}
        </span>
      );
    } else if (col.className === "testname") {
      let testLabel = "";
      if (columnText !== undefined) {
        testLabel = this.props.testCodeToLabelMap[columnText];
      }
      content = <span>{testLabel}</span>;
    } else if (col.className === "grade") {
      const shortGradeValue = mapItemGrade(columnText.toString());
      content = <span>{shortGradeValue}</span>;
    } else {
      if (col.className === "item") {
        content = (
          <a tabIndex={0} role="link">
            {columnText}
          </a>
        );
      } else {
        content = <span>{columnText}</span>;
      }
    }

    return <span key={col.className}>{content}</span>;
  }

  renderControls(): JSX.Element[] | undefined {
    const { rowData, hasControls, isExpanded } = this.props;

    const shouldBeDisabled = () => {
      if (
        this.props.rowData.selected === undefined ||
        this.props.rowData.selected === false
      ) {
        if (this.props.associatedItems !== undefined) {
          const associatedItems = this.props.associatedItems;
          const itemKey = this.props.rowData.itemKey;
          for (const itemKeyInAssociatedItems in associatedItems) {
            const associatedItemsArray =
              associatedItems[itemKeyInAssociatedItems];
            for (let i = 0; i < associatedItemsArray.length; i++) {
              if (associatedItemsArray[i][0].itemKey === itemKey)
                return "disabled";
            }
          }
        }
      }

      return " ";
    };
    const shouldBeDisabledResult = shouldBeDisabled();

    const addOrRemoveIcon = () => {
      return rowData.selected === true ? "fa-check-circle" : "fa-plus-circle";
    };
    const addRemoveItemBtnCSSClass = () => {
      return rowData.selected === true ? "btn-red-border" : "btn-blue-border";
    };

    const getToolTipMsg = () => {
      if (shouldBeDisabledResult === "disabled")
        return "This is a Performance Task and must be selected as a group in a predefined sequence. PTs are designed as a complete activity to measure a student’s ability to demonstrate critical-thinking, problem-solving skills and/or complex analysis, and writing and research skills.";
      if (addOrRemoveIcon() === "fa-plus-circle")
        return "Add item to print queue";
      else return "Remove item from print queue ";
    };

    const getAddRemoveTextBtn = () => {
      return rowData.selected === true ? " Remove" : " Add";
    };

    const iconsAddOrRemove = (
      <td
        className={`item-checkbox item-add-remove`}
        onClick={e => this.handleCheckboxClick(e, rowData, shouldBeDisabled())}
        onKeyUp={e => this.handleCheckboxKeyUpEnter(e, rowData)}
        tabIndex={0}
      >
        <button
          type="button"
          className={`btn btn  btn-item-add-remove-grid btn-sm ${addRemoveItemBtnCSSClass()}`} //${this.props.rowData.subjectCode.toLowerCase()
        >
          <i className={"fa fa-2x " + addOrRemoveIcon()} />
          {/* {getAddRemoveTextBtn()} */}
        </button>
      </td>
    );

    const tooltip = generateTooltip({
      displayIcon: false,
      className: "",
      helpText: <label>{getToolTipMsg()}</label>,
      displayText: iconsAddOrRemove
    });

    let controls: JSX.Element[] | undefined;
    if (hasControls) {
      controls = [<>{tooltip}</>];
    }

    return controls;
  }

  render() {
    const { rowData, isExpanded, columns } = this.props;

    return (
      <tr
        key={`${rowData.bankKey}-${rowData.itemKey}`}
        className={isExpanded ? "selected" : ""}
        onClick={() => this.handleRowClick(rowData)}
        onKeyUp={e => this.handleKeyUpEnter(e, rowData)}
      >
        {this.renderControls()}
        {columns.map(col => this.renderColumnGroup(col, rowData))}
      </tr>
    );
  }
}

// for expand...  deprecitd... after addremove icon... leaving code for future refrence if required
// <td className="arrow-indicator" tabIndex={0} key="expand-control">
//   {isExpanded ? expand : collapse}
// </td>
