import * as React from "react";
import { ItemCardModel, Select, SelectOptionProps } from "@src/index";
import { PrintAccessibilityModal } from "@src/Accessibility/PrintAccessibilityModal";
import {
  TestCodeToLabel,
  ItemIdToTestNameMap
} from "@src/ItemSearch/ItemSearchModels";
import "@src/Assets/Styles/braille-cart.less";
import { BrailleSelection } from "./BrailleSelection";

export interface BrailleMenuContainerProps {
  itemsInCart: ItemCardModel[];
  associatedItemsInPrintCart?: ItemCardModel[];
}

export interface BrailleMenuContainerState {
  selectedBrailleType: { [key: number]: string[] };
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

  handleChangedBrailleType = (
    selectedBraille: string,
    item?: ItemCardModel
  ) => {
    if (item !== undefined) {
      if (item.selectedBrailleTypes === undefined)
        item.selectedBrailleTypes = [];
      if (item.selectedBrailleTypes.indexOf(selectedBraille) === -1) {
        item.selectedBrailleTypes.push(selectedBraille);
        console.log("****>>>>", item.selectedBrailleTypes);
      }

      let selectedBrailleType = this.state.selectedBrailleType;
      if (item.itemKey in selectedBrailleType) {
        if (selectedBrailleType[item.itemKey].indexOf(selectedBraille) === -1) {
          console.log(
            selectedBrailleType[item.itemKey].indexOf(selectedBraille)
          );
          selectedBrailleType[item.itemKey].push(selectedBraille);
        }
      } else {
        selectedBrailleType[item.itemKey] = [];
        selectedBrailleType[item.itemKey].push(selectedBraille);
      }
      this.setState({ selectedBrailleType: selectedBrailleType });
    }
  };

  renderSelectedBraille = () => {};

  renderBrailleMenu = () => {
    const itemsInCart = this.props.itemsInCart;
    const ptItemsInCart = this.props.associatedItemsInPrintCart;
    let brailleMenu = null;
    const selectOptions: SelectOptionProps[] = [];
    brailleMenu = itemsInCart.map(item => (
      <tr>
        <td>{item.itemKey}</td>
        <td>
          <Select
            className="select-print-accessibility"
            forItem={item}
            label="Braille Type"
            aria-label="Braille Type"
            selected={
              item.selectedBrailleTypes !== undefined
                ? item.selectedBrailleTypes[0]
                : "No Braille"
            }
            options={getBrailleMenuOptions(
              item.availableBrailleTypes,
              item.selectedBrailleTypes !== undefined
                ? item.selectedBrailleTypes[0]
                : "No Braille"
            )}
            onChange={this.handleChangedBrailleType}
          />
        </td>
        <td>
          <BrailleSelection selectedBrailleTypes={item.selectedBrailleTypes} />
        </td>
      </tr>
    ));
    return brailleMenu;
  };

  render() {
    return (
      <>
        <table className="braille-menu-table">
          <thead>
            <tr>
              <th>Item Id</th>
              <th>Braille Options</th>
            </tr>
          </thead>
          <tbody>{this.renderBrailleMenu()}</tbody>
        </table>
      </>
    );
  }
}

export function getBrailleMenuOptions(
  braileTypes: string[],
  selectedBraille: string
) {
  const brailleTypeOptions: SelectOptionProps[] = [];
  braileTypes.forEach(braileType => {
    brailleTypeOptions.push({
      label: braileType,
      value: braileType,
      disabled: false,
      selected: selectedBraille === braileType
    });
  });
  return brailleTypeOptions;
}
