import { ItemCardModel } from "../ItemCard/ItemCardModels";

export type HeaderType =
  | "Item"
  | "Claim"
  | "Subject"
  | "Grade"
  | "Item Type"
  | "Target";

export enum SortDirection {
  NoSort = 0,
  Ascending = 1,
  Descending = -1
}

export interface HeaderSortModel {
  col: ColumnGroup;
  direction: SortDirection;
  resetSortCount: number;
}

export interface SortColumnModel {
  className: string;
  accessor: (label: ItemCardModel) => string | number;
  helpText?: (label: ItemCardModel) => string;
}

export interface ColumnGroup {
  header: HeaderType;
  headerClassName: string;
  cols: SortColumnModel[];
  compare: (a: ItemCardModel, b: ItemCardModel) => number;
  headerHelp?: string;
}

export const headerColumns: ColumnGroup[] = [
  {
    header: "Item",
    headerClassName: "item",
    compare: (a, b) => a.itemKey - b.itemKey,
    cols: [
      {
        accessor: label => label.itemKey,
        className: "item"
      }
    ]
  },
  {
    header: "Subject",
    headerClassName: "subject",
    cols: [{ accessor: label => label.subjectLabel, className: "subject" }],
    compare: (a, b) => a.subjectCode.localeCompare(b.subjectCode)
  },
  {
    header: "Grade",
    headerClassName: "grade",
    cols: [
      {
        accessor: label => label.gradeLabel,
        className: "grade"
      }
    ],
    compare: (a, b) => a.grade - b.grade
  },
  {
    header: "Claim",
    headerClassName: "claim",
    cols: [
      {
        accessor: card => card.claimLabel,
        className: "claim"
      }
    ],
    compare: (a, b) => {
      let direction;
      if (a.claimCode < b.claimCode) {
        direction = SortDirection.Ascending;
      } else if (a.claimCode > b.claimCode) {
        direction = SortDirection.Descending;
      } else {
        direction = SortDirection.NoSort;
      }

      return direction;
    }
  },
  {
    header: "Target",
    headerClassName: "Target",
    cols: [
      {
        accessor: label => label.targetId,
        className: "target",
        helpText: card => card.targetDescription
      }
    ],
    compare: (a, b) => a.targetId.localeCompare(b.targetId)
  },
  {
    header: "Item Type",
    headerClassName: "item-type",
    cols: [
      {
        accessor: label => label.interactionTypeLabel,
        className: "item-type"
      }
    ],
    compare: (a, b) =>
      a.interactionTypeCode.localeCompare(b.interactionTypeCode)
  }
];
