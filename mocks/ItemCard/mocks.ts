import { ItemCardModel, ItemTableContainerProps } from "@src/index";
import { ItemCardProps } from "@src/ItemCard/ItemCard";

export const completeItemCard: ItemCardModel = {
  selected: false,
  bankKey: 187,
  itemKey: 3434,
  title: "ELA Grade 4",
  grade: 4,
  gradeLabel: "Grade 4",
  subjectCode: "ELA",
  subjectLabel: "ELA",
  claimCode: "ELA3",
  claimLabel: "Claim",
  targetHash: 33434,
  targetShortName: "target short name",
  targetId: "dfas",
  targetDescription: "target description right here",
  interactionTypeCode: "GI",
  interactionTypeLabel: "Item Type",
  isPerformanceItem: false,
  brailleOnlyItem: false,
  domain: "domain",
  depthOfKnowledge: "2",
  commonCoreStandardId: "AB-123",
  ccssDescription: "this is the common core description",
  calculator: false,
  itemDifficulty: "Hard",
  availableBrailleTypes: [
    {
      label: "EBAE-Contracted",
      selectionCode: "EABE",
      disabled: false,
      hidden: false
    },
    {
      label: "BAET-Contracted",
      selectionCode: "BAET",
      disabled: false,
      hidden: false
    }
  ]

  // selected: false,
  // bankKey: 187,
  // itemKey: 3434,
  // interactionTypeCode: "GI",
  // interactionTypeLabel: "Item Type",
  // targetShortName: "Short Name",
  // title: "ELA Grade 4",
  // grade: 4,
  // gradeLabel: "Grade 4",
  // subjectCode: "ELA",
  // subjectLabel: "ELA",
  // claimCode: "ELA3",
  // claimLabel: "Claim",
  // targetHash: 33434,
  // targetDescription: "target description right hereeeee",
  // isPerformanceItem: false,
  // brailleOnlyItem: false,
  // targetId: "dfas",
  // depthOfKnowledge: "2",
  // commonCoreStandardId: "AB-123",
  // ccssDescription: "this is the common core description",
  // domain: "domain"
};

export const itemCardList: ItemCardModel[] = [
  {
    bankKey: 187,
    itemKey: 3206,
    stimulusKey: 56900,
    title: "Math Grade 6 Claim 1",
    grade: 8,
    gradeLabel: "Grade 6",
    subjectCode: "MATH",
    subjectLabel: "Math",
    testName: "Test-Name-1",
    testOrder: 1,
    claimCode: "MATH1",
    claimLabel: "1.Concepts and Procedures and Logical",
    targetHash: 100,
    targetId: "A",
    targetDescription: "Target A description with extra text for testing",
    targetShortName: "",
    interactionTypeCode: "EQ",
    interactionTypeLabel: "Equation Multiple Choice choice",
    isPerformanceItem: true,
    brailleOnlyItem: false,
    calculator: true,
    commonCoreStandardId: "6.M.1a",
    itemDifficulty: "Moderate",
    availableBrailleTypes: [
      {
        label: "TDS BT ECN",
        selectionCode: "TDS_BT_ECN",
        disabled: false,
        hidden: false
      },
      {
        label: "DS BT UCB Label",
        selectionCode: "TDS_BT_UCB",
        disabled: false,
        hidden: false
      },
      {
        label: "TDS BT ECL label",
        selectionCode: "TDS_BT_ECL",
        disabled: false,
        hidden: false
      },
      {
        label: "TTDS BT EXN Label",
        selectionCode: "TTDS_BT_EXN",
        disabled: false,
        hidden: false
      }
    ]
  },
  {
    bankKey: 187,
    itemKey: 3163,
    stimulusKey: 58679,
    title: "ELA/ literacy Grade 3 Claim 1",
    grade: 1,
    gradeLabel: "Grade 3",
    subjectCode: "ELA",
    subjectLabel: "ELA/literacy",
    testName: "Test-Name-1",
    testOrder: 2,
    claimCode: "ELA1",
    claimLabel: "1.Reading",
    targetHash: 1039,
    targetId: "B",
    targetDescription: "Target B description",
    targetShortName: "Key Details",
    interactionTypeCode: "MC",
    interactionTypeLabel: "Multiple Choice",
    isPerformanceItem: true,
    brailleOnlyItem: false,
    calculator: false,
    commonCoreStandardId: "3.R.2a",
    itemDifficulty: "Easy",
    availableBrailleTypes: [
      {
        label: "TDS BT ECN",
        selectionCode: "TDS_BT_ECN",
        disabled: false,
        hidden: false
      },
      {
        label: "DS BT UCB Label",
        selectionCode: "TDS_BT_UCB",
        disabled: false,
        hidden: false
      },
      {
        label: "TDS BT ECL label",
        selectionCode: "TDS_BT_ECL",
        disabled: false,
        hidden: false
      },
      {
        label: "TTDS BT EXN Label",
        selectionCode: "TTDS_BT_EXN",
        disabled: false,
        hidden: false
      }
    ]
  },
  {
    bankKey: 187,
    itemKey: 3615,
    stimulusKey: 23461,
    title: "Math Grade 6 Claim 4",
    grade: 8,
    gradeLabel: "Grade 6",
    subjectCode: "MATH",
    subjectLabel: "Math",
    testName: "Test-Name-1",
    testOrder: 3,
    claimCode: "MATH4",
    claimLabel: "3.Modeling/Data Analysis",
    targetHash: 0,
    targetId: "C",
    targetDescription: "target C description",
    targetShortName: "",
    interactionTypeCode: "MS",
    interactionTypeLabel: "Multi Select",
    isPerformanceItem: true,
    brailleOnlyItem: false,
    commonCoreStandardId: "6.M.2b",
    itemDifficulty: "",
    availableBrailleTypes: [
      {
        label: "TDS BT ECN",
        selectionCode: "TDS_BT_ECN",
        disabled: false,
        hidden: false
      },
      {
        label: "DS BT UCB Label",
        selectionCode: "TDS_BT_UCB",
        disabled: false,
        hidden: false
      },
      {
        label: "TDS BT ECL label",
        selectionCode: "TDS_BT_ECL",
        disabled: false,
        hidden: false
      },
      {
        label: "TTDS BT EXN Label",
        selectionCode: "TTDS_BT_EXN",
        disabled: false,
        hidden: false
      }
    ]
  },
  {
    bankKey: 187,
    itemKey: 2928,
    stimulusKey: 87679,
    title: "ELA/ literacy Grade 4 Claim 4",
    grade: 2,
    gradeLabel: "Grade 4",
    subjectCode: "ELA",
    subjectLabel: "ELA/literacy",
    testName: "",
    testOrder: 2,
    claimCode: "ELA4",
    claimLabel: "4.Research/Inquiry",
    targetHash: 2832,
    targetId: "D",
    targetDescription: "target D description",
    targetShortName: "Evaluate Information/ sources",
    interactionTypeCode: "MS",
    interactionTypeLabel: "Multi Select",
    isPerformanceItem: false,
    brailleOnlyItem: false,
    commonCoreStandardId: "4.E.4a",
    itemDifficulty: "Hard",
    availableBrailleTypes: [
      {
        label: "TDS BT ECN",
        selectionCode: "TDS_BT_ECN",
        disabled: true,
        hidden: false
      },
      {
        label: "DS BT UCB Label",
        selectionCode: "TDS_BT_UCB",
        disabled: false,
        hidden: false
      },
      {
        label: "TDS BT ECL label",
        selectionCode: "TDS_BT_ECL",
        disabled: false,
        hidden: false
      },
      {
        label: "TTDS BT EXN Label",
        selectionCode: "TTDS_BT_EXN",
        disabled: false,
        hidden: false
      }
    ]
  }
];

export const totalItemsCardList: ItemCardModel[] = itemCardList;

export const sortableItemCards: ItemCardModel[] = [
  {
    bankKey: 187,
    itemKey: 1,
    title: "alpha",
    grade: 5,
    gradeLabel: "Grade 5",
    subjectCode: "MATH",
    subjectLabel: "Math",
    claimCode: "MATH1",
    claimLabel: "Alpha",
    targetHash: 1,
    targetId: "A",
    targetDescription: "target A description",
    targetShortName: "",
    interactionTypeCode: "EQ",
    interactionTypeLabel: "Equation",
    isPerformanceItem: true,
    brailleOnlyItem: false,
    commonCoreStandardId: "",
    itemDifficulty: "Easy",
    availableBrailleTypes: [
      {
        label: "TDS BT ECN",
        selectionCode: "TDS_BT_ECN",
        disabled: false,
        hidden: false
      },
      {
        label: "DS BT UCB Label",
        selectionCode: "TDS_BT_UCB",
        disabled: false,
        hidden: false
      },
      {
        label: "TDS BT ECL label",
        selectionCode: "TDS_BT_ECL",
        disabled: false,
        hidden: false
      },
      {
        label: "TTDS BT EXN Label",
        selectionCode: "TTDS_BT_EXN",
        disabled: false,
        hidden: false
      }
    ]
  },
  {
    bankKey: 187,
    itemKey: 2,
    title: "bravo",
    grade: 4,
    gradeLabel: "Grade 4",
    subjectCode: "ELA",
    subjectLabel: "ELA/literacy",
    claimCode: "ELA1",
    claimLabel: "Bravo",
    targetHash: 2,
    targetId: "B",
    targetDescription: "target B description",
    targetShortName: "",
    interactionTypeCode: "MC",
    interactionTypeLabel: "Multiple Choice",
    isPerformanceItem: true,
    brailleOnlyItem: false,
    commonCoreStandardId: "",
    itemDifficulty: "Moderate",
    availableBrailleTypes: [
      {
        label: "TDS BT ECN",
        selectionCode: "TDS_BT_ECN",
        disabled: false,
        hidden: false
      },
      {
        label: "DS BT UCB Label",
        selectionCode: "TDS_BT_UCB",
        disabled: false,
        hidden: false
      },
      {
        label: "TDS BT ECL label",
        selectionCode: "TDS_BT_ECL",
        disabled: false,
        hidden: false
      },
      {
        label: "TTDS BT EXN Label",
        selectionCode: "TTDS_BT_EXN",
        disabled: false,
        hidden: false
      }
    ]
  },
  {
    bankKey: 187,
    itemKey: 3,
    title: "charlie",
    grade: 3,
    gradeLabel: "Grade 3",
    subjectCode: "MATH",
    subjectLabel: "Math",
    claimCode: "MATH4",
    claimLabel: "Charlie",
    targetHash: 3,
    targetId: "C",
    targetDescription: "target C description",
    targetShortName: "",
    interactionTypeCode: "MS",
    interactionTypeLabel: "Multi Select",
    isPerformanceItem: false,
    brailleOnlyItem: false,
    commonCoreStandardId: "",
    itemDifficulty: "Hard",
    availableBrailleTypes: [
      {
        label: "TDS BT ECN",
        selectionCode: "TDS_BT_ECN",
        disabled: false,
        hidden: false
      },
      {
        label: "DS BT UCB Label",
        selectionCode: "TDS_BT_UCB",
        disabled: false,
        hidden: false
      },
      {
        label: "TDS BT ECL label",
        selectionCode: "TDS_BT_ECL",
        disabled: false,
        hidden: false
      },
      {
        label: "TTDS BT EXN Label",
        selectionCode: "TTDS_BT_EXN",
        disabled: false,
        hidden: false
      }
    ]
  },
  {
    bankKey: 187,
    itemKey: 4,
    title: "delta",
    grade: 2,
    gradeLabel: "Grade 2",
    subjectCode: "ELA",
    subjectLabel: "ELA/literacy",
    claimCode: "ELA4",
    claimLabel: "Delta",
    targetHash: 4,
    targetId: "D",
    targetDescription: "target D description",
    targetShortName: "",
    interactionTypeCode: "MS",
    interactionTypeLabel: "Multi Select",
    isPerformanceItem: false,
    brailleOnlyItem: false,
    commonCoreStandardId: "",
    itemDifficulty: "Hard",
    availableBrailleTypes: [
      {
        label: "TDS BT ECN",
        selectionCode: "TDS_BT_ECN",
        disabled: false,
        hidden: false
      },
      {
        label: "DS BT UCB Label",
        selectionCode: "TDS_BT_UCB",
        disabled: false,
        hidden: false
      },
      {
        label: "TDS BT ECL label",
        selectionCode: "TDS_BT_ECL",
        disabled: false,
        hidden: false
      },
      {
        label: "TTDS BT EXN Label",
        selectionCode: "TTDS_BT_EXN",
        disabled: false,
        hidden: false
      }
    ]
  }
];

export const itemCardProps: ItemCardProps = {
  rowData: completeItemCard,
  onRowSelect: () => {
    return;
  },
  isInterimSite: true,
  getSelectedItemCount: () => {
    return 0;
  },
  showErrorModalOnPrintItemsCountExceeded: () => {
    return;
  },
  isPrintLimitEnabled: true,
  associatedItems: [],
  countNumberOfItemsAfterSelection: () => {
    return 0;
  },
  testCodeToLabelMap: { "Test-Name-1": "Test 1", "Test-Name-2": "Test 2" }
};

//PerformanceTaskAssociatedItems mockup data
export const performanceTaskAssociatedItems: any = {
  3206: [3163, 3206, 3615],
  3163: [3163, 3206, 3615],
  3615: [3163, 3206, 3615]
};

//PerformanceTaskAssociatedItems details data mockup
export const PTassociatedItems: any = {
  3206: [
    [
      {
        bankKey: 187,
        itemKey: 3163,
        title: "ELA/ literacy Grade 3 Claim 1",
        grade: 1,
        gradeLabel: "Grade 3",
        subjectCode: "ELA",
        subjectLabel: "ELA/literacy",
        claimCode: "ELA1",
        claimLabel: "Reading",
        targetHash: 1039,
        targetId: "B",
        targetDescription: "Target B description",
        targetShortName: "Key Details",
        interactionTypeCode: "MC",
        interactionTypeLabel: "Multiple Choice",
        isPerformanceItem: true,
        brailleOnlyItem: false,
        calculator: false
      }
    ],
    [
      {
        bankKey: 187,
        itemKey: 3206,
        title: "Math Grade 6 Claim 1",
        grade: 8,
        gradeLabel: "Grade 6",
        subjectCode: "MATH",
        subjectLabel: "Math",
        claimCode: "MATH1",
        claimLabel: "Concepts and Procedures and Logical",
        targetHash: 100,
        targetId: "A",
        targetDescription:
          "Target A description with extra text for testing fewoiauighruiaebiurbbvnianiuergruia",
        targetShortName: "",
        interactionTypeCode: "EQ",
        interactionTypeLabel: "Equation Multiple Choice choice",
        isPerformanceItem: true,
        brailleOnlyItem: false,
        calculator: true
      }
    ],
    [
      {
        bankKey: 187,
        itemKey: 3615,
        title: "Math Grade 6 Claim 4",
        grade: 8,
        gradeLabel: "Grade 6",
        subjectCode: "MATH",
        subjectLabel: "Math",
        claimCode: "MATH4",
        claimLabel: "Modeling/Data Analysis",
        targetHash: 0,
        targetId: "C",
        targetDescription: "target C description",
        targetShortName: "",
        interactionTypeCode: "MS",
        interactionTypeLabel: "Multi Select",
        isPerformanceItem: true,
        brailleOnlyItem: false
      }
    ]
  ],
  3163: [
    [
      {
        bankKey: 187,
        itemKey: 3163,
        title: "ELA/ literacy Grade 3 Claim 1",
        grade: 1,
        gradeLabel: "Grade 3",
        subjectCode: "ELA",
        subjectLabel: "ELA/literacy",
        claimCode: "ELA1",
        claimLabel: "Reading",
        targetHash: 1039,
        targetId: "B",
        targetDescription: "Target B description",
        targetShortName: "Key Details",
        interactionTypeCode: "MC",
        interactionTypeLabel: "Multiple Choice",
        isPerformanceItem: true,
        brailleOnlyItem: false,
        calculator: false
      }
    ],
    [
      {
        bankKey: 187,
        itemKey: 3206,
        title: "Math Grade 6 Claim 1",
        grade: 8,
        gradeLabel: "Grade 6",
        subjectCode: "MATH",
        subjectLabel: "Math",
        claimCode: "MATH1",
        claimLabel: "Concepts and Procedures and Logical",
        targetHash: 100,
        targetId: "A",
        targetDescription:
          "Target A description with extra text for testing fewoiauighruiaebiurbbvnianiuergruia",
        targetShortName: "",
        interactionTypeCode: "EQ",
        interactionTypeLabel: "Equation Multiple Choice choice",
        isPerformanceItem: true,
        brailleOnlyItem: false,
        calculator: true
      }
    ],
    [
      {
        bankKey: 187,
        itemKey: 3615,
        title: "Math Grade 6 Claim 4",
        grade: 8,
        gradeLabel: "Grade 6",
        subjectCode: "MATH",
        subjectLabel: "Math",
        claimCode: "MATH4",
        claimLabel: "Modeling/Data Analysis",
        targetHash: 0,
        targetId: "C",
        targetDescription: "target C description",
        targetShortName: "",
        interactionTypeCode: "MS",
        interactionTypeLabel: "Multi Select",
        isPerformanceItem: true,
        brailleOnlyItem: false
      }
    ]
  ],
  3615: [
    [
      {
        bankKey: 187,
        itemKey: 3163,
        title: "ELA/ literacy Grade 3 Claim 1",
        grade: 1,
        gradeLabel: "Grade 3",
        subjectCode: "ELA",
        subjectLabel: "ELA/literacy",
        claimCode: "ELA1",
        claimLabel: "Reading",
        targetHash: 1039,
        targetId: "B",
        targetDescription: "Target B description",
        targetShortName: "Key Details",
        interactionTypeCode: "MC",
        interactionTypeLabel: "Multiple Choice",
        isPerformanceItem: true,
        brailleOnlyItem: false,
        calculator: false
      }
    ],
    [
      {
        bankKey: 187,
        itemKey: 3206,
        title: "Math Grade 6 Claim 1",
        grade: 8,
        gradeLabel: "Grade 6",
        subjectCode: "MATH",
        subjectLabel: "Math",
        claimCode: "MATH1",
        claimLabel: "Concepts and Procedures and Logical",
        targetHash: 100,
        targetId: "A",
        targetDescription:
          "Target A description with extra text for testing fewoiauighruiaebiurbbvnianiuergruia",
        targetShortName: "",
        interactionTypeCode: "EQ",
        interactionTypeLabel: "Equation Multiple Choice choice",
        isPerformanceItem: true,
        brailleOnlyItem: false,
        calculator: true
      }
    ],
    [
      {
        bankKey: 187,
        itemKey: 3615,
        title: "Math Grade 6 Claim 4",
        grade: 8,
        gradeLabel: "Grade 6",
        subjectCode: "MATH",
        subjectLabel: "Math",
        claimCode: "MATH4",
        claimLabel: "Modeling/Data Analysis",
        targetHash: 0,
        targetId: "C",
        targetDescription: "target C description",
        targetShortName: "",
        interactionTypeCode: "MS",
        interactionTypeLabel: "Multi Select",
        isPerformanceItem: true,
        brailleOnlyItem: false
      }
    ]
  ]
};
