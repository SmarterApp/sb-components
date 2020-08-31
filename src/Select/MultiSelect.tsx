import * as React from "react";
import "../Assets/Styles/multi-select.less";
import "bootstrap";
import {} from "jquery";

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

  shiftFocus = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.keyCode == 40) {
      $(".move:focus")
        .next()
        .focus();
    }

    if (e.keyCode == 38) {
      $(".move:focus")
        .prev()
        .focus();
    }
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
          >
            Dropdown button
          </button>
          <form className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <label className="dropdown-item">
              <input
                tabIndex={0}
                onKeyDown={e => this.shiftFocus(e)}
                type="checkbox"
                name=""
                value="one"
              />First checkbox
            </label>
            <label className="dropdown-item">
              <input
                tabIndex={0}
                onKeyDown={e => this.shiftFocus(e)}
                disabled
                type="checkbox"
                name=""
                value="two"
              />Second checkbox
            </label>
            <label className="dropdown-item">
              <input
                tabIndex={0}
                onKeyDown={e => this.shiftFocus(e)}
                type="checkbox"
                name=""
                value="three"
              />Third checkbox
            </label>
          </form>
        </div>
        <button>hiii</button>
        <button type="button" className="btn btn-success">
          Success
        </button>
      </>
    );
  };

  render() {
    return <>{this.renderDropDown()}</>;
  }
}
