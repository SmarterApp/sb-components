import * as React from "react";
import {
  ItemCardModel,
  AboutItemModel,
  Resource,
  ItemTableContainer,
  ItemModel,
  ItemCard,
  IframeModal,
  SearchAPIParamsModel,
  AccResourceGroupModel,
  DropDownSelectionModel,
  MultiSelectValue
} from "@src/index";
import { ErrorMessageModal } from "@src/ErrorBoundary/ErrorMessageModal";
import { PrintCartModal } from "@src/PrintCart/PrintCartModal";
import { PrintCartButton } from "@src/PrintCart/PrintCartButton";
import {
  getUpdatedSelectedItems,
  shouldUpdateSelectedItemsInState,
  moveArrayItemToNewIndex,
  areSelectedItemsHaveMath,
  getAssociatedItemCards,
  isPTAssociatedItemsInCart,
  deleteTestNameDetails,
  addTestNameDetails,
  addTestName_associatedItems,
  getItemPositionInTest,
  getcolumnsHeaderMultiSelectOptions,
  getUpdatedItemColumnsHeaderConfig
} from "./SearchResultContainerHelper";
import { countNumberOfItemsAfterSelection } from "@src/ItemCard/ItemCardHelperFunction";
import {
  TestNameItemsPoolModel,
  itemKeys,
  TestCodeToLabel,
  ItemIdToTestNameMap
} from "@src/ItemSearch/ItemSearchModels";
import { BrailleCartModal } from "@src/BrailleCart/BrailleCartModal";
import { DataFieldMultiSelect } from "@src/DataFields/DataFieldMultiSelect";
import {
  ItemColumnHeadersConfig,
  itemColumnsName_Interim,
  itemColumnsName_NonInterim
} from "./SearchResultModels";

/**
 * SearchResultType enum
 * @enum {number}
 */
export enum SearchResultType {
  Table,
  ItemCard
}

/**
 * SearchResultContainerProps props
 * @interface SearchResultContainerProps
 * @method {(item: { itemKey: number; bankKey: number },reset: boolean) => void} onRowSelection
 * @member {ItemCardModel[]?} itemCards
 * @member {Resource<AboutItemModel>} item
 * @member {SearchResultType} defaultRenderType
 */
export interface SearchResultContainerProps {
  onRowSelection: (item: ItemModel, reset: boolean) => void;
  onItemSelection: (item: ItemCardModel) => void;
  onPrintItems: (
    langCode: string,
    GlossaryRequired: string,
    IllustrationRequired: string,
    pdfContentType: string,
    TranslationGlossary: string,
    itemsInPrintCart: ItemCardModel[]
  ) => void;
  onDownloadBraille: (selectedBrailleType: { [key: number]: string[] }) => void;
  searchAPI: SearchAPIParamsModel;
  translationAccessibility?: DropDownSelectionModel[];
  isInterimSite: boolean;
  onResetItems: () => void;
  onSelectAll: (itemCards?: ItemCardModel[]) => void;
  itemCards?: ItemCardModel[];
  item?: Resource<AboutItemModel>;
  defaultRenderType?: SearchResultType;
  isLinkTable: boolean;
  showSelectAllButton: boolean;
  isPrintLimitEnabled: boolean;
  totalItemCards?: ItemCardModel[];
  performanceTaskAssociatedItems: any[];
  testItemsPool: TestNameItemsPoolModel[];
  testCodeToLabelMap: TestCodeToLabel;
  itemIdToTestNameMap: ItemIdToTestNameMap;
}

/**
 * SearchResultContainerState state
 * @interface SearchResultContainerState
 * @member {SearchResultType} renderType
 */
export interface SearchResultContainerState {
  renderType: SearchResultType;
  loading: boolean;
  showModal: boolean;
  showBrailleModal: boolean;
  showFieldFilterModal: boolean;
  statusMessage: string;
  showErrorModal: boolean;
  // selectedItems: ItemCardModel[];
  hasReceiveNewProps: number;
  itemsInPrintCart: ItemCardModel[];
  ItemsCountInPrintCart: number;
  currentSelectedItemIndex: number;
  associatedItemsInPrintCart: any;
  itemColumnHeaderConfig: ItemColumnHeadersConfig[];
  stateChangeToReRender: number;
}

/**
 * The SearchResultContainer is a toggleable display/menu that changes search
 * results from a table layout to ItemCard and vice versa.
 * @class SearchResultContainer
 * @extends {React.Component<SearchResultContainerProps, SearchResultContainerState>}
 */
export class SearchResultContainer extends React.Component<
  SearchResultContainerProps,
  SearchResultContainerState
> {
  // private fieldCustomizeBtnReference = React.createRef<HTMLButtonElement>();
  private fieldCustomizeBtnReference: HTMLButtonElement | null;
  constructor(props: SearchResultContainerProps) {
    super(props);
    // this.fieldCustomizeBtnReference = React.createRef();
    this.state = {
      renderType: props.defaultRenderType || SearchResultType.Table,
      loading: true,
      showModal: false,
      showBrailleModal: false,
      showFieldFilterModal: false,
      showErrorModal: false,
      statusMessage: "",
      // selectedItems: [],
      hasReceiveNewProps: 0,
      itemsInPrintCart: [],
      ItemsCountInPrintCart: 0,
      currentSelectedItemIndex: -1,
      associatedItemsInPrintCart: {},
      itemColumnHeaderConfig: [],
      stateChangeToReRender: 0
    };
  }

  componentWillReceiveProps(nextProps: SearchResultContainerProps) {
    let shouldUpdateSelectedItemsState = false;
    let loading = true;
    if (nextProps.itemCards) {
      loading = false;
    }

    let selectedItems: ItemCardModel[] | undefined;
    let associatedItems: any;
    ({
      selectedItems,
      associatedItems,
      shouldUpdateSelectedItemsState
    } = shouldUpdateSelectedItemsInState(
      nextProps,
      shouldUpdateSelectedItemsState
    ));
    if (shouldUpdateSelectedItemsState === true) {
      //update items in pint cart in same order it has been selected
      this.setState({
        itemsInPrintCart: selectedItems,
        associatedItemsInPrintCart: associatedItems,
        ItemsCountInPrintCart: this.getTotalSelectedItemCount(),
        loading
      });
    } else this.setState({ loading });
  }

  componentWillUnmount() {
    const itemsInPrintCart = this.state.itemsInPrintCart.slice();
    if (itemsInPrintCart !== undefined)
      this.handleUpdateSelectionIndex(itemsInPrintCart);
  }

  // Function to return defualt table header fields config model
  getColumnsHeaderConfig = () => {
    const itemColumnHeaderConfig: ItemColumnHeadersConfig[] = this.state
      .itemColumnHeaderConfig;
    if (
      itemColumnHeaderConfig !== undefined &&
      itemColumnHeaderConfig.length > 0
    ) {
      return itemColumnHeaderConfig;
    }
    const headerModel: ItemColumnHeadersConfig[] = [];
    let i = 0;
    const itemsHeaderName = this.props.isInterimSite
      ? itemColumnsName_Interim
      : itemColumnsName_NonInterim;
    itemsHeaderName.forEach(element => {
      let column: ItemColumnHeadersConfig = {
        headerName: element,
        columnIndex: ++i,
        isHidden: false,
        isSortable: true
      };
      headerModel.push(column);
    });
    return headerModel;
  };

  handleUpdateItemsinPrintCart = (itemsInPrintCart: ItemCardModel[]) => {
    this.handleUpdateSelectionIndex(itemsInPrintCart);
    // const updatedAssociatedItems = this.getUpdatedAssociatedItems(itemsInPrintCart);
    this.setState({ itemsInPrintCart: itemsInPrintCart });
    this.handleCountNumberOfItemSelection();
  };

  /**
   * Reset selectionIndex in all items
   * And update selectionIndex according to index of items in print cart
   */
  handleUpdateSelectionIndex = (updatedItemsInPrintcart: ItemCardModel[]) => {
    if (this.props.totalItemCards) {
      this.props.totalItemCards.forEach(item => {
        if (item.selectionIndex) {
          delete item.selectionIndex;
        }
        updatedItemsInPrintcart.forEach((itemFromPrintCart, index) => {
          if (item.itemKey === itemFromPrintCart.itemKey)
            item.selectionIndex = index;
        });
      });
    }
  };

  /**
   * Event handling method on selection and deselection of an item
   * If selected item is PT then update its associated items also in state, else remove corrosponding associated items
   */
  handleSelectItem = (item: ItemCardModel) => {
    /**
     * If item is selected and is a performance item
     * add its associated items and get updated associatedItemsInPrintCart and update the state
     */
    if (item.isPerformanceItem && item.selected === true) {
      let associatedItems = this.getUpdatedAssociatedItemsOnSingleItemSelection(
        item
      );
      this.setState({ associatedItemsInPrintCart: associatedItems });
    }

    /**
     * If item is un-selected and is a performance item,
     * remove its associated items from associatedItemsInPrintCart and update the state
     */
    if (item.isPerformanceItem && item.selected === false) {
      let associatedItems = this.state.associatedItemsInPrintCart;
      deleteTestNameDetails(
        associatedItems[item.itemKey],
        this.props.totalItemCards
      );
      delete associatedItems[item.itemKey];
      this.setState({ associatedItemsInPrintCart: associatedItems });
    }

    /**
     * If item is selected, increase current index from state and assign to selectionIndex to item
     * If item is un-selected, decrease current index from state and remove selectionIndex attribute from item,
     * to indicate it is no more in print cart
     */
    let currentSelectedItemIndex = this.state.currentSelectedItemIndex;
    if (item.selected === true) {
      currentSelectedItemIndex = currentSelectedItemIndex + 1;
      item.selectionIndex = currentSelectedItemIndex;
    } else if (item.selected === false) {
      currentSelectedItemIndex = currentSelectedItemIndex - 1;
      delete item.selectionIndex;
    }

    //Also reset the selected braille types of item, if item is unselected
    if (item.selected === undefined || item.selected === false) {
      if (item.selectedBrailleTypes !== undefined) {
        item.selectedBrailleTypes = undefined;
      }
    }

    //Update test name in item if test name is selected by user
    if (
      this.props.searchAPI.testNames &&
      this.props.searchAPI.testNames.length > 0 &&
      this.props.searchAPI.testNames[0] !== "0"
    ) {
      if (item.selected === undefined || item.selected === false) {
        delete item.testNameInPrintCart;
        delete item.testOrderInPrintCart;
      } else if (item.selected === true) {
        item.testNameInPrintCart = this.props.searchAPI.testNames[0];
        item.testOrderInPrintCart =
          item.testOrder === undefined ? undefined : item.testOrder;
      }
    }

    // Update selected item in print cart
    let updatedSelectedItems = getUpdatedSelectedItems(
      item,
      this.state.itemsInPrintCart.slice()
    );
    this.setState({
      itemsInPrintCart: updatedSelectedItems,
      currentSelectedItemIndex: currentSelectedItemIndex
    });
    this.handleCountNumberOfItemSelection();
    //this.props.onItemSelection(item);
  };

  handleResetItems = (): void => {
    this.props.onResetItems();
    const itemsInPrintCart = this.state.itemsInPrintCart;
    itemsInPrintCart.forEach(item => {
      if (item.selectedBrailleTypes) {
        delete item.selectedBrailleTypes;
      }
    });
    this.setState({
      itemsInPrintCart: [],
      associatedItemsInPrintCart: {}
    });
    this.handleCountNumberOfItemSelection();
  };

  handleSelectAllItems = (): void => {
    let itemsInPrintcart = this.state.itemsInPrintCart.slice();
    let associatedItemsInPrintcart = this.state.associatedItemsInPrintCart;
    let itemSelectionIndex = this.state.ItemsCountInPrintCart - 1;
    let itemsToExclude: number[] = [];
    const PTassociatedItems = this.props.performanceTaskAssociatedItems;
    // this.props.onResetItems();

    if (
      this.props.itemCards !== undefined &&
      countNumberOfItemsAfterSelection(
        this.props.itemCards,
        this.getTotalSelectedItemCount(),
        this.props.performanceTaskAssociatedItems
      ) > 50
    ) {
      this.showErrorModalOnPrintItemsCountExceeded();
      return;
    } else {
      let shouldUpdateItemsInPrintCart = false;
      let shouldUpdateAssociatedItemsInCart = false;
      if (this.props.itemCards) {
        let visibleItemCards = this.props.itemCards.slice();

        visibleItemCards.forEach(element => {
          //If item is already selected and item is PT items then add associated items in exclude list
          if (element.selected && element.isPerformanceItem) {
            if (PTassociatedItems && element.itemKey in PTassociatedItems)
              itemsToExclude.push(...PTassociatedItems[element.itemKey]);
          } else if (!element.selected && element.isPerformanceItem) {
            //if item is not selected and is PT items, then
            if (itemsToExclude.indexOf(element.itemKey) !== -1) {
            } else {
              if (element.itemKey in PTassociatedItems)
                itemsToExclude.push(...PTassociatedItems[element.itemKey]);
              element.selected = true;

              itemSelectionIndex = itemSelectionIndex + 1;
              element.selectionIndex = itemSelectionIndex;
              itemsInPrintcart.push(element);
              const associatedItemCard = getAssociatedItemCards(
                element,
                PTassociatedItems,
                this.props.totalItemCards
              );
              //add test name details also if test name is selected
              if (
                this.props.searchAPI.testNames &&
                this.props.searchAPI.testNames.length > 0 &&
                this.props.searchAPI.testNames[0] !== "0"
              ) {
                addTestNameDetails(element, this.props.searchAPI.testNames[0]);
                addTestName_associatedItems(
                  associatedItemCard,
                  this.props.searchAPI.testNames[0],
                  this.props.testItemsPool,
                  this.props.totalItemCards
                );
              }

              if (associatedItemCard.length > 0) {
                associatedItemsInPrintcart[
                  element.itemKey
                ] = associatedItemCard;
                shouldUpdateAssociatedItemsInCart = true;
              }
              shouldUpdateItemsInPrintCart = true;
            }
          } else if (!element.selected && !element.isPerformanceItem) {
            element.selected = true;
            if (
              this.props.searchAPI.testNames &&
              this.props.searchAPI.testNames.length > 0 &&
              this.props.searchAPI.testNames[0] !== "0"
            ) {
              addTestNameDetails(element, this.props.searchAPI.testNames[0]);
            }
            itemSelectionIndex = itemSelectionIndex + 1;
            element.selectionIndex = itemSelectionIndex;
            itemsInPrintcart.push(element);
            const associatedItemCard = getAssociatedItemCards(
              element,
              PTassociatedItems,
              this.props.totalItemCards
            );
            if (associatedItemCard.length > 0) {
              associatedItemsInPrintcart[element.itemKey] = associatedItemCard;
              shouldUpdateAssociatedItemsInCart = true;
            }
            shouldUpdateItemsInPrintCart = true;
          }
        });
      }
      if (shouldUpdateAssociatedItemsInCart) {
        this.setState({
          associatedItemsInPrintCart: associatedItemsInPrintcart
        });
      }
      if (shouldUpdateItemsInPrintCart) {
        this.handleUpdateItemsinPrintCart(itemsInPrintcart);
      }
    }
  };

  handleReorderItemsInPrintCart = (
    old_index: number,
    new_index: number
  ): void => {
    const itemsInPrintCart = this.state.itemsInPrintCart.slice();
    const totalItemsCard = this.props.totalItemCards;
    const reOrderedItems = moveArrayItemToNewIndex(
      itemsInPrintCart,
      old_index,
      new_index,
      totalItemsCard
    );
    this.handleUpdateItemsinPrintCart(reOrderedItems);
  };

  handleCountNumberOfItemSelection = (): void => {
    this.setState({ ItemsCountInPrintCart: this.getTotalSelectedItemCount() });
  };

  //Get total number selected items along with associated items
  getTotalSelectedItemCount = (): number => {
    let selectedItemsCount = 0;
    let selectedAssociatedItemsCount = 0;
    if (this.state.itemsInPrintCart && this.state.itemsInPrintCart.length > 0)
      selectedItemsCount = this.state.itemsInPrintCart.length;
    selectedAssociatedItemsCount = this.getSelectedAssociatedItemsCount();
    return selectedItemsCount + selectedAssociatedItemsCount;
  };

  getSelectedAssociatedItemsCount() {
    let count = 0;
    if (this.state.associatedItemsInPrintCart !== undefined) {
      const associatedItems = this.state.associatedItemsInPrintCart;
      for (const itemKeyInAssociatedItems in associatedItems) {
        const associatedItemsArray = associatedItems[itemKeyInAssociatedItems];
        count += associatedItemsArray.length - 1;
      }
    }
    return count;
  }

  countNumberOfItemsAfterSelection = (
    currentItems: ItemCardModel[],
    selectedItemsCount: number
  ) => {
    const result = countNumberOfItemsAfterSelection(
      currentItems,
      selectedItemsCount,
      this.props.performanceTaskAssociatedItems
    );
    return result;
  };

  private getUpdatedAssociatedItemsOnSingleItemSelection(item: ItemCardModel) {
    const associatedItemsKey: any = this.props.performanceTaskAssociatedItems[
      item.itemKey
    ];
    const itemCards =
      this.props.totalItemCards !== undefined
        ? this.props.totalItemCards.slice()
        : undefined;
    let associatedItems = this.state.associatedItemsInPrintCart;
    if (itemCards) {
      let associatedItems_temp = [];
      for (let i = 0; i < associatedItemsKey.length; i++) {
        let associatedItems = itemCards.filter(
          item => item.itemKey === associatedItemsKey[i]
        );

        //also update test name and order if test name is selected by user
        if (
          this.props.searchAPI.testNames &&
          this.props.searchAPI.testNames.length > 0 &&
          this.props.searchAPI.testNames[0] !== "0"
        ) {
          const testName = this.props.searchAPI.testNames[0];
          const itemDetailsInTest = this.props.testItemsPool.filter(
            x => x.code === testName
          );
          const itemListInTest: itemKeys[] = itemDetailsInTest[0].itemKeys;
          associatedItems.forEach(item => {
            const itemKeyAndPosition = getItemPositionInTest(
              item,
              itemListInTest
            );
            if (itemKeyAndPosition !== null) {
              item.testNameInPrintCart = testName;
              item.testOrderInPrintCart = itemKeyAndPosition.itemPosition;
            } else {
              item.testNameInPrintCart =
                item.testName === undefined ? undefined : item.testName;
              item.testOrderInPrintCart =
                item.testOrder === undefined ? undefined : item.testOrder;
            }
          });
        }
        associatedItems_temp.push(associatedItems);
      }
      associatedItems[item.itemKey] = associatedItems_temp;
    }
    return associatedItems;
  }

  /**
   * Print items on print btn click
   */
  handlePrintItemsClick = (
    langCode: string,
    GlossaryRequired: string,
    IllustrationRequired: string,
    pdfContentType: string,
    TranslationGlossary: string
  ): void => {
    const { itemsInPrintCart, associatedItemsInPrintCart } = this.state;
    this.props.onPrintItems(
      langCode,
      GlossaryRequired,
      IllustrationRequired,
      pdfContentType,
      TranslationGlossary,
      itemsInPrintCart
    );
    this.setState({ showModal: false, statusMessage: "" });
  };

  /**
   *
   * @param itemsBrailleToDownload
   * call downloadbraille method from props
   */
  onDownloadBraille = (itemsBrailleToDownload: {
    [key: number]: string[];
  }): void => {
    this.props.onDownloadBraille(itemsBrailleToDownload);
    this.setState({ showBrailleModal: false, statusMessage: "" });
  };

  handleTypeChange = (renderType: SearchResultType): void => {
    this.setState({ renderType });
  };

  handleShowModal = (modelState: boolean): void => {
    const { ItemsCountInPrintCart, itemsInPrintCart } = this.state;
    const totalSelectedItemsCount = ItemsCountInPrintCart;
    areSelectedItemsHaveMath(
      totalSelectedItemsCount,
      this.props.totalItemCards
    );

    if (this.state.itemsInPrintCart && this.state.itemsInPrintCart.length > 0) {
      const itemsInPrintCart = this.state.itemsInPrintCart.slice();
      this.setState({
        showModal: modelState,
        itemsInPrintCart: this.state.itemsInPrintCart,
        statusMessage: totalSelectedItemsCount.toString()
      });
    } else {
      this.setState({
        showModal: modelState,
        itemsInPrintCart: this.state.itemsInPrintCart
      });
    }
  };

  //Toggle Braille cart modal
  handleShowBrailleCartModal = (brailleCartModalState: boolean): void => {
    const { ItemsCountInPrintCart, itemsInPrintCart } = this.state;
    const totalSelectedItemsCount = ItemsCountInPrintCart;
    if (this.state.itemsInPrintCart && this.state.itemsInPrintCart.length > 0) {
      const itemsInPrintCart = this.state.itemsInPrintCart.slice();
      this.setState({
        showBrailleModal: brailleCartModalState,
        itemsInPrintCart: this.state.itemsInPrintCart,
        statusMessage: totalSelectedItemsCount.toString()
      });
    } else {
      this.setState({
        showBrailleModal: brailleCartModalState,
        itemsInPrintCart: this.state.itemsInPrintCart
      });
    }
  };

  areSelectedItemsHaveMath = (): boolean => {
    let areSelectedItemsHaveMath: boolean = false;
    if (
      this.props.totalItemCards !== undefined &&
      this.getTotalSelectedItemCount() > 0
    ) {
      let len = this.props.totalItemCards.length;
      for (let i = 0; i < len; i++) {
        if (
          this.props.totalItemCards[i].selected === true &&
          this.props.totalItemCards[i].subjectCode === "MATH"
        ) {
          areSelectedItemsHaveMath = true;
          break;
        }
      }
    }
    return areSelectedItemsHaveMath;
  };

  handleHideErrorModal = () => {
    this.setState({ showErrorModal: false, statusMessage: "" });
  };

  /*********************All rendering methods starts from here**********************************/
  showErrorModalOnPrintItemsCountExceeded = () => {
    this.setState({
      showErrorModal: true,
      statusMessage: " Printing is limited to 50 items."
    });
  };

  openFieldFilterModal = () => {
    this.setState({ showFieldFilterModal: true });
  };

  onHideFieldFilterModal = () => {
    this.setState({ showFieldFilterModal: false });
  };

  handleApplyTableFieldFilters = (v: MultiSelectValue[]) => {
    console.log(v);
    const newItemColumnHeaderConfig = getUpdatedItemColumnsHeaderConfig(
      v,
      this.getColumnsHeaderConfig()
    );
    this.setState({ itemColumnHeaderConfig: newItemColumnHeaderConfig });
    console.log(newItemColumnHeaderConfig);
  };

  /**
   * Renders button toggle for changing the layout to cards or table
   * @param {SearchResultType} viewType
   * @returns {JSX.Element} button toggle
   */
  renderToggle(viewType: SearchResultType): JSX.Element {
    const { renderType } = this.state;
    const className = renderType === viewType ? "btn-gray" : "btn-white";
    let label = "";
    let iconClass = "";

    if (viewType === SearchResultType.Table) {
      label = "table view toggle";
      iconClass = "fa fa-table";
    } else if (viewType === SearchResultType.ItemCard) {
      label = "item card view toggle";
      iconClass = "glyphicon glyphicon-th-large glyphicon-pad";
    }

    return (
      <button
        aria-label={label}
        className={`btn ${className}`}
        value={viewType}
        onClick={() => this.handleTypeChange(viewType)}
      >
        <i aria-hidden="true" className={iconClass} />
      </button>
    );
  }

  renderResetButton(): JSX.Element {
    const { itemsInPrintCart } = this.state;
    if (itemsInPrintCart.length <= 0) {
      return (
        <button
          onClick={this.handleResetItems}
          aria-label="Clear items from print cart"
          title="Clear items from print cart"
          className={
            "btn btn-default search-result-container-header-button disabled btn-sm"
          }
        >
          <i aria-hidden="true" className="fa fa-eraser" /> Clear
        </button>
      );
    } else
      return (
        <button
          onClick={this.handleResetItems}
          aria-label="Clear items from print cart"
          title="Clear items from print cart"
          className={
            "btn btn-default search-result-container-header-button btn-sm"
          }
        >
          <i aria-hidden="true" className="fa fa-eraser" /> Clear
        </button>
      );
  }

  renderPrintButton(viewType: SearchResultType): JSX.Element {
    return (
      <PrintCartButton
        label="Print Cart"
        itemsInCart={this.getTotalSelectedItemCount()}
        onClick={() => this.handleShowModal(true)}
      />
    );
  }

  renderBrailleCartButton(): JSX.Element {
    return (
      <button
        onClick={() => this.handleShowBrailleCartModal(true)}
        aria-label="Open barille cart modal"
        title="Open barille cart modal"
        className={
          "btn btn-default btn-sm search-result-container-header-button"
        }
      >
        <i aria-hidden="true" className="fa fa-braille" /> Braille Cart
      </button>
    );
  }

  // Render button for table customizable
  renderFieldCustomizeButton(): JSX.Element {
    return (
      <DataFieldMultiSelect
        options={getcolumnsHeaderMultiSelectOptions(
          this.getColumnsHeaderConfig()
        )}
        onChange={this.handleApplyTableFieldFilters}
        uniqueId={9502}
      />
    );
  }

  /*To select all visible items to print when testname dropdown is selected */
  renderSelectAllButton(visible: boolean): JSX.Element {
    let disableCssClass = "disabled";
    if (this.props.itemCards) {
      const itemCards = this.props.itemCards;
      const itemcardsLength = this.props.itemCards.length;
      for (let i = 0; i < itemcardsLength; i++) {
        if (itemCards[i].selected === true) {
          continue;
        } else if (itemCards[i].isPerformanceItem) {
          const isPTAssociatedItemIncart: boolean = isPTAssociatedItemsInCart(
            itemCards[0],
            this.state.associatedItemsInPrintCart
          );
          if (!isPTAssociatedItemIncart) {
            disableCssClass = "";
            break;
          }
        } else {
          disableCssClass = "";
          break;
        }
      }
    }

    if (visible) {
      return (
        <button
          onClick={this.handleSelectAllItems}
          aria-label="Select all to print"
          title="Select all to print"
          className={`btn btn-default btn-sm search-result-container-header-button ${disableCssClass} `}
        >
          <i className="fa fa-check" aria-hidden="true" /> Select All
        </button>
      );
    } else {
      return <></>;
    }
  }

  /**
   * Renders all results to ItemCard view.
   */
  renderItemCards(): JSX.Element[] | undefined {
    let tags: JSX.Element[] | undefined;

    if (this.props.itemCards) {
      tags = this.props.itemCards.map(digest => (
        <ItemCard
          rowData={digest}
          onRowSelect={this.handleSelectItem}
          key={`${digest.bankKey} - ${digest.itemKey}`}
          getSelectedItemCount={this.getTotalSelectedItemCount}
          showErrorModalOnPrintItemsCountExceeded={
            this.showErrorModalOnPrintItemsCountExceeded
          }
          isPrintLimitEnabled={this.props.isPrintLimitEnabled}
          associatedItems={this.state.associatedItemsInPrintCart}
          countNumberOfItemsAfterSelection={
            this.countNumberOfItemsAfterSelection
          }
          isInterimSite={this.props.isInterimSite}
          testCodeToLabelMap={this.props.testCodeToLabelMap}
          itemHeaderConfig={this.getColumnsHeaderConfig()}
        />
      ));
    }

    return tags;
  }

  /**
   * Renders toggle buttons for changing the layout to table and item card
   */
  renderHeader(): JSX.Element {
    const toShowModal = true;
    const helptest = <span>this is helper text</span>;
    return (
      <div className="row search-result-header-row">
        <div className="col-sm-4 header-grid-div header-print-button-groups">
          {this.renderSelectAllButton(this.props.showSelectAllButton)}
          {this.renderFieldCustomizeButton()}
        </div>

        <div className="col-sm-3 header-grid-div  ">
          {this.renderToggle(SearchResultType.Table)}
          {this.renderToggle(SearchResultType.ItemCard)}
        </div>

        <div className="col-sm-5 header-grid-div header-print-button-groups">
          {this.renderResetButton()}
          {this.renderPrintButton(SearchResultType.ItemCard)}
          {this.props.isInterimSite ? this.renderBrailleCartButton() : null}
        </div>
      </div>
    );
  }

  /**
   * Renders Print Accessibility model
   */
  renderPrintAccessibility(): JSX.Element {
    const {
      showModal,
      statusMessage,
      showErrorModal,
      associatedItemsInPrintCart
    } = this.state;
    const itemsInPrintCart = this.state.itemsInPrintCart.slice();
    return (
      <>
        <PrintCartModal
          showModal={showModal}
          onChangeModelState={this.handleShowModal}
          itemsInCart={itemsInPrintCart}
          associatedItemsInPrintCart={associatedItemsInPrintCart}
          onSubmitPrint={this.handlePrintItemsClick}
          // isSelectedItemsHaveMathItem={this.isSelectedItemsHaveMathItem()}
          handleUpdateItemsinPrintCart={this.handleUpdateItemsinPrintCart}
          onAddOrRemoveSelectedItems={this.handleSelectItem}
          StatusMessage={statusMessage}
          totalSelectedItemsCount={this.getTotalSelectedItemCount()}
          onItemsReorder={this.handleReorderItemsInPrintCart}
          isSelectedItemsHaveMathItem={this.areSelectedItemsHaveMath()}
          isInterimSite={this.props.isInterimSite}
          testCodeToLabelMap={this.props.testCodeToLabelMap}
          itemIdToTestNameMap={this.props.itemIdToTestNameMap}
          translationAccessibility={this.props.translationAccessibility}
          itemTableConfig={this.getColumnsHeaderConfig()}
        />
        <ErrorMessageModal
          StatusMessage={statusMessage}
          showModal={showErrorModal}
          onChangeErrorModelState={this.handleHideErrorModal}
        />
      </>
    );
  }

  //Render Braille Cart Modal
  renderBrailleCartModal(): JSX.Element {
    const {
      showBrailleModal,
      statusMessage,
      showErrorModal,
      associatedItemsInPrintCart
    } = this.state;
    const itemsInPrintCart = this.state.itemsInPrintCart.slice();
    return (
      <>
        <BrailleCartModal
          showModal={showBrailleModal}
          onChangeModelState={this.handleShowBrailleCartModal}
          itemsInCart={itemsInPrintCart}
          associatedItemsInPrintCart={associatedItemsInPrintCart}
          onDownloadBraille={this.onDownloadBraille}
          // isSelectedItemsHaveMathItem={this.isSelectedItemsHaveMathItem()}
          handleUpdateItemsinPrintCart={this.handleUpdateItemsinPrintCart}
          onAddOrRemoveSelectedItems={this.handleSelectItem}
          StatusMessage={statusMessage}
          totalSelectedItemsCount={this.getTotalSelectedItemCount()}
          onItemsReorder={this.handleReorderItemsInPrintCart}
          isInterimSite={this.props.isInterimSite}
          testCodeToLabelMap={this.props.testCodeToLabelMap}
          itemIdToTestNameMap={this.props.itemIdToTestNameMap}
          itemTableConfig={this.getColumnsHeaderConfig()}
        />
        <ErrorMessageModal
          StatusMessage={statusMessage}
          showModal={showErrorModal}
          onChangeErrorModelState={this.handleHideErrorModal}
        />
      </>
    );
  }

  /**
   * Depending on what renderType is selected, ItemCards or a table
   * will be rendered.
   */
  renderBody(): JSX.Element {
    let tag: JSX.Element | JSX.Element[] | undefined;
    if (this.props.itemCards && this.props.itemCards.length > 0) {
      if (this.state.renderType === SearchResultType.Table) {
        tag = (
          <ItemTableContainer
            onRowSelection={this.props.onRowSelection}
            onItemSelection={this.handleSelectItem}
            itemCards={this.props.itemCards}
            item={this.props.item}
            isLinkTable={this.props.isLinkTable}
            onCountNumberOfItemSelection={this.handleCountNumberOfItemSelection}
            numberOfSelectedItem={this.state.ItemsCountInPrintCart}
            showErrorModalOnPrintItemsCountExceeded={
              this.showErrorModalOnPrintItemsCountExceeded
            }
            getSelectedItemCount={this.getTotalSelectedItemCount}
            associatedItems={this.state.associatedItemsInPrintCart}
            countNumberOfItemsAfterSelection={
              this.countNumberOfItemsAfterSelection
            }
            isInterimSite={this.props.isInterimSite}
            testCodeToLabelMap={this.props.testCodeToLabelMap}
            itemColumnHeaderConfig={this.getColumnsHeaderConfig()}
          />
        );
      } else {
        tag = this.renderItemCards();
      }
    } else {
      if (this.state.loading) {
        tag = <div className="loader" />;
      } else {
        tag = <p>No items found.</p>;
      }
    }
    return <div className="search-result-body">{tag}</div>;
  }

  render() {
    return (
      <div className="search-result-container">
        {this.renderPrintAccessibility()}
        {this.renderBrailleCartModal()}
        {this.renderHeader()}
        {this.renderBody()}
      </div>
    );
  }
}
