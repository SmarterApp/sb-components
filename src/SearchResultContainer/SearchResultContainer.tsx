import * as React from "react";
import {
  ItemCardModel,
  AboutItemModel,
  Resource,
  ItemTableContainer,
  ItemModel,
  ItemCard,
  BtnPrintCart
} from "@src/index";
import * as ReactModal from "react-modal";
import { PrintAccessibilityModal } from "@src/Accessibility/PrintAccessibilityModal";
import { ErrorMessageModal } from "@src/ErrorBoundary/ErrorMessageModal";
import { PrintCartModal } from "@src/PrintCart/PrintCartModal";
import Loader from 'react-loader-advanced';
import { PrintCartButton } from "@src/PrintCart/PrintCartButton";

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
  onPrintItems: (langCode: string, GlossaryRequired: string, IllustrationRequired: string) => void;
  onResetItems: () => void;
  itemCards?: ItemCardModel[];
  item?: Resource<AboutItemModel>;
  defaultRenderType?: SearchResultType;
  isLinkTable: boolean;
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
  //selectedItemsInCart: ItemCardModel[];
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
    this.state = {
      renderType: props.defaultRenderType || SearchResultType.Table,
      loading: true,
      showModal: false,
      showErrorModal: false,
      statusMessage: "",
      selectedItems: [],
      hasReceiveNewProps: 0,
      //selectedItemsInCart: []
    };
  }

  componentWillReceiveProps(nextProps: SearchResultContainerProps) {
    let shouldUpdateSelectedItemsState = 0;
    let loading = true;
    if (nextProps.itemCards) {
      loading = false;
    }
    
    let selectedItems:ItemCardModel[] = [];
    if(nextProps.itemCards) {
      nextProps.itemCards.forEach( (item) => {
        if(item.selected === true) {
          selectedItems.push(item);
          shouldUpdateSelectedItemsState = 1;
        }
      })     
    }
    if(shouldUpdateSelectedItemsState === 1) 
      this.setState({selectedItems: selectedItems, loading});
    else
      this.setState({ loading });

    //this.setState({ loading });
  }


  componentDidMount() {
  }

  handleSelectItem = (item: ItemCardModel) => {
    this.props.onItemSelection(item);
    this.handleStoreSelectedItems(item);
  };

  //store seleted items in state.selectedItems
  handleStoreSelectedItems = (item: ItemCardModel) => {
    let selectedItemsCopy = this.state.selectedItems.slice();
    if (item.selected === true) {
      selectedItemsCopy.push(item);
    } else {
      selectedItemsCopy = selectedItemsCopy.filter(
        data =>
          !(data.bankKey === item.bankKey &&
            data.itemKey === item.itemKey)
      );
    }
    this.setState({ selectedItems: selectedItemsCopy });
  };

  /**
   * Get # of selectedItems
   */ 
  getSelectedItemCount = (): number => {
    return this.state.selectedItems.length;
  };

  /**
   * Print items on print btn click
   */
  handlePrintItemsClick = (
    langCode: string,
    GlossaryRequired: string,
    IllustrationRequired: string
  ): void => {
    this.props.onPrintItems(langCode, GlossaryRequired, IllustrationRequired);
    this.setState({ showModal: false, statusMessage: "" });
  };

  //update state on view toggle
  handleTypeChange = (renderType: SearchResultType): void => {
    this.setState({ renderType });
  };

  /**
   * Clear all selected item => needs to change 
   */
  handleResetItems = (): void => {
    this.props.onResetItems();
  };



  /**
   * Modal on click of print cart btn
   * show selected items 
   * users can remove items from seleted items
   */
  handleShowPrintCartModal = (modelState: boolean): void => {
    if(modelState === false) {
      this.setState({
        showModal: modelState
      })
    }
    if(this.state.selectedItems && this.state.selectedItems.length > 0 ) {
      const seletedItems = this.state.selectedItems.slice();
      this.setState({
        showModal: modelState,
        statusMessage: seletedItems.toString()
      });
    }
    else {
      this.setState({
        showModal: modelState,
        //statusMessage: "There is no item in cart. Please select any item to print"
      });
    }
    this.componentDidMount();
  };

  //Modal for print - old**
  handleShowModal = (modelState: boolean): void => {
    let visibleItems = this.props.itemCards;
    let selectedItemCount = 0;
    if (visibleItems !== undefined) {
      for (let i = 0; i < visibleItems.length; i++) {
        if (visibleItems[i].selected === true) {
          selectedItemCount = selectedItemCount + 1;
        }
      }
    }
    if (selectedItemCount == 0 || selectedItemCount < 0) {
      this.setState({
        showErrorModal: modelState,
        statusMessage: "Please select at least one item to print"
      });
    } else {
      this.setState({
        showModal: modelState,
        statusMessage: selectedItemCount.toString()
      });
    }
  };

  handleHideErrorModal = () => {
    this.setState({ showErrorModal: false, statusMessage: "" });
  };

  onSelectionAddItemToCart = () => {
    return;
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
    return (
      <button
        onClick={this.handleResetItems}
        aria-label="Clear Selection"
        title="Clear Selection"
        className={"btn btn-default"}
      >
        <i aria-hidden="true" className="glyphicon glyphicon-th-large glyphicon-refresh" /> Clear
        Selection
      </button>
    );
  }

  renderPrintButton(viewType: SearchResultType): JSX.Element {
    return (
      <button
        onClick={() => this.handleShowModal(true)}
        aria-label="Print Item"
        title="Print Items"
        className={"btn btn-default"}
      >
        <i aria-hidden="true" className="glyphicon glyphicon-th-large glyphicon-print" /> Print
      </button>
    );
  }

  /**
   * Renders toggle buttons for changing the layout to table and item card
   */
  renderHeader(): JSX.Element {
    const toShowModal = true;
    return (
      <div className="row">
        <div className="col-sm-4 header-grid-div">
          {/* <strong>
          Total item(s) selected: {this.state.countSelectedItems}
          </strong> */}
        </div>
        <div className="col-sm-4 header-grid-div">
          {this.renderToggle(SearchResultType.Table)}
          {this.renderToggle(SearchResultType.ItemCard)}
        </div>
        <div className="col-sm-4 header-grid-div">
          <PrintCartButton
            // onClick={this.onSelectionAddItemToCart}
            label="Print Cart"
            itemsInCart={this.getSelectedItemCount()}
            onClick={() => this.handleShowPrintCartModal(true)}
          />
          {/* {this.renderResetButton()} */}
          {/* {this.renderPrintButton(SearchResultType.ItemCard)} */}
        </div>
      </div>
    );
  }

  /**
   * Returns a wrapper of items displayed as a table or card view
   * @returns default render method
   */

  /**
   * Renders Print Accessibility model
   *
   */
  renderPrintAccessibility(): JSX.Element {
    const { showModal, statusMessage, showErrorModal } = this.state;
    const selectedItems  = this.state.selectedItems.slice();
    return (
      <>
        {/* <PrintAccessibilityModal
          onChangeModelState={this.handleShowModal}
          onSubmitPrint={this.handlePrintItemsClick}
          showModal={showModal}
          StatusMessage={statusMessage}
        /> */}
        {/* <ErrorMessageModal
          StatusMessage={statusMessage}
          showModal={showErrorModal}
          onChangeErrorModelState={this.handleHideErrorModal}
        /> */}
        <PrintCartModal
          showModal= {showModal}
          onChangeModelState={this.handleShowPrintCartModal}
          itemsInCart={selectedItems}
          onRowSelection={this.props.onRowSelection}
          onItemSelection={this.handleSelectItem}
          isLinkTable={false}
          onSubmitPrint={this.handlePrintItemsClick}
          //statusMessage= {statusMessage}

        />
      </>
    );
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
        />
      ));
    }

    return tags;
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
          // <Loader show={true} message={'loading'}>
            <ItemTableContainer
              onRowSelection={this.props.onRowSelection}
              onItemSelection={this.handleSelectItem}
              itemCards={this.props.itemCards}
              item={this.props.item}
              isLinkTable={this.props.isLinkTable}
            />
          // </Loader>
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

  /**
   * Returns a wrapper of Accessability model View
   */

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
