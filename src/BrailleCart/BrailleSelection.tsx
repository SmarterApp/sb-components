import * as React from "react";
import { ItemCardModel, Select, SelectOptionProps } from "@src/index";
import { PrintAccessibilityModal } from "@src/Accessibility/PrintAccessibilityModal";
import {
  TestCodeToLabel,
  ItemIdToTestNameMap
} from "@src/ItemSearch/ItemSearchModels";
import "@src/Assets/Styles/braille-cart.less";

export interface BrailleSelectionProps {
  selectedBrailleTypes?: string[];
}

export class BrailleSelection extends React.Component<BrailleSelectionProps> {
  constructor(props: BrailleSelectionProps) {
    super(props);
  }

  renderSelectedBraille = () => {
    if (this.props.selectedBrailleTypes) {
      const selectedBrailleTypes = this.props.selectedBrailleTypes;
      let selectedBrailleOptions = null;
      selectedBrailleOptions = selectedBrailleTypes.map(types => (
        <span>{types}, </span>
      ));
      return selectedBrailleOptions;
    }
    return null;
  };

  render() {
    return <>{this.renderSelectedBraille()}</>;
  }
}
