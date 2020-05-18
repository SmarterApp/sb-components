import * as React from "react";

/**
 * Props used for button tag
 * @interface PrintCartButtonProps
 */
export interface PrintCartButtonProps {
  // handleShowModal: (modelState: boolean) => void;
  label: string;
  itemsInCart: number;
  onClick: (modelState: boolean) => void;
}

export interface PrintCartButtonState {
  itemsInCart: number;
  shouldDoAddToCartPopupEffect: boolean;
  addToCartPopupEffectCSS: string;
}

/**
 * Returns print cart button
 * @param {PrintCartButtonProps} props btn props for button group
 * @returns JSX React Component
 */
// tslint:disable-next-line:variable-name
export class PrintCartButton extends React.Component<
  PrintCartButtonProps,
  PrintCartButtonState
> {
  constructor(props: PrintCartButtonProps) {
    super(props);
    this.state = {
      itemsInCart: props.itemsInCart,
      shouldDoAddToCartPopupEffect: false,
      addToCartPopupEffectCSS: ""
    };
  }

  componentWillReceiveProps(nextProps: PrintCartButtonProps) {
    if (this.props.itemsInCart !== nextProps.itemsInCart) {
      const tempCSSClassName =
        this.state.addToCartPopupEffectCSS === " popout-effect1"
          ? " popout-effect2"
          : " popout-effect1";
      this.setState({
        itemsInCart: nextProps.itemsInCart,
        addToCartPopupEffectCSS: tempCSSClassName
      });
    } else {
      this.setState({ itemsInCart: nextProps.itemsInCart });
    }
  }

  render() {
    const btnClassName = "circle " + this.state.addToCartPopupEffectCSS;
    return (
      <button
        type="button"
        className="btn btn-default btn-sm btn-print-cart"
        onClick={() => this.props.onClick(true)}
      >
        <span className="glyphicon glyphicon-print" /> {this.props.label}{" "}
        <span className={btnClassName}>{this.state.itemsInCart}</span>
      </button>
    );
  }
}

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
