import { ItemCardModel, ItemTableContainerProps } from "@src/index";
import { ItemCardProps } from "@src/ItemCard/ItemCard";

export const completeItemCard: ItemCardModel = {
  selected: false,
  bankKey: 187,
  itemKey: 3434,
  interactionTypeCode: "GI",
  interactionTypeLabel: "Item Type",
  targetShortName: "Short Name",
  title: "ELA Grade 4",
  grade: 4,
  gradeLabel: "Grade 4",
  subjectCode: "ELA",
  subjectLabel: "ELA",
  claimCode: "ELA3",
  claimLabel: "Claim",
  targetHash: 33434,
  targetDescription: "target description right hereeeee",
  isPerformanceItem: false,
  brailleOnlyItem: false,
  targetId: "dfas",
  depthOfKnowledge: "2",
  commonCoreStandardId: "AB-123",
  ccssDescription: "this is the common core description",
  domain: "domain"
};
 

export const itemCardList: ItemCardModel[] = [
  {
    bankKey: 187,
    itemKey: 3206,
    title: "Math Grade 6 Claim 1",
    grade: 8,
    gradeLabel: "Grade 6",
    subjectCode: "MATH",
    subjectLabel: "Math",
    claimCode: "MATH1",
    claimLabel: "Concepts and Procedures",
    targetHash: 100,
    targetId: "A",
    targetDescription:
      "Target A description with extra text for testing fewoiauighruiaebiurbbvnianiuergruia",
    targetShortName: "",
    interactionTypeCode: "EQ",
    interactionTypeLabel: "Equation",
    isPerformanceItem: true,
    brailleOnlyItem: false,
    calculator: true
  },
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
    interactionTypeLabel: "Multiple Choice Multiple Choice Multiple Choice",
    isPerformanceItem: true,
    brailleOnlyItem: false,
    calculator: false
  },
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
    isPerformanceItem: false,
    brailleOnlyItem: false
  },
  {
    bankKey: 187,
    itemKey: 2928,
    title: "ELA/ literacy Grade 4 Claim 4",
    grade: 2,
    gradeLabel: "Grade 4",
    subjectCode: "ELA",
    subjectLabel: "ELA/literacy",
    claimCode: "ELA4",
    claimLabel: "Research/Inquiry",
    targetHash: 2832,
    targetId: "D",
    targetDescription: "target D description",
    targetShortName: "Evaluate Information/ sources",
    interactionTypeCode: "MS",
    interactionTypeLabel: "Multi Select",
    isPerformanceItem: false,
    brailleOnlyItem: false
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
    brailleOnlyItem: false
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
    brailleOnlyItem: false
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
    brailleOnlyItem: false
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
    brailleOnlyItem: false
  }
];

export const itemCardProps: ItemCardProps = {
  rowData: completeItemCard,
  onRowSelect: () => {
    return;
  },
  getSelectedItemCount: () => {return 0;},
  showErrorModalOnPrintItemsCountExceeded: () => {return}
};
