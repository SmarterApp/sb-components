import * as React from "react";
import {
  SortColumnModel,
  HeaderSortModel,
  SortDirection,
  ColumnGroup
} from "@src/index";
import { ItemColumnHeadersConfig } from "@src/SearchResultContainer/SearchResultModels";

/**
 * Properties for HeaderTable component
 * @interface HeaderTableProps
 */
export interface PrintCartHeaderTableProps {
  columns: ColumnGroup[];
  onHeaderClick: (header: ColumnGroup) => void;
  sorts: HeaderSortModel[];
  isLinkTable: boolean;
  itemTableConfig: ItemColumnHeadersConfig[];
}

const invokeResetSortLimit = 2;

const style = {
  color: "gray"
};

const descendingArrow = (
  <span
    style={style}
    className="fa fa-sort-desc sort-icon"
    aria-hidden="true"
  />
);

const ascendingArrow = (
  <span style={style} className="fa fa-sort-asc sort-icon" aria-hidden="true" />
);

const noSort = (
  <span style={style} className="fa fa-sort sort-icon" aria-hidden="true" />
);

/**
 * HeaderTable creates a table header based on the passed in columns
 * The HeaderTable, when clicked, will add the clicked column header
 * the parent, PrintCartItemTableContainer, state, sorting the table
 */
export class PrintcartHeaderTable extends React.Component<
  PrintCartHeaderTableProps,
  {}
> {
  constructor(props: PrintCartHeaderTableProps) {
    super(props);
  }
  /**
   * Send the clicked sort column to the parent to be added to the sorts list
   * using onHeaderClick prop.
   * @param {ColumnGroup} sCol
   * @param {(HeaderSortModel | undefined)} hCol
   */
  headerClickHandler = (sCol: ColumnGroup, hCol?: HeaderSortModel) => {
    this.props.onHeaderClick(sCol);
  };

  /**
   * Send the clicked sort column to the parent to be added to the sorts list
   * using onHeaderClick prop.
   * @param {React.KeyboardEvent<any>} e
   * @param {HeaderColumnModel} sCol
   * @param {(HeaderSortModel | undefined)} hCol
   */
  headerKeyUpHandler = (
    e: React.KeyboardEvent<HTMLTableHeaderCellElement>,
    sCol: ColumnGroup,
    hCol?: HeaderSortModel
  ) => {
    if (e.keyCode === 13) {
      this.props.onHeaderClick(sCol);
    }
  };

  /**
   * Assigns an ascending or descending arrow character to the visible column
   * header when clicked, denoting how it is sorted
   * @param {(HeaderSortModel | undefined)} headerSort
   * @returns {JSX.Element}
   */
  setDirElem(headerSort: HeaderSortModel | undefined): JSX.Element {
    let dirElem = noSort;
    if (!headerSort) {
      dirElem = noSort;
    } else if (headerSort.direction === SortDirection.Ascending) {
      dirElem = ascendingArrow;
    } else if (headerSort.direction === SortDirection.Descending) {
      dirElem = descendingArrow;
    }

    return dirElem;
  }

  /**
   * Renders a single table header element and the corresponding ascending, descending,
   * or 'not-sorted' symbol
   * @param {ColumnGroup} col
   * @returns {JSX.Element}
   */
  renderHeader(col: ColumnGroup): JSX.Element {
    const headerSort = this.props.sorts.find(
      hs => hs.col.header === col.header
    );

    let isHidden = false;
    const tableHeaderConfig = this.props.itemTableConfig.find(
      hs => hs.headerName.toUpperCase() === col.header.toUpperCase()
    );
    if (tableHeaderConfig != undefined) {
      isHidden = tableHeaderConfig.isHidden;
    }

    if (headerSort) {
      this.setDirElem(headerSort);
    }

    return (
      <>
        {!isHidden && (
          <th
            key={col.header}
            className={col.headerClassName}
            tabIndex={0}
            scope="col"
          >
            <div className={col.headerClassName}>
              <span>{col.header}</span>
            </div>
          </th>
        )}
      </>
    );
  }

  render() {
    return (
      <thead>
        <tr className="primary">
          {this.props.isLinkTable ? undefined : <th colSpan={1} />}
          <th colSpan={1} scope="col" />
          {this.props.columns.map(col => this.renderHeader(col))}
          <th className="th-arrrow-button" colSpan={1} scope="col" />
        </tr>
      </thead>
    );
  }
}
