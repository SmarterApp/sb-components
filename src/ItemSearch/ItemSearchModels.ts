import { Filter } from "../Filter/Filter";
import { GradeLevels, GradeLevel } from "../GradeLevels/GradeLevels";
import { InteractionTypeModel } from "../AboutTestItems/AboutTestItemsModels";
import { ItemCardModel } from "../ItemCard/ItemCardModels";
import {
  AdvancedFilterCategoryModel,
  FilterOptionModel,
  FilterType
} from "../Filter/FilterModels";

export type SearchFilterStringTypes =
  | SubjectModel
  | InteractionTypeModel
  | SearchBaseModel
  | TestNameModel
  | ReleaseDateModel;

export type SearchFilterTypes =
  | SearchFilterStringTypes
  | TargetModel
  | GradeLevels
  | ClaimModel
  | CoreStandardModel;

export type SearchFilterModelTypes =
  | FilterSearchGradeLevelModel
  | FilterSearchStringModel<SearchFilterStringTypes>
  | FilterSearchTargetModel
  | FilterSearchClaimModel
  | FilterSearchCoreStandardModel;

export interface SubjectClaimsModel {
  [subject: string]: { text: string; value: string }[];
}

export interface SearchBaseModel {
  label: string;
  code: string;
}

export interface SubjectModel extends SearchBaseModel {
  claimCodes?: string[];
  interactionTypeCodes?: string[];
  shortLabel?: string;
  testCodes?: string[];
}

export interface TestNameModel extends SearchBaseModel {
  shortLabel?: string;
  subject?: string;
  grade?: string;
}

export interface ReleaseDateModel extends SearchBaseModel {
  shortLabel?: string;
  releaseDate: string;
}

export interface ClaimModel extends SearchBaseModel {
  targetCodes?: string[];
  claimNumber: string;
  coreStandardCodes?: string;
}

export interface TestCodeToLabel {
  [key: string]: string;
}

export interface ItemIdToTestNameMap {
  [key: number]: TestNameAndPosition;
}

export interface TargetModel {
  name: string;
  nameHash: number;
  idLabel: string;
  id: string;
}

export interface CoreStandardModel {
  commonCoreStandardsId: string;
  commonCoreStandardsDescription: string;
  claimId: string;
  subject: string;
  target: TargetModel;
}

export interface SearchAPIParamsModel {
  itemId?: string;
  gradeLevels?: GradeLevels;
  subjects?: string[];
  claims?: string[];
  interactionTypes?: string[];
  performanceOnly?: boolean;
  catOnly?: boolean;
  targets?: string[];
  calculator?: boolean;
  testNames?: string[];
  coreStandards?: string[];
  releaseDates?: string[];
}

export interface ItemsSearchModel {
  interactionTypes?: InteractionTypeModel[];
  subjects?: SubjectModel[];
  claims?: ClaimModel[];
  targets?: TargetModel[];
  testNames?: TestNameModel[];
  coreStandard?: CoreStandardModel[];
  releaseDates?: ReleaseDateModel[];
}

export interface ItemsSearchFilterModel {
  interactionTypes: FilterSearchStringModel<InteractionTypeModel>;
  subjects: FilterSearchStringModel<SubjectModel>;
  claims: FilterSearchStringModel<ClaimModel>;
  targets: FilterSearchTargetModel;
  grades: FilterSearchGradeModel;
  technologyTypes: FilterSearchStringModel<SearchBaseModel>;
  calculator: FilterSearchStringModel<SearchBaseModel>;
  testNames: FilterSearchStringModel<TestNameModel>;
  testNameItemPools: TestNameItemsPoolModel[];
  coreStandards: FilterSearchCoreStandardModel;
  releaseDates: FilterSearchStringModel<ReleaseDateModel>;
}

export interface FilterSearchModel {
  label: string;
  helpText?: string;
  code: FilterType;
  filterOptions: SearchFilterTypes[];
}

export interface FilterSearchStringModel<T extends SearchFilterStringTypes>
  extends FilterSearchModel {
  filterOptions: T[];
  code:
    | FilterType.InteractionType
    | FilterType.Subject
    | FilterType.TechnologyType
    | FilterType.Calculator
    | FilterType.TestNames
    | FilterType.ReleaseDate;
  show: boolean;
}

export interface FilterSearchGradeLevelModel extends FilterSearchModel {
  filterOptions: GradeLevels[];
  code: FilterType.Grade;
}

export interface FilterSearchTargetModel extends FilterSearchModel {
  filterOptions: TargetModel[];
  code: FilterType.Target;
}

export interface FilterSearchCoreStandardModel extends FilterSearchModel {
  filterOptions: CoreStandardModel[];
  code: FilterType.CoreStandards;
}

export interface FilterSearchGradeModel extends FilterSearchModel {
  filterOptions: GradeLevels[];
  code: FilterType.Grade;
}

export interface FilterSearchClaimModel extends FilterSearchModel {
  filterOptions: ClaimModel[];
  code: FilterType.Claim;
}

export interface TestNameItemsPoolModel {
  code: string;
  itemKeys: Array<itemKeys>;
}

export interface itemKeys {
  itemKey: number;
  itemPosition: number;
}

export interface TestNameAndPosition {
  testName: string;
  testOrder: number;
}
