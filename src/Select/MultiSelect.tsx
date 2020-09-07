import * as React from "react";
import "../Assets/Styles/multi-select.less";
import { MultiSelectValue } from "@src/index";
import { CheckBox } from "./CheckBox";
import {
  UP_KEY,
  DOWN_KEY,
  getItemIndexInDirection,
  getFirstEnabledItem
} from "./SelectModel";

export interface MultiSelectProps {
  options: MultiSelectValue[];
  onChange: (v: MultiSelectValue[]) => void;
}

export interface MultiSelectState {
  isDisplayOn: boolean;
}

export class MultiSelect extends React.Component<
  MultiSelectProps,
  MultiSelectState
> {
  constructor(props: MultiSelectProps) {
    super(props);
    this.state = {
      isDisplayOn: false
    };
  }

  showCheckboxes = () => {
    var checkboxes = document.getElementById("checkBoxes");
    const isDisplayOn = this.state.isDisplayOn === true ? false : true;
    this.setState({ isDisplayOn: isDisplayOn });
  };

  shiftFocus = (
    e: React.KeyboardEvent<HTMLElement>,
    currentFocusedElement: number
  ) => {
    if (e.keyCode == UP_KEY) {
      const nextFocusIndex = getItemIndexInDirection(
        this.props.options,
        currentFocusedElement,
        "PREVIOUS"
      );
      if (nextFocusIndex !== undefined) {
        const dom = document.getElementById(
          this.props.options[nextFocusIndex].value
        );
        if (dom !== null) {
          dom.focus();
        }
      }
    }
    //down
    if (e.keyCode == DOWN_KEY) {
      const nextFocusIndex = getItemIndexInDirection(
        this.props.options,
        currentFocusedElement,
        "NEXT"
      );
      if (nextFocusIndex !== undefined) {
        const dom = document.getElementById(
          this.props.options[nextFocusIndex].value
        );
        if (dom !== null) {
          dom.focus();
        }
      }
    }

    if (e.keyCode === 13) {
      const currentFocus = document.activeElement;
      if (currentFocus !== null)
        document.getElementById(currentFocus.id)!.click();
    }
  };

  handleFocus = () => {
    const firstFocusableIndex = getFirstEnabledItem(this.props.options);
    if (
      firstFocusableIndex !== -1 &&
      firstFocusableIndex < this.props.options.length
    ) {
      document.getElementById(
        this.props.options[firstFocusableIndex].value
      )!.focus();
    }
  };

  handleCheckBoxChange = (
    e: React.SyntheticEvent,
    option: MultiSelectValue
  ) => {
    const target = e.target as HTMLInputElement;
    const value = target.type === "checkbox" ? target.checked : target.value;
    console.log(value);
  };

  select = () => {
    console.log("labbelddd clicked");
  };

  handleValueChange = (option: MultiSelectValue) => {
    let changeOptionsArray: MultiSelectValue[] = [];
    changeOptionsArray.push(option);
    this.props.onChange(changeOptionsArray);
  };

  renderSelectOption = (option: MultiSelectValue, index: number) => {
    return (
      <label
        className="multiselect-option-label"
        onKeyDown={e => this.shiftFocus(e, index)}
      >
        <CheckBox option={option} onValueChange={this.handleValueChange} />

        {"  "}
        {option.label}
      </label>
    );
  };

  renderSelectMultiOptionsMenu = (optionsList: MultiSelectValue[]) => {
    const multiSelectOptions = optionsList.map((option, index) => (
      <label
        className={
          option.disabled && option.disabled === true ? "disabled " : " "
        }
      >
        {this.renderSelectOption(option, index)}
      </label>
    ));
    return multiSelectOptions;
  };

  renderDropDown = () => {
    const displayStyle = this.state.isDisplayOn === true ? "block" : "none";
    return (
      <>
        <div className="dropdown">
          <button
            className="btn btn-primary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            onClick={this.handleFocus}
            tabIndex={0}
          >
            Click me
          </button>
          <form className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {/* <ul className=""> */}
            {this.renderSelectMultiOptionsMenu(this.props.options)}
            {/* </ul> */}
          </form>
        </div>
      </>
    );
  };

  render() {
    return <>{this.renderDropDown()}</>;
  }
}
