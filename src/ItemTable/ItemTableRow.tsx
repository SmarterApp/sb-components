import * as React from "react";
import {
  ItemCardModel,
  ToolTip,
  generateTooltip,
  SortColumnModel,
  ColumnGroup
} from "@src/index";

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

  handleCheckboxClick = (
    e: React.MouseEvent<HTMLTableDataCellElement>,
    rowData: ItemCardModel
  ) => {
    e.stopPropagation();
    let selectedItemsCount = this.props.getSelectedItemCount();
    if (rowData.selected !== true && selectedItemsCount >= 20) {
      this.props.showErrorModalOnPrintItemsCountExceeded();
      return;
    } else {
      if (rowData.selected === true) rowData.selected = false;
      else rowData.selected = true;
      this.props.onRowSelect(rowData);
      e.stopPropagation();
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
          {columnText}
        </span>
      );
    } else {
      content = <span>{columnText}</span>;
    }

    return <span key={col.className}>{content}</span>;
  }

  renderControls(): JSX.Element[] | undefined {
    const { rowData, hasControls, isExpanded } = this.props;
    let controls: JSX.Element[] | undefined;
    if (hasControls) {
      controls = [
        <td
          className="item-checkbox"
          key="checkbox-control"
          onClick={e => this.handleCheckboxClick(e, rowData)}
          onKeyUp={e => this.handleCheckboxKeyUpEnter(e, rowData)}
          tabIndex={0}
        >
          {rowData.selected === true ? checked : unChecked}&nbsp;
        </td>
      ];
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
