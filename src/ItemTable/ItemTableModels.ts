import { ItemCardModel } from "../ItemCard/ItemCardModels";
import { getContentStandardCode } from "../ItemCard/ItemCardHelperFunction";
import {
  mapItemClaim,
  getClaimValue
} from "@src/PrintCart/PrintCartItemTableRow";

export type HeaderType =
  | "Item"
  | "Test name"
  | "Item position in test"
  | "Stimulus ID"
  | "Claim"
  | "Standard"
  | "Subject"
  | "Grade"
  | "Item Type"
  | "DOK"
  | "Difficulty"
  | "Target"
  | "Answer key";

export type HeaderType_NonInterimSite =
  | "Item"
  | "Claim"
  | "Standard"
  | "Subject"
  | "Grade"
  | "Item Type"
  | "Target"
  | "Answer key";

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
export interface ColumnGroup_NonInterimSite {
  header: HeaderType_NonInterimSite;
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
    header: "Stimulus ID",
    headerClassName: "stimulus",
    cols: [
      {
        accessor: label =>
          label.stimulusKey !== undefined ? label.stimulusKey : "NA",
        className: "stimulus"
      }
    ],
    compare: (a, b) =>
      (a.stimulusKey !== undefined ? a.stimulusKey : 0) -
      (b.stimulusKey !== undefined ? b.stimulusKey : 0)
  },
  {
    header: "Item position in test",
    headerClassName: "item-position-in-test",
    cols: [
      {
        accessor: label =>
          label.testOrder !== undefined ? label.testOrder : "",
        className: "item-position-in-test"
      }
    ],
    compare: (a, b) =>
      (a.testOrder !== undefined ? a.testOrder : 0) -
      (b.testOrder !== undefined ? b.testOrder : 0)
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
    header: "Test name",
    headerClassName: "testname",
    cols: [
      {
        accessor: label => (label.testName !== undefined ? label.testName : ""),
        className: "testname"
      }
    ],
    compare: (a, b) =>
      (a.testName !== undefined ? a.testName : "").localeCompare(
        b.testName !== undefined ? b.testName : ""
      )
  },
  {
    header: "Claim",
    headerClassName: "claim",
    cols: [
      {
        accessor: card => getClaimValue(card.claimLabel),
        className: "claim",
        helpText: card => card.claimLabel
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
  // {
  //   header: "Item Type",
  //   headerClassName: "item-type",
  //   cols: [
  //     {
  //       accessor: label => label.interactionTypeLabel,
  //       className: "item-type"
  //     }
  //   ],
  //   compare: (a, b) =>
  //     a.interactionTypeCode.localeCompare(b.interactionTypeCode)
  // }
  {
    header: "DOK",
    headerClassName: "dok",
    cols: [
      {
        accessor: label =>
          label.depthOfKnowledge === undefined ? "" : label.depthOfKnowledge,
        className: "dok"
      }
    ],
    compare: (a, b) =>
      (a.depthOfKnowledge === undefined
        ? "-1"
        : a.depthOfKnowledge
      ).localeCompare(
        b.depthOfKnowledge === undefined ? "-1" : b.depthOfKnowledge
      )
  },
  {
    header: "Difficulty",
    headerClassName: "difficulty",
    cols: [
      {
        accessor: label =>
          label.itemDifficulty === undefined ? "" : label.itemDifficulty,
        className: "difficulty"
      }
    ],
    compare: (a, b) => a.itemDifficulty.localeCompare(b.itemDifficulty)
  },
  {
    header: "Answer key",
    headerClassName: "answerkeys",
    cols: [
      {
        accessor: label =>
          label.answerKeys.length > 0 ? label.answerKeys : "",
        className: "answerkeys"
      }
    ],
    compare: (a, b) =>
      (a.answerKeys.length > 0 ? a.answerKeys : "").localeCompare(
        b.answerKeys.length > 0 ? b.answerKeys : ""
      )
  }
];

//For Non interim site
export const headerColumns_nonInterimSite: ColumnGroup[] = [
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
    header: "Stimulus ID",
    headerClassName: "stimulus",
    cols: [
      {
        accessor: label =>
          label.stimulusKey !== undefined ? label.stimulusKey : "NA",
        className: "stimulus"
      }
    ],
    compare: (a, b) =>
      (a.stimulusKey !== undefined ? a.stimulusKey : 0) -
      (b.stimulusKey !== undefined ? b.stimulusKey : 0)
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
  },
  {
    header: "Answer key",
    headerClassName: "answerkeys",
    cols: [
      {
        accessor: label =>
          label.answerKeys.length > 0 ? label.answerKeys : "",
        className: "answerkeys"
      }
    ],
    compare: (a, b) =>
      (a.answerKeys.length > 0 ? a.answerKeys : "").localeCompare(
        b.answerKeys.length > 0 ? b.answerKeys : ""
      )
  }
];
