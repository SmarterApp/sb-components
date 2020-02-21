import * as React from "react";
import * as ReactModal from "react-modal";
import { SelectOptionProps, Select } from "@src/index";
import { ItemCardModel, ItemTableContainer, ItemModel } from "@src/index";
import { PrintAccessibilityModal } from "@src/Accessibility/PrintAccessibilityModal";
// import { BarLoader } from 'react-css-loaders';
import ReactLoading from 'react-loading';


export interface PrintWizardSteps1_Props {
  itemsInCart: ItemCardModel[];
  StatusMessage?: string;
  onRowSelection: (item: ItemModel, reset: boolean) => void;
  onItemSelection: (item: ItemCardModel) => void;
  isLinkTable: boolean;
  currentStep: number;
}

export interface PrintWizardSteps2_Props {
  onSubmitPrint: (
    langCode?: string,
    GlossaryRequired?: string,
    IllustrationRequired?: string
  ) => void;
  currentStep: number;
}

export class PrintWizardSteps1 extends React.Component<PrintWizardSteps1_Props> {
  constructor(props: PrintWizardSteps1_Props) {
    super(props);
  }

  render() {
    if (this.props.currentStep !== 1) return null;
    else {
      if (this.props.itemsInCart && this.props.itemsInCart.length > 0) {
        return (
          <div className="accessibility-resource-type section section-light">
            <ItemTableContainer
              onRowSelection={this.props.onRowSelection}
              onItemSelection={this.props.onItemSelection}
              itemCards={this.props.itemsInCart}
              //item={this.props.item}
              isLinkTable={false}
            />
          </div>
        );
      } else {
        return <div>{"There is no item in cart. Please select any item to continue"}</div>;
      }
    }
  }
}

export class PrintWizardSteps2 extends React.Component<PrintWizardSteps2_Props> {
  constructor(props: PrintWizardSteps2_Props) {
    super(props);
  }

  render() {
    if (this.props.currentStep !== 2) return null;
    else {
      return (
        <>
          <ReactLoading type="spinningBubbles"  color="#000000" height={'10%'} width={'10%'}/>
          /* <PrintAccessibilityModal onSubmitPrint={this.props.onSubmitPrint} /> */
        </>
      );
    }
  }
}
