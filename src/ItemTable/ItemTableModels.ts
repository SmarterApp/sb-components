import { ItemCardModel } from "../ItemCard/ItemCardModels";
import { getContentStandardCode } from "../ItemCard/ItemContentStandardHelper";

export type HeaderType =
  | "Item"
  | "Claim"
  | "Standard"
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

// Logic for content standard
export function getContentStandard(
  ccssDescription: any,
  commonCoreStandardId: any,
  subjectCode: any,
  claimCode: any,
  flag_sendcommonCoreStanrdId: boolean
) {
  const standard = getContentStandardCode(
    subjectCode,
    claimCode,
    commonCoreStandardId,
    ccssDescription
  );
  commonCoreStandardId = standard["commonCoreStandardId"];
  ccssDescription = standard["ccssDescription"];
  if (flag_sendcommonCoreStanrdId) return commonCoreStandardId;
  else return ccssDescription;
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

    compare: (a, b) => {
      let direction;
      if (a.targetId < b.targetId) {
        direction = SortDirection.Ascending;
      } else if (a.targetId > b.targetId) {
        direction = SortDirection.Descending;
      } else {
        direction = SortDirection.NoSort;
      }
      return direction;
    }
  },
  {
    header: "Standard",
    headerClassName: "standard",
    cols: [
      {
        accessor: label =>
          getContentStandard(
            label.ccssDescription,
            label.commonCoreStandardId,
            label.subjectCode,
            label.claimCode,
            true
          ),
        className: "standard"
      },
      {
        accessor: label => "",
        className: "standard",
        helpText: label =>
          getContentStandard(
            label.ccssDescription,
            label.commonCoreStandardId,
            label.subjectCode,
            label.claimCode,
            false
          )
      }
    ],
    compare: (a, b) => {
      let direction;
      const commonCoreStandardId_1 = getContentStandard(
        a.ccssDescription,
        a.commonCoreStandardId,
        a.subjectCode,
        a.claimCode,
        true
      );
      const commonCoreStandardId_2 = getContentStandard(
        b.ccssDescription,
        b.commonCoreStandardId,
        b.subjectCode,
        b.claimCode,
        true
      );
      if (commonCoreStandardId_1 < commonCoreStandardId_2) {
        direction = SortDirection.Ascending;
      } else if (commonCoreStandardId_1 < commonCoreStandardId_2) {
        direction = SortDirection.Descending;
      } else {
        direction = SortDirection.NoSort;
      }
      return direction;
    }
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
