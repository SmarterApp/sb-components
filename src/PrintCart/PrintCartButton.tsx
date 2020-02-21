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
}

/**
 * Returns print cart button
 * @param {PrintCartButtonProps} props btn props for button group
 * @returns JSX React Component
 */
// tslint:disable-next-line:variable-name
export class PrintCartButton extends React.Component<PrintCartButtonProps,PrintCartButtonState> {
    constructor(props: PrintCartButtonProps) {
        super(props);
        this.state = {
            itemsInCart: props.itemsInCart
        }
    }

    componentWillReceiveProps(nextProps: PrintCartButtonProps) {
        this.setState({itemsInCart: nextProps.itemsInCart});
    }
  
    render() {
        return(
            <button type="button" className="btn btn-default btn-sm" onClick={() => this.props.onClick(true)}>
                <span className="glyphicon glyphicon-print"></span> {this.props.label}{" "}
                <span className="circle">{this.state.itemsInCart}</span>
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
