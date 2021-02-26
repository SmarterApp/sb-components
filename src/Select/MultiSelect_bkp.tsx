import * as React from "react";
import "../Assets/Styles/multi-select.less";

export interface MultiSelectProps {
  message: string;
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

  shiftFocus = (e: React.KeyboardEvent<HTMLElement>, idx: number) => {
    if (e.keyCode == 40) {
      idx = idx + 1;
      const ids = idx.toString();
      const dom = document.getElementById(ids);
      if (dom !== null) {
        dom.focus();
      }
    }
    //down
    if (e.keyCode == 38) {
      idx = idx - 1;
      const ids = idx.toString();
      const dom = document.getElementById(ids);
      if (dom !== null) {
        dom.focus();
      }
    }
  };

  handleFocus = () => {
    document.getElementById("1")!.focus();
  };

  renderSelectOption = () => {};

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
          >
            Click me
          </button>
          <form className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <label className="dropdown-item" htmlFor="1">
              <input
                tabIndex={0}
                onKeyDown={e => this.shiftFocus(e, 1)}
                type="checkbox"
                aria-aria-label="checkbox 1"
                name=""
                value="one"
                id="1"
              />First checkbox
            </label>
            <label
              className="dropdown-item"
              htmlFor="2"
              aria-aria-label="checkbox 1"
            >
              <input
                tabIndex={0}
                onKeyDown={e => this.shiftFocus(e, 2)}
                aria-aria-label="checkbox 2"
                type="checkbox"
                name=""
                value="two"
                id="2"
              />Second checkbox
            </label>
            <label className="dropdown-item" htmlFor="3">
              <input
                tabIndex={0}
                onKeyDown={e => this.shiftFocus(e, 3)}
                aria-aria-label="checkbox 3"
                type="checkbox"
                name=""
                value="three"
                id="3"
              />Third checkbox
            </label>
          </form>
        </div>
      </>
    );
  };

  render() {
    return <>{this.renderDropDown()}</>;
  }
}
