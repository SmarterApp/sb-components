import * as React from "react";
import {
  AdvancedFilterCategoryModel,
  FilterOptionModel,
  OptionTypeModel,
  FilterType,
  BtnGroupOption,
  ToolTip,
  generateTooltip,
  Select
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
            ariaLabel={`Select ${this.props.label} ${t.label}`}
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
        <label htmlFor="btn-group-filter">{tooltip}</label>
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

  findFilterOption(key: string) {
    return this.props.filterOptions.find(fil => fil.key === key);
  }

  /**
   * Renders Select list for the category with default option
   * @returns {JSX.Element} Select React component
   */
  renderDropDown(): JSX.Element {
    const {
      onFilterOptionSelect,
      optionType,
      filterOptions,
      disabled,
      label,
      code,
      emptyOptionsText
    } = this.props;
    const defaultValue = "default";
    const selected = filterOptions.find(fil => fil.isSelected === true);
    const selectedValue = selected ? selected.key : defaultValue;

    const selectOptions = filterOptions.map(fo => {
      return {
        disabled,
        selected: selectedValue === fo.key,
        label: fo.label,
        value: fo.key
      };
    });

    if (!this.props.hideSelectMessage) {
      selectOptions.splice(0, 0, {
        disabled,
        selected: selectedValue === defaultValue,
        label: `Select ${label}`,
        value: defaultValue
      });
    }

    if (filterOptions != undefined && filterOptions.length > 0) {
      return (
        <Select
          disabled={disabled}
          label={label}
          selected={selectedValue}
          options={selectOptions}
          onChange={val => onFilterOptionSelect(this.findFilterOption(val))}
          key={code}
          className={"input-sm"}
        />
      );
    } else {
      return (
        <div>
          <label>
            <span className="">{label}</span>
          </label>
          <div
            className="nested-btn-group btn-group-sm toggle-group vertical"
            data-toggle="buttons"
          >
            <div className="btn-group filter-btn-group">
              <div>{emptyOptionsText}</div>
            </div>
          </div>
        </div>
      );
    }
  }

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
          <label
            className="tooltip-label"
            info-label="true"
            htmlFor="search-filter"
          >
            {label}
          </label>
        )
      });

      return (
        <div className="input-box">
          <label>{tooltip}</label>
          <input
            className="form-control"
            type="text"
            id="search-filter"
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
        {optionType != OptionTypeModel.inputBox &&
          optionType != OptionTypeModel.DropDown &&
          this.renderHeader()}
        {optionType != OptionTypeModel.inputBox &&
          optionType != OptionTypeModel.DropDown &&
          this.renderBody()}
        {optionType === OptionTypeModel.inputBox && this.renderSearch()}
        {optionType === OptionTypeModel.DropDown && this.renderDropDown()}
      </div>
    );
  }
}
