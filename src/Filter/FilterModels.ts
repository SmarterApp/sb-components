import {
  SubjectModel,
  SearchAPIParamsModel,
  GradeLevels,
  GradeLevel
} from "@src/index";

/**
 * Updates a category with the filter option that was selected
 * @param {AdvancedFilterCategoryModel[]} categories
 * @param {AdvancedFilterCategoryModel} selectedCat
 * @param {FilterOptionModel} [option]
 */
export const advFilterSelect = (
  categories: AdvancedFilterCategoryModel[],
  selectedCat: AdvancedFilterCategoryModel,
  option?: FilterOptionModel
): AdvancedFilterCategoryModel[] | undefined => {
  const allPressed = option === undefined && selectedCat.displayAllButton;
  if (!selectedCat.disabled) {
    const categoryIndex = categories.indexOf(selectedCat);

    categories[categoryIndex] = advFilterCategorySelect(
      categories[categoryIndex],
      option
    );

    return categories;
  }
};

export function advFilterCategorySelect(
  selectedCat: AdvancedFilterCategoryModel,
  option?: FilterOptionModel
): AdvancedFilterCategoryModel {
  let newCategory = { ...selectedCat };
  const options = newCategory.filterOptions.slice();
  const allPressed =
    (option === undefined || option.filterType === undefined) &&
    newCategory.displayAllButton;

  if (option != undefined && option.filterType === "SearchItemId") {
    newCategory.filterOptions[0] = option;
    return newCategory;
  }

  if (!newCategory.disabled) {
    if (allPressed) {
      options.forEach((opt: FilterOptionModel) => (opt.isSelected = false));
    } else if (option) {
      const optionIdx = options.indexOf(option);
      options[optionIdx].isSelected = !option.isSelected;
      if (!selectedCat.isMultiSelect) {
        options.forEach((opt: FilterOptionModel) => {
          opt.isSelected = opt === option ? opt.isSelected : false;
        });
      }
    }
  }

  return newCategory;
}

export enum OptionTypeModel {
  inputBox,
  button,
  radioBtn,
  DropDown,
  AdvFilter
}

export enum FilterType {
  Subject = "Subject",
  Grade = "Grade",
  Claim = "Claim",
  Performance = "Performance",
  Target = "Target",
  CAT = "CAT",
  InteractionType = "InteractionType",
  Calculator = "Calculator",
  TechnologyType = "TechnologyType", // Contains Performance and CAT
  SearchItemId = "SearchItemId",
  TestNames = "TestNames",
  CoreStandards = "CoreStandards",
  ReleaseDate = "ReleaseDate"
}

export interface FilterOptionModel {
  label: string;
  key: string;
  isSelected: boolean;
  filterType?: FilterType;
}

export interface BasicFilterCategoryModel extends FilterCategoryModel {
  optionType: OptionTypeModel;
  placeholderText?: string;
  hideSelectMessage?: boolean;
  displayAllButton?: boolean;
}

export interface FilterCategoryModel {
  disabled: boolean;
  label: string;
  filterOptions: FilterOptionModel[];
  helpText?: string;
  emptyOptionsText?: string;
  code: FilterType;
  isMultiSelect?: boolean;
  show?: boolean;
}

export interface AdvancedFilterCategoryModel extends FilterCategoryModel {
  displayAllButton: boolean;
  optionType?: OptionTypeModel;
  placeholderText?: string;
  hideSelectMessage?: boolean;
}

// tslint:disable-next-line: no-empty-interface
export interface TechType extends SubjectModel {}

export interface AdvancedFiltersModel {
  subjects: AdvancedFilterCategoryModel;
  grades: AdvancedFilterCategoryModel;
  techTypes: AdvancedFilterCategoryModel;
}
