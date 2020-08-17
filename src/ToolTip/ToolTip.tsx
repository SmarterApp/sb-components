import * as React from "react";

export interface ToolTipProps {
  toolTipHeader?: string;
  helpText?: JSX.Element;
  displayIcon?: boolean;
  displayText?: JSX.Element | string | React.ReactText;
  position?: "top" | "bottom";
  side?: "left" | "right";
  className?: string;
  includeTabindex?: boolean;
  onKeyPress?: (e: React.SyntheticEvent) => void;
}

/**
 * A11y friendly tooltip
 * Can display a complicated or a simplified view
 * @export
 * @class ToolTip
 * @extends {React.Component<ToolTipProps, {}>}
 */
export class ToolTip extends React.Component<ToolTipProps, {}> {
  constructor(props: ToolTipProps) {
    super(props);
  }

  renderToolTipHeader() {
    if (this.props.toolTipHeader) {
      return (
        <span className="tool-tip-header">
          <h3 className="tool-tip-link-header">{this.props.toolTipHeader}</h3>
        </span>
      );
    }
  }

  renderToolTipVisibleText() {
    const icon = this.props.displayIcon ? (
      <span className="fa fa-info-circle fa-sm" aria-hidden="true" />
    ) : (
      undefined
    );

    return (
      <span className="tool-tip-hoverable">
        {this.props.children || this.props.displayText} {icon}
      </span>
    );
  }

  renderToolTipHelpText() {
    if (this.props.helpText) {
      return (
        <span
          className={`tool-tip-message ${this.props.position || ""} ${this.props
            .side || ""}`}
        >
          {this.renderToolTipHeader()}
          {this.props.helpText}
        </span>
      );
    }
  }

  handleKeyDown = (keyboardEvent: React.KeyboardEvent) => {
    if (keyboardEvent.keyCode === 32) {
      keyboardEvent.preventDefault();
    }
  };

  handleKeyboardAccessibility = (
    event: any,
    keyboardEvent: React.KeyboardEvent
  ) => {
    let callOnKeyPressProps = false;
    if (keyboardEvent.keyCode === 32) {
      keyboardEvent.preventDefault();
      callOnKeyPressProps = true;
    }
    if (keyboardEvent.keyCode === 13) {
      callOnKeyPressProps = true;
    }
    if (this.props.onKeyPress && callOnKeyPressProps) {
      this.props.onKeyPress(event);
    }
  };

  render() {
    const tabIndex: number =
      this.props.includeTabindex === undefined ||
      this.props.includeTabindex === true
        ? 0
        : -1;
    return (
      <span
        className={`tool-tip-links ${this.props.className || ""}`}
        tabIndex={tabIndex}
        onKeyUp={e => this.handleKeyboardAccessibility(e, e)}
        onKeyDown={e => this.handleKeyDown(e)}
      >
        {this.renderToolTipVisibleText()}
        <span className="tool-tip-details">{this.renderToolTipHelpText()}</span>
      </span>
    );
  }
}

export const generateTooltip = (props: ToolTipProps) => {
  if (props.helpText) {
    return <ToolTip {...props} />;
  }

  return props.displayText;
};
