import * as React from "react";
import { ItemCardModel, Select, SelectOptionProps } from "@src/index";
import { PrintAccessibilityModal } from "@src/Accessibility/PrintAccessibilityModal";
import {
  TestCodeToLabel,
  ItemIdToTestNameMap
} from "@src/ItemSearch/ItemSearchModels";
import "@src/Assets/Styles/braille-cart.less";

export interface BrailleMenuContainerProps {
  itemsInCart: ItemCardModel[];
  associatedItemsInPrintCart?: ItemCardModel[];
}

export interface BrailleMenuContainerState {
  selectedBrailleType: { [key: number]: string };
}

export class BrailleMenuContainer extends React.Component<
  BrailleMenuContainerProps,
  BrailleMenuContainerState
> {
  constructor(props: BrailleMenuContainerProps) {
    super(props);
    this.state = {
      selectedBrailleType: {}
    };
  }

  handleChangedBrailleType(item: ItemCardModel) {
    const selectedBrailleType = this.state.selectedBrailleType;
    // selectedBrailleType[item.itemKey] =
  }

  renderBrailleMenu = () => {
    const itemsInCart = this.props.itemsInCart;
    const ptItemsInCart = this.props.associatedItemsInPrintCart;
    let brailleMenu = null;
    const selectOptions: SelectOptionProps[] = [];
    brailleMenu = itemsInCart.map(item => (
      <tr>
        <td>{item.itemKey}</td>
        <td>
          {/* <Select
          className="select-print-accessibility"
          label="Translation (Stacked)"
          aria-label="Translation (Stacked)"
          selected={selectedBrailleType || ""}
          options={getBrailleMenuOptions(item.availableBrailleTypes)}
          onChange={this.props.handleLanguageChange}
        /> */}
        </td>
      </tr>
    ));
    return (
      <></>
      // <Select
      //   className="select-print-accessibility"
      //   label="Translation (Stacked)"
      //   aria-label="Translation (Stacked)"
      //   selected={selectedLanguageCode || ""}
      //   options={selectOptions}
      //   onChange={this.props.handleLanguageChange}
      // />
    );
  };

  render() {
    return (
      <>
        <table className="braille-menu-table">
          <tr>
            <th>Item Id</th>
            <th>Braille Options</th>
          </tr>
          {this.renderBrailleMenu()}
        </table>
      </>
    );
  }
}

export function getBrailleMenuOptions(braileType: string[]) {
  const brailleTypeOptions: SelectOptionProps[] = [];
  // braileType.forEach(item=> {
  //   brailleTypeOptions.push({
  //     label: "English",
  //     value: "ENU",
  //     disabled: false,
  //     // selected: selectedLanguageCode === "ENU"
  //   });
  // })
}
