import * as React from "react";
import { ItemCardModel } from "@src/index";

/**
 * Props used for button tag
 * @interface PrintCartButtonProps
 */
export interface PrintCartRowGroupProps {
  associatedItemsInPrintCart?: ItemCardModel[];
}

export interface PrintCartRowGroupstate {}

export class PrintCartRowGroup extends React.Component<
  PrintCartRowGroupProps,
  PrintCartRowGroupstate
> {
  constructor(props: PrintCartRowGroupProps) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.associatedItemsInPrintCart !== undefined) {
      return (
        <div>
          {this.props.associatedItemsInPrintCart.map((item, index) => (
            <h3 key={index}>{item.itemKey}</h3>
          ))}
        </div>
      );
    } else {
      return null;
    }
  }
}
