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
export const onFilterSelect = (
  categories: AdvancedFilterCategoryModel[],
  selectedCat: AdvancedFilterCategoryModel,
  option?: FilterOptionModel
): AdvancedFilterCategoryModel[] | undefined => {
  const allPressed = option === undefined && selectedCat.displayAllButton;
  if (!selectedCat.disabled) {
    const categoryIndex = categories.indexOf(selectedCat);
    const options = categories[categoryIndex].filterOptions.slice();
    if (allPressed) {
      options.forEach((opt: FilterOptionModel) => (opt.isSelected = false));
    }
    if (option) {
      const optionIdx = options.indexOf(option);
      options[optionIdx].isSelected = !option.isSelected;
      if (!selectedCat.isMultiSelect) {
        options.forEach((opt: FilterOptionModel) => {
          opt.isSelected = opt === option ? opt.isSelected : false;
        });
      }
    }
    categories[categoryIndex].filterOptions = options;

    return categories;
  }
};
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
  SearchItemId = "SearchItemId"
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
}

export interface FilterCategoryModel {
  disabled: boolean;
  label: string;
  filterOptions: FilterOptionModel[];
  helpText?: string;
  emptyOptionsText?: string;
  code: FilterType;
}

export interface AdvancedFilterCategoryModel extends FilterCategoryModel {
  isMultiSelect: boolean;
  displayAllButton: boolean;
}

// tslint:disable-next-line: no-empty-interface
export interface TechType extends SubjectModel {}

export interface AdvancedFiltersModel {
  subjects: AdvancedFilterCategoryModel;
  grades: AdvancedFilterCategoryModel;
  techTypes: AdvancedFilterCategoryModel;
}
