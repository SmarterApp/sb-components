import * as React from "react";
import "../Assets/Styles/multi-select.less";
import { MultiSelectValue } from "@src/index";
import { CheckBox } from "./CheckBox";

import {
  UP_KEY,
  DOWN_KEY,
  getItemIndexInDirection,
  getFirstEnabledItem,
  getFirstSelectedItem,
  getButtonTextDetails
} from "./SelectModel";
import ReactDOM = require("react-dom");

export interface MultiSelectProps {
  options: MultiSelectValue[];
  onChange: (v: MultiSelectValue[]) => void;
  uniqueId: number;
}

export interface MultiSelectState {
  toggleChange: number;
}

export class MultiSelect extends React.Component<
  MultiSelectProps,
  MultiSelectState
> {
  isOpenVar: boolean;
  wrapperRef: HTMLDivElement;
  setWrapperRef: any;
  node: React.RefObject<HTMLDivElement>;
  constructor(props: MultiSelectProps) {
    super(props);
    this.setWrapperRef = (element: HTMLDivElement) => {
      this.wrapperRef = element;
    };
    // this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.state = {
      toggleChange: 0
    };
    this.isOpenVar = false;
  }

  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  }

  handleClickOutside(event: { target: any }) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      if (this.isOpenVar) {
        this.isOpenVar = false;
        this.setState({ toggleChange: this.state.toggleChange === 0 ? 1 : 0 });
      }
    }
  }

  onKeyPressOnButton = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.keyCode === 9) {
      this.isOpenVar = false;
      this.setState({ toggleChange: this.state.toggleChange === 0 ? 1 : 0 });
    }
  };

  shiftFocus = (
    e: React.KeyboardEvent<HTMLElement>,
    currentFocusedElement: number
  ) => {
    if (e.keyCode == UP_KEY) {
      e.preventDefault();
      const nextFocusIndex = getItemIndexInDirection(
        this.props.options,
        currentFocusedElement,
        "PREVIOUS"
      );
      if (nextFocusIndex !== undefined) {
        const dom = document.getElementById(
          this.props.options[nextFocusIndex].value +
            this.props.uniqueId.toString()
        );
        if (dom !== null) {
          window.setTimeout(function() {
            dom.focus();
          }, 0);
        }
      }
    }
    //down
    if (e.keyCode == DOWN_KEY) {
      e.preventDefault();
      const nextFocusIndex = getItemIndexInDirection(
        this.props.options,
        currentFocusedElement,
        "NEXT"
      );
      if (nextFocusIndex !== undefined) {
        const dom = document.getElementById(
          this.props.options[nextFocusIndex].value +
            this.props.uniqueId.toString()
        );
        if (dom !== null) {
          window.setTimeout(function() {
            dom.focus();
          }, 0);
        }
      }
    }

    if (e.keyCode === 9) {
      this.isOpenVar = false;
      this.setState({ toggleChange: this.state.toggleChange === 0 ? 1 : 0 });
    }

    if (e.keyCode === 13 || e.keyCode === 32) {
      e.preventDefault();
      const currentFocus = document.activeElement;
      if (currentFocus !== null)
        document.getElementById(currentFocus.id)!.click();
    }
  };

  handleFocus = () => {
    const isOpen = this.isOpenVar;
    if (isOpen) {
      this.isOpenVar = false;
      this.setState({ toggleChange: this.state.toggleChange === 0 ? 1 : 0 });
    } else {
      this.isOpenVar = true;
      this.setState(
        { toggleChange: this.state.toggleChange === 0 ? 1 : 0 },
        () => {
          this.focusFirstOption();
        }
      );
    }
  };

  focusFirstOption = () => {
    const firstFocusableIndex = getFirstEnabledItem(this.props.options);
    if (
      firstFocusableIndex !== -1 &&
      firstFocusableIndex < this.props.options.length
    ) {
      const elementId =
        this.props.options[firstFocusableIndex].value +
        this.props.uniqueId.toString();
      const element = document.getElementById(elementId);
      document.getElementById(elementId)!.focus();
    }
  };

  handleValueChange = (option: MultiSelectValue) => {
    let changeOptionsArray: MultiSelectValue[] = [];
    changeOptionsArray.push(option);
    this.props.onChange(changeOptionsArray);
    this.setState({ toggleChange: this.state.toggleChange === 0 ? 1 : 0 });
  };

  renderSelectOption = (option: MultiSelectValue, index: number) => {
    return (
      <label
        className={`multiselect-option-label ${
          option.disabled && option.disabled === true ? "disabled " : " "
        }`}
        onKeyDown={e => this.shiftFocus(e, index)}
      >
        <CheckBox
          option={option}
          key={index}
          onValueChange={this.handleValueChange}
          uniqueId={this.props.uniqueId}
        />

        {/* {"  "}
        {option.label} */}
      </label>
    );
  };

  renderSelectMultiOptionsMenu = (optionsList: MultiSelectValue[]) => {
    const multiSelectOptions = optionsList.map((option, index) => (
      // <label
      //   className={
      //     option.disabled && option.disabled === true ? "disabled " : " "
      //   }
      // >
      <li>{this.renderSelectOption(option, index)}</li>
      // </label>
    ));
    return multiSelectOptions;
  };

  renderDropDown = () => {
    //Get ready with text to be displayed in toggle button
    let buttonText: string = this.getButtonText();

    return (
      <>
        <div
          className={`dropdown ${this.isOpenVar ? "open" : ""}`}
          ref={node => this.setWrapperRef(node)}
        >
          <button
            className="btn btn-default dropdown-toggle dropdown-toggle-btn"
            type="button"
            id={"dropdownMenuButton" + this.props.uniqueId}
            data-toggle="dropdown"
            aria-haspopup="true"
            onClick={this.handleFocus}
            onKeyDown={e => {
              this.onKeyPressOnButton(e);
            }}
            tabIndex={0}
          >
            {buttonText} <i className="fa fa-angle-down" aria-hidden="true" />
          </button>
          <form
            className="dropdown-menu"
            aria-labelledby={"dropdownMenuButton" + this.props.uniqueId}
          >
            <ul className="">
              {this.renderSelectMultiOptionsMenu(this.props.options)}
            </ul>
          </form>
        </div>
      </>
    );
  };

  private getButtonText() {
    const buttonDetails = getButtonTextDetails(this.props.options);
    let buttonText: string;
    if (buttonDetails.selectedItemsCount === 0) {
      buttonText = "None selected";
    } else if (buttonDetails.isAllSelected) {
      buttonText = "All selected (" + buttonDetails.selectedItemsCount + ")";
    } else if (buttonDetails.selectedItemsCount === 1) {
      const firstSelectedItem = getFirstSelectedItem(this.props.options);
      buttonText =
        firstSelectedItem !== null ? firstSelectedItem : "1 selected";
      if (buttonText.length > 10) {
        buttonText = buttonText.replace(
          buttonText.substring(12, buttonText.length),
          " ..."
        );
      }
    } else {
      buttonText = buttonDetails.selectedItemsCount + " selected";
    }
    return buttonText;
  }

  render() {
    return <>{this.renderDropDown()}</>;
  }
}
