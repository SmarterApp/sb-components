import * as React from "react";

/**
 * Props used for button tag
 * @interface BtnGroupOptionProps
 */
export interface BtnPrintCartProps {
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
    <button
      type="button"
      className="btn btn-default btn-sm"
      onClick={() => props.onClick(true)}
    >
      <span className="glyphicon glyphicon-print" /> {props.label}{" "}
      <span className="circle">{props.itemsInCart}</span>
    </button>
  );
};
