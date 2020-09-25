import * as React from "react";
import { ItemCardModel } from "@src/index";
import { BrailleMenuContainer } from "./BrailleMenuContainer";

export interface BrailleOptionsWizardProps {
  itemsInCart: ItemCardModel[];
  onChangeModelState: (showBrailleModalState: boolean) => void;
  StatusMessage?: string;
  currentStep: number;
  associatedItemsInPrintCart?: ItemCardModel[];
}

export class BrailleOptionsWizard extends React.Component<
  BrailleOptionsWizardProps
> {
  constructor(props: BrailleOptionsWizardProps) {
    super(props);
  }

  render() {
    if (this.props.currentStep !== 2) return null;
    else {
      return (
        <>
          <BrailleMenuContainer
            itemsInCart={this.props.itemsInCart}
            associatedItemsInPrintCart={this.props.associatedItemsInPrintCart}
          />
        </>
      );
    }
  }
}
