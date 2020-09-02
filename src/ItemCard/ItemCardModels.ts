import { GradeLevels } from "../GradeLevels/GradeLevels";

export interface ItemCardModel {
  selected?: boolean;
  selectionIndex?: number;
  bankKey: number;
  itemKey: number;
  stimulusKey?: number;
  itemDifficulty: string;
  title: string;
  grade: GradeLevels;
  gradeLabel: string;
  subjectCode: string;
  subjectLabel: string;
  testName?: string;
  testOrder?: number;
  testNameInPrintCart?: string;
  testOrderInPrintCart?: number;
  claimCode: string;
  claimLabel: string;
  targetHash: number;
  targetShortName: string;
  targetId: string;
  targetDescription: string;
  interactionTypeCode: string;
  interactionTypeLabel: string;
  isPerformanceItem: boolean;
  brailleOnlyItem?: boolean;
  domain?: string;
  depthOfKnowledge?: string;
  commonCoreStandardId: string;
  ccssDescription?: string;
  calculator?: boolean;
  releaseDate?: string;
  selectedBrailleTypes?: string[];
  availableBrailleTypes: BrailleTypeModel[];
}

export function itemIdEqual(a: ItemCardModel, b: ItemCardModel) {
  return a.itemKey === b.itemKey && a.bankKey === b.bankKey;
}

export interface BrailleTypeModel {
  selectionCode: string;
  label: string;
  disabled: boolean;
  hidden: boolean;
}
