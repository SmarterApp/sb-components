import * as React from "react";
import "../Assets/Styles/multi-select.less";
import { MultiSelectValue } from "@src/index";

export interface MultiSelectProps {
  option: MultiSelectValue;
  onValueChange: (option: MultiSelectValue) => void;
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

  handleCheckBoxChange = (
    e: React.SyntheticEvent,
    option: MultiSelectValue
  ) => {
    const target = e.target as HTMLInputElement;
    const value = target.type === "checkbox" ? target.checked : target.value;
    this.setState({ isChecked: value === true });
    console.log(value);
    option.selected = value === true;
    this.props.onValueChange(option);
  };

  render() {
    return (
      <input
        tabIndex={-1}
        // onKeyDown={e => this.shiftFocus(e, 1)}
        type="checkbox"
        // aria-label={this.props.option.label}
        id={this.props.option.value}
        className="checkbox-multi-select"
        disabled={
          this.props.option.disabled && this.props.option.disabled === true
            ? true
            : false
        }
        checked={this.state.isChecked}
        onChange={e => this.handleCheckBoxChange(e, this.props.option)}
      />
    );
  }
}
