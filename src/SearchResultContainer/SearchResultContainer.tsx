import * as React from "react";
import {
  ItemCardModel,
  AboutItemModel,
  Resource,
  ItemTableContainer,
  ItemModel,
  ItemCard,
  IframeModal
} from "@src/index";
import { ErrorMessageModal } from "@src/ErrorBoundary/ErrorMessageModal";
import { PrintCartModal } from "@src/PrintCart/PrintCartModal";
import { PrintCartButton } from "@src/PrintCart/PrintCartButton";
import {
  getUpdatedSelectedItems,
  shouldUpdateSelectedItemsInState,
  moveArrayItemToNewIndex,
  areSelectedItemsHaveMath
} from "./SearchResultContainerHelper";

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
    itemsInPrintCart: ItemCardModel[],
    associateditemsInPrintCart: ItemCardModel[]
  ) => void;
  onResetItems: () => void;
  onSelectAll: () => void;
  itemCards?: ItemCardModel[];
  item?: Resource<AboutItemModel>;
  defaultRenderType?: SearchResultType;
  isLinkTable: boolean;
  showSelectAllButton: boolean;
  isPrintLimitEnabled: boolean;
  totalItemCards?: ItemCardModel[];
  performanceTaskAssociatedItems: any[];
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
  statusMessage: string;
  showErrorModal: boolean;
  selectedItems: ItemCardModel[];
  hasReceiveNewProps: number;
  itemsInPrintCart: ItemCardModel[];
  numberOfSelectedItems: number;
  associatedItemsInPrintCart: any;
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
  constructor(props: SearchResultContainerProps) {
    super(props);
    this.handleUpdateItemsInPrintcart = this.handleUpdateItemsInPrintcart.bind(
      this
    );
    // this.shouldAddToCartButtonBeDisabled = this.shouldAddToCartButtonBeDisabled.bind(this);
    this.state = {
      renderType: props.defaultRenderType || SearchResultType.Table,
      loading: true,
      showModal: false,
      showErrorModal: false,
      statusMessage: "",
      selectedItems: [],
      hasReceiveNewProps: 0,
      itemsInPrintCart: [],
      numberOfSelectedItems: 0,
      associatedItemsInPrintCart: {}
    };
  }

  componentWillReceiveProps(nextProps: SearchResultContainerProps) {
    let shouldUpdateSelectedItemsState = 0;
    let loading = true;
    if (nextProps.itemCards) {
      loading = false;
    }

    let selectedItems: ItemCardModel[] | undefined;
    ({
      selectedItems,
      shouldUpdateSelectedItemsState
    } = shouldUpdateSelectedItemsInState(
      nextProps,
      shouldUpdateSelectedItemsState
    ));
    if (shouldUpdateSelectedItemsState === 1)
      this.setState({ selectedItems: selectedItems, loading });
    else this.setState({ loading });
  }

  componentDidMount() {
    const itemsInPrintCart = this.state.itemsInPrintCart;
    itemsInPrintCart.forEach(item => {
      if (item.isPerformanceItem && item.selected === true) {
        const associatedItemsKey: any = this.props
          .performanceTaskAssociatedItems[item.itemKey];
        const itemCards =
          this.props.totalItemCards !== undefined
            ? this.props.totalItemCards.slice()
            : undefined;
        let associatedItems = this.state.associatedItemsInPrintCart;
        if (itemCards) {
          // associatedItems[item.itemKey] = itemCards.filter(item => associatedItems.includes(item.itemKey));
          let associatedItems_temp = [];
          for (let i = 0; i < associatedItemsKey.length; i++) {
            const x = itemCards.filter(
              item => item.itemKey === associatedItemsKey[i]
            );
            associatedItems_temp.push(x);
          }
          associatedItems[item.itemKey] = associatedItems_temp;
        }
        this.setState({ associatedItemsInPrintCart: associatedItems });
      }
    });
  }

  /**
   * Event handling method on selection and deselection of an item
   * If selected item is PT then update its associated items also in state, else remove corrosponding associated items
   */
  handleSelectItem = (item: ItemCardModel) => {
    if (item.isPerformanceItem && item.selected === true) {
      const associatedItemsKey: any = this.props.performanceTaskAssociatedItems[
        item.itemKey
      ];
      const itemCards =
        this.props.totalItemCards !== undefined
          ? this.props.totalItemCards.slice()
          : undefined;
      let associatedItems = this.state.associatedItemsInPrintCart;
      if (itemCards) {
        // associatedItems[item.itemKey] = itemCards.filter(item => associatedItems.includes(item.itemKey));
        let associatedItems_temp = [];
        for (let i = 0; i < associatedItemsKey.length; i++) {
          const x = itemCards.filter(
            item => item.itemKey === associatedItemsKey[i]
          );
          associatedItems_temp.push(x);
        }
        associatedItems[item.itemKey] = associatedItems_temp;
      }
      this.setState({ associatedItemsInPrintCart: associatedItems });
    }
    if (item.isPerformanceItem && item.selected === false) {
      let associatedItems = this.state.associatedItemsInPrintCart;
      delete associatedItems[item.itemKey];
      this.setState({ associatedItemsInPrintCart: associatedItems });
    }
    console.log(this.state.associatedItemsInPrintCart);
    this.props.onItemSelection(item);
    this.updateSelectedItemsInState(item);
  };

  // handleUpdateAssociatedItems = (item:ItemCardModel) {

  // }

  // handleSyncPrintcartItemsWithToSelectedItems = (
  //   itemsInPrintCart: ItemCardModel[],
  // ) => {
  //     this.setState({ itemsInPrintCart: selct });
  // };

  handleSyncSelectedItemsAndItemsinCart = (
    itemsInPrintCart: ItemCardModel[],
    isItemsInCartChanged: boolean
  ) => {
    if (isItemsInCartChanged === true)
      this.setState({ selectedItems: itemsInPrintCart });
  };

  updateSelectedItemsInState = (item: ItemCardModel) => {
    let updatedSelectedItems = getUpdatedSelectedItems(
      item,
      this.state.selectedItems.slice()
    );
    this.setState({
      selectedItems: updatedSelectedItems,
      itemsInPrintCart: updatedSelectedItems
    });
  };

  handleResetItems = (): void => {
    this.props.onResetItems();
    this.setState({
      itemsInPrintCart: [],
      selectedItems: [],
      associatedItemsInPrintCart: {}
    });
    this.handleCountNumberOfItemSelection();
  };

  handleSelectAllItems = (): void => {
    // this.props.onResetItems();
    if (
      this.props.itemCards !== undefined &&
      this.getSelectedItemCount() + this.props.itemCards.length > 50
    ) {
      this.showErrorModalOnPrintItemsCountExceeded();
      return;
    }

    this.props.onSelectAll();
    this.handleCountNumberOfItemSelection();
  };

  handleReorderItemsInPrintCart = (
    old_index: number,
    new_index: number
  ): void => {
    const itemsInPrintCart = this.state.itemsInPrintCart.slice();
    const reOrderedItems = moveArrayItemToNewIndex(
      itemsInPrintCart,
      old_index,
      new_index
    );
    this.setState({
      itemsInPrintCart: reOrderedItems,
      selectedItems: reOrderedItems
    });
  };

  handleCountNumberOfItemSelection = (): void => {
    this.setState({ numberOfSelectedItems: this.getSelectedItemCount() });
  };
  getSelectedItemCount = (): number => {
    let selectedItemCount = 0;
    if (this.props.totalItemCards !== undefined) {
      selectedItemCount = this.props.totalItemCards.filter(
        it => it.selected === true
      ).length;
    }
    selectedItemCount += this.getSelectedAssociatedItemsCount();
    return selectedItemCount;
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

  /**
   * Print items on print btn click
   */
  handlePrintItemsClick = (
    langCode: string,
    GlossaryRequired: string,
    IllustrationRequired: string
  ): void => {
    const { itemsInPrintCart, associatedItemsInPrintCart } = this.state;
    this.props.onPrintItems(
      langCode,
      GlossaryRequired,
      IllustrationRequired,
      itemsInPrintCart,
      associatedItemsInPrintCart
    );
    this.setState({ showModal: false, statusMessage: "" });
  };

  handleTypeChange = (renderType: SearchResultType): void => {
    this.setState({ renderType });
  };

  //Fire this event call on adding/removing item from print cart modal view
  handleUpdateItemsInPrintcart = (item: ItemCardModel) => {
    const UpdatedItemsInCart: ItemCardModel[] = getUpdatedSelectedItems(
      item,
      this.state.itemsInPrintCart
    );
    //this.setState({ItemsInPrintCart: UpdatedItemsInCart});
  };

  handleShowModal = (modelState: boolean): void => {
    //check item selected , if not show error msg popup
    const totalSelectedItemsCount = this.getSelectedItemCount();
    areSelectedItemsHaveMath(
      totalSelectedItemsCount,
      this.props.totalItemCards
    );
    const totalItemCards = this.props.totalItemCards;

    if (this.state.selectedItems && this.state.selectedItems.length > 0) {
      const seletedItems = this.state.selectedItems.slice();
      this.setState({
        showModal: modelState,
        itemsInPrintCart: this.state.selectedItems,
        statusMessage: totalSelectedItemsCount.toString()
      });
    } else {
      this.setState({
        showModal: modelState,
        itemsInPrintCart: this.state.selectedItems
      });
    }
    //this.componentDidMount();
  };

  isSelectedItemsHaveMathItem = (): boolean => {
    let isSelectedItemsHaveMath: boolean = false;
    if (
      this.state.selectedItems !== undefined &&
      this.state.numberOfSelectedItems > 0
    ) {
      let len = this.state.selectedItems.length;
      for (let i = 0; i < len; i++) {
        if (
          this.state.selectedItems[i].selected === true &&
          this.state.selectedItems[i].subjectCode === "MATH"
        ) {
          isSelectedItemsHaveMath = true;
          break;
        }
      }
    }
    return isSelectedItemsHaveMath;
  };

  handleHideErrorModal = () => {
    this.setState({ showErrorModal: false, statusMessage: "" });
  };

  /*********************All rendering method starts from here**********************************/
  showErrorModalOnPrintItemsCountExceeded = () => {
    this.setState({
      showErrorModal: true,
      statusMessage: " Printing is limited to 50 items."
    });
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
    const { selectedItems } = this.state;
    if (selectedItems.length <= 0) {
      return (
        <button
          onClick={this.handleResetItems}
          aria-label="Clear Selection"
          title="Clear Selection"
          className={
            "btn btn-default search-result-container-header-button disabled"
          }
        >
          <i aria-hidden="true" className="fa fa-eraser" /> Clear
        </button>
      );
    } else
      return (
        <button
          onClick={this.handleResetItems}
          aria-label="Clear Selection"
          title="Clear Selection"
          className={"btn btn-default search-result-container-header-button"}
        >
          <i aria-hidden="true" className="fa fa-eraser" /> Clear
        </button>
      );
  }

  renderPrintButton(viewType: SearchResultType): JSX.Element {
    return (
      <PrintCartButton
        label="Print Cart"
        itemsInCart={this.getSelectedItemCount()}
        onClick={() => this.handleShowModal(true)}
      />
    );
  }

  /*To select all visible items to print when testname dropdown is selected */
  renderSelectAllButton(visible: boolean): JSX.Element {
    if (visible) {
      return (
        <button
          onClick={this.handleSelectAllItems}
          aria-label="Clear Selection"
          title="Clear Selection"
          className={"btn btn-default search-result-container-header-button"}
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
          getSelectedItemCount={this.getSelectedItemCount}
          showErrorModalOnPrintItemsCountExceeded={
            this.showErrorModalOnPrintItemsCountExceeded
          }
          isPrintLimitEnabled={this.props.isPrintLimitEnabled}
          associatedItems={this.state.associatedItemsInPrintCart}
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
    return (
      <div className="row search-result-header-row">
        <div className="col-sm-4 header-grid-div header-print-button-groups">
          {this.renderSelectAllButton(this.props.showSelectAllButton)}
        </div>
        <div className="col-sm-3 header-grid-div  ">
          {this.renderToggle(SearchResultType.Table)}
          {this.renderToggle(SearchResultType.ItemCard)}
        </div>
        {/* <div className="col-sm-4 header-grid-div">
          <PrintCartButton
            // onClick={this.onSelectionAddItemToCart}
            label="Print Cart"
            itemsInCart={this.getSelectedItemsCount()}
            onClick={() => this.handleShowPrintCartModal(true)}
          /> */}

        <div className="col-sm-5 header-grid-div header-print-button-groups">
          {this.renderResetButton()}
          {this.renderPrintButton(SearchResultType.ItemCard)}
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
    const selectedItems = this.state.selectedItems.slice();
    const itemsInPrintCart = this.state.itemsInPrintCart.slice();
    return (
      <>
        <PrintCartModal
          showModal={showModal}
          onChangeModelState={this.handleShowModal}
          itemsInCart={itemsInPrintCart}
          associatedItemsInPrintCart={associatedItemsInPrintCart}
          onSubmitPrint={this.handlePrintItemsClick}
          isSelectedItemsHaveMathItem={this.isSelectedItemsHaveMathItem()}
          syncSelectedItemsAndItemsinCart={
            this.handleSyncSelectedItemsAndItemsinCart
          }
          onUpdateItemsInPrintCart={this.handleSelectItem}
          StatusMessage={statusMessage}
          totalSelectedItemsCount={this.getSelectedItemCount()}
          onItemsReorder={this.handleReorderItemsInPrintCart}
          //areSelectedItemsHaveMath={this.areSelectedItemsHaveMath()}
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
            numberOfSelectedItem={this.state.numberOfSelectedItems}
            showErrorModalOnPrintItemsCountExceeded={
              this.showErrorModalOnPrintItemsCountExceeded
            }
            getSelectedItemCount={this.getSelectedItemCount}
            associatedItems={this.state.associatedItemsInPrintCart}
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
        {this.renderHeader()}
        {this.renderBody()}
      </div>
    );
  }
}

/**
 * Depending on what renderType is selected, ItemCards or a table
 * will be rendered.
 */
// renderBody(): JSX.Element {
//   let tag: JSX.Element | JSX.Element[] | undefined;
//   if (this.props.itemCards && this.props.itemCards.length > 0) {
//     if (this.state.renderType === SearchResultType.Table) {
//       tag = (
//           <ItemTableContainer
//             onRowSelection={this.props.onRowSelection}
//             onItemSelection={this.handleSelectItem}
//             itemCards={this.props.itemCards}
//             item={this.props.item}
//             isLinkTable={this.props.isLinkTable}
//           />
//       );
//     } else {
//       tag = this.renderItemCards();
//     }
//   } else {
//     if (this.state.loading) {
//       tag = <div className="loader" />;
//     } else {
//       tag = <p>No items found.</p>;
//     }
//   }

//   return <div className="search-result-body">{tag}</div>;
// }

/**
 * Modal on click of print cart btn
 * set selectedItemsincart same as selectedItems
 */
// handleShowPrintCartModal = (modelState: boolean): void => {
//   if(modelState === false) {
//     this.setState({
//       showModal: modelState,
//       ItemsInPrintCart: this.state.selectedItems
//     })
//   }
//   if(this.state.selectedItems && this.state.selectedItems.length > 0 ) {
//     const seletedItems = this.state.selectedItems.slice();
//     this.setState({
//       showModal: modelState,
//       ItemsInPrintCart: this.state.selectedItems,
//       statusMessage: seletedItems.toString()
//     });
//   }
//   else {
//     this.setState({
//       showModal: modelState,
//       ItemsInPrintCart: this.state.selectedItems
//     });
//   }
//   //this.componentDidMount();
// };
