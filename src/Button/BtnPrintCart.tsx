import * as React from "react";

/**
 * Props used for button tag
 * @interface BtnGroupOptionProps
 */
export interface BtnPrintCartProps {
  // handleShowModal: (modelState: boolean) => void;
  label: string;
  itemsInCart: number;
  onClick: (modelState: boolean) => void;
}

/**
 * Returns sbac-ui-kit button group
 * @param {BtnGroupOptionProps} props btn props for button group
 * @returns JSX React Component
 */
// tslint:disable-next-line:variable-name
export const BtnPrintCart: React.SFC<BtnPrintCartProps> = props => {
  return (
    // <button
    //   className={`btn btn-primary ${className}`}
    //   role="switch"
    //   aria-checked={props.selected}
    //   disabled={props.disabled}
    //   onClick={props.onClick}
    //   aria-label={ariaLabel}
    // >
    //   {props.label}
    // </button>

    <button type="button" className="btn btn-default btn-sm" onClick={() => props.onClick(true)}>
      <span className="glyphicon glyphicon-shopping-cart"></span> {props.label}{" "}
      <span className="circle">{props.itemsInCart}</span>
    </button>
  );
};
