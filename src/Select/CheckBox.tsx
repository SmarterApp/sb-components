import * as React from "react";
import "../Assets/Styles/multi-select.less";
import { MultiSelectValue } from "@src/index";

export interface MultiSelectProps {
  option: MultiSelectValue;
  onValueChange: (option: MultiSelectValue) => void;
  uniqueId: number;
}

export interface MultiSelectState {
  isChecked: boolean;
}

export class CheckBox extends React.Component<
  MultiSelectProps,
  MultiSelectState
> {
  constructor(props: MultiSelectProps) {
    super(props);
    this.state = {
      isChecked: this.props.option.selected
    };
  }

  handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.keyCode === 13 || e.keyCode === 32) {
      const currentFocus = document.activeElement;
      if (currentFocus !== null)
        document.getElementById(currentFocus.id)!.click();
    }
  };

  handleCheckBoxChange = (
    e: React.SyntheticEvent,
    option: MultiSelectValue
  ) => {
    const target = e.target as HTMLInputElement;
    const value = target.type === "checkbox" ? target.checked : target.value;
    // option.selected = value === true;
    option.selected = this.state.isChecked ? false : true;
    this.setState({ isChecked: this.state.isChecked ? false : true });
    this.props.onValueChange(option);
    e.stopPropagation();
    e.preventDefault();
  };

  render() {
    return (
      <label
        style={{ textAlign: "left" }}
        tabIndex={-1}
        role="checkbox"
        aria-checked={this.state.isChecked}
        aria-label={this.props.option.label}
        id={`${this.props.option.value}${this.props.uniqueId}`}
        className={`checkbox-multi-select btn `}
        onClick={e => this.handleCheckBoxChange(e, this.props.option)}
        onKeyDown={e => {
          this.handleKeyDown(e);
        }}
      >
        <i
          style={{ marginRight: "4px" }}
          className={
            this.props.option.selected
              ? "fa fa-check-square-o"
              : "fa fa-square-o"
          }
          aria-hidden="true"
        />
        {"  "}
        {this.props.option.label}
      </label>
    );
  }
}
