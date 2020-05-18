import * as React from "react";
import {
  AdvancedFilterCategoryModel,
  FilterOptionModel,
  OptionTypeModel,
  FilterType,
  BtnGroupOption,
  ToolTip,
  generateTooltip
} from "../index";

export interface AdvancedFilterProps extends AdvancedFilterCategoryModel {
  onFilterOptionSelect: (data?: FilterOptionModel) => void;
}

export class AdvancedFilter extends React.Component<AdvancedFilterProps, {}> {
  constructor(props: AdvancedFilterProps) {
    super(props);
  }

  renderAllBtnContainer() {
    const {
      filterOptions,
      onFilterOptionSelect,
      displayAllButton,
      disabled
    } = this.props;
    let allBtnContainer: JSX.Element | undefined;
    const anySelected = filterOptions.some(fo => fo.isSelected);
    if (filterOptions.length > 0 && displayAllButton) {
      allBtnContainer = (
        <BtnGroupOption
          onClick={onFilterOptionSelect}
          disabled={disabled}
          selected={!anySelected}
          label="All"
          ariaLabel={`Select All ${this.props.label}`}
        />
      );
    }

    return allBtnContainer;
  }

  renderTags() {
    const {
      filterOptions,
      onFilterOptionSelect,
      disabled,
      emptyOptionsText
    } = this.props;
    const tags: JSX.Element[] = [];

    if (filterOptions.length > 0) {
      if (
        filterOptions[0].filterType === FilterType.TechnologyType ||
        filterOptions[0].filterType === FilterType.Calculator
      ) {
        filterOptions.sort((a, b) =>
          b.label.localeCompare(a.label, undefined, {
            usage: "sort",
            sensitivity: "variant"
          })
        );
        if (filterOptions[0].filterType === FilterType.Calculator) {
          filterOptions.reverse();
        }
      } else {
        filterOptions.sort((a, b) =>
          a.key.localeCompare(b.key, undefined, {
            usage: "sort",
            numeric: true,
            sensitivity: "base"
          })
        );
      }

      filterOptions.forEach((t, i) => {
        tags.push(
          <BtnGroupOption
            onClick={() => onFilterOptionSelect(t)}
            disabled={disabled}
            selected={t.isSelected}
            label={t.label}
            key={t.key}
          />
        );
      });
    } else {
      tags.push(<div key={0}>{emptyOptionsText || "No options."}</div>);
    }

    return tags;
  }

  renderHeader() {
    const { helpText, label } = this.props;
    const text = helpText ? <p>{helpText}</p> : undefined;
    const tooltip = generateTooltip({
      helpText: text,
      displayIcon: text !== undefined,
      displayText: (
        <span className="tooltip-label" info-label="true">
          {label}
        </span>
      )
    });

    return (
      <div className="filter-container-header">
        <label>{tooltip}</label>
      </div>
    );
  }

  renderBody() {
    const { displayAllButton, isMultiSelect } = this.props;
    const orientationVertical =
      displayAllButton === true || isMultiSelect === true;

    return (
      <div
        className={`${
          orientationVertical ? "nested-btn-group" : ""
        } btn-group-sm toggle-group ${
          orientationVertical ? "vertical" : "horizontal"
        }`}
        data-toggle="buttons"
      >
        {this.renderAllBtnContainer()}
        <div className="btn-group filter-btn-group">{this.renderTags()}</div>
      </div>
    );
  }

  searchHandler = (searchText: string) => {
    const newOption: FilterOptionModel = {
      label: this.props.label,
      key: searchText,
      isSelected: true,
      filterType: this.props.code
    };

    this.props.onFilterOptionSelect(newOption);
  };

  renderSearch(): JSX.Element {
    const {
      onFilterOptionSelect,
      optionType,
      label,
      helpText,
      placeholderText,
      filterOptions
    } = this.props;
    if (optionType == OptionTypeModel.inputBox) {
      const text = helpText ? <p>{helpText}</p> : undefined;
      const value =
        filterOptions && filterOptions.length > 0 ? filterOptions[0].key : "";
      const tooltip = generateTooltip({
        helpText: text,
        displayIcon: text !== undefined,
        displayText: (
          <span className="tooltip-label" info-label="true">
            {label}
          </span>
        )
      });

      return (
        <div className="input-box">
          <label>{tooltip}</label>
          <input
            className="form-control"
            type="text"
            onChange={t => this.searchHandler(t.currentTarget.value)}
            placeholder={placeholderText}
            value={value}
          />
        </div>
      );
    }
    return <></>;
  }

  render() {
    const { disabled, label, helpText, optionType } = this.props;
    // replace "-" with spaces, replace "." with nothing.
    const id = label.replace(/\ /g, "-").replace(/\./g, "");
    if (disabled) {
      // tslint:disable-next-line:no-null-keyword
      return null;
    }

    return (
      <div
        id={`${id}-filter`.toLocaleLowerCase()}
        className={"filter-selection"}
      >
        {optionType != OptionTypeModel.inputBox && this.renderHeader()}
        {optionType != OptionTypeModel.inputBox && this.renderBody()}
        {optionType === OptionTypeModel.inputBox && this.renderSearch()}
      </div>
    );
  }
}
