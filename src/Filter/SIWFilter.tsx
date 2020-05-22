import * as React from "react";
import {
  AdvancedFilterCategoryModel,
  BasicFilterCategoryModel,
  FilterType
} from "./FilterModels";
import {
  SearchAPIParamsModel,
  ItemsSearchModel
} from "../ItemSearch/ItemSearchModels";
import { AdvancedFilterContainer } from "./AdvancedFilterContainer";
import { BasicFilterContainer } from "./BasicFilterContainer";
import { Filter } from "../Filter/Filter";
import { ItemSearch } from "../ItemSearch/ItemSearch";
import * as CombinedFilterHelpers from "./CombinedFilterHelpers";

export interface SIWFilterProps {
  basicFilter: BasicFilterCategoryModel[];
  advancedFilter: AdvancedFilterCategoryModel[];
  searchAPI: SearchAPIParamsModel;
  searchModel?: ItemsSearchModel;
  filterId?: string;
  onFilterUpdated: (
    searchParams: SearchAPIParamsModel,
    basic: BasicFilterCategoryModel[],
    advanced: AdvancedFilterCategoryModel[]
  ) => void;
}

export interface SIWFilterState {
  expanded: boolean;
}

export class SIWFilter extends React.Component<SIWFilterProps, SIWFilterState> {
  constructor(props: SIWFilterProps) {
    super(props);

    this.state = {
      expanded: false
    };
  }

  onBasicFilterUpdated = (
    basicFilter: BasicFilterCategoryModel[],
    changed: FilterType
  ) => {
    const updated = CombinedFilterHelpers.siwFilterUpdated(
      basicFilter,
      this.props.searchAPI,
      this.props.advancedFilter,
      this.props.searchModel,
      changed
    );

    this.props.onFilterUpdated(
      updated.searchAPI,
      updated.basicFilter || [],
      updated.advancedFilter || []
    );
  };

  onResetFilters = () => {
    const updated = CombinedFilterHelpers.resetFilters(
      this.props.basicFilter,
      this.props.advancedFilter,
      this.props.searchModel
    );

    this.props.onFilterUpdated(
      updated.searchAPI,
      updated.basicFilter || [],
      updated.advancedFilter || []
    );
  };

  toggleExpanded = () => this.setState({ expanded: !this.state.expanded });

  onAdvancedFilterUpdated = (
    advancedFilter?: AdvancedFilterCategoryModel[],
    changed?: FilterType
  ) => {
    const updated = CombinedFilterHelpers.advancedFilterUpdated(
      this.props.basicFilter,
      this.props.searchAPI,
      advancedFilter,
      this.props.searchModel,
      changed
    );
    if (updated.advancedFilter) {
      this.props.onFilterUpdated(
        updated.searchAPI,
        updated.basicFilter,
        updated.advancedFilter
      );
    }
  };

  render() {
    const id = this.props.filterId || "";

    let advancedFilter: JSX.Element | undefined;
    if (this.state.expanded) {
      advancedFilter = (
        <AdvancedFilterContainer
          isNested={true}
          filterCategories={this.props.advancedFilter}
          onUpdateFilter={this.onAdvancedFilterUpdated}
        />
      );
    }

    return (
      <div className="filter-component-wrapper">
        {/* <div>
          <div className="alert alert-info" role="alert">
            <strong>Access interim assessment test questions by selecting a grade, subject, and either a test name or content area.</strong>
            <br />
              These are the same interim items available to you in your test delivery system, but this site is designed to support more flexible uses of interim items for classroom instruction. Use the site to view individual items and answers, or select items to create a PDF you can download and print.
          </div>
        </div> */}
        <BasicFilterContainer
          filterId={id}
          filterCategories={this.props.basicFilter}
          onUpdateFilter={this.onBasicFilterUpdated}
          containsAdvancedFilter={true}
          handleAdvancedFilterExpand={this.toggleExpanded}
          resetHandler={this.onResetFilters}
        />
        {advancedFilter}
      </div>
    );
  }
}
