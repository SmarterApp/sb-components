import * as React from "react";
import {
  ItemCardModel,
  AboutItemModel,
  Resource,
  ItemTableContainer,
  ItemModel,
  ItemCard,
} from "@src/index";
import { ErrorMessageModal } from "@src/ErrorBoundary/ErrorMessageModal";
import { PrintCartModal } from "@src/PrintCart/PrintCartModal";
import { PrintCartButton } from "@src/PrintCart/PrintCartButton";
import { getUpdatedSelectedItems, shouldUpdateSelectedItemsInState } from "./SearchResultContainerHelper";

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
  totalItemCards?:ItemCardModel[];
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
  ItemsInPrintCart: ItemCardModel[];
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
    this.handleUpdateItemsInPrintcart = this.handleUpdateItemsInPrintcart.bind(this);
    this.state = {
      renderType: props.defaultRenderType || SearchResultType.Table,
      loading: true,
      showModal: false,
      showErrorModal: false,
      statusMessage: "",
      selectedItems: [],
      hasReceiveNewProps: 0,
      ItemsInPrintCart: []
    };
  }

  componentWillReceiveProps(nextProps: SearchResultContainerProps) {
    let shouldUpdateSelectedItemsState = 0;
    let loading = true;
    if (nextProps.itemCards) {
      loading = false;
    }
    
    let selectedItems: ItemCardModel[] | undefined;
    ({ selectedItems, shouldUpdateSelectedItemsState } = shouldUpdateSelectedItemsInState(nextProps, shouldUpdateSelectedItemsState));
    if(shouldUpdateSelectedItemsState === 1) 
      this.setState({selectedItems: selectedItems, loading});
    else
      this.setState({ loading });
  }

  handleSelectItem = (item: ItemCardModel) => {
    this.props.onItemSelection(item);
    this.updateSelectedItemsInState(item);
  };

  handleSyncSelectedItemsAndItemsinCart = (itemsInPrintCart: ItemCardModel[], isItemsInCartChanged: boolean) => {
    if(isItemsInCartChanged === true) 
      this.setState({selectedItems: itemsInPrintCart});
  }

  updateSelectedItemsInState = (item: ItemCardModel) => {
    let updatedSelectedItems = getUpdatedSelectedItems(item, this.state.selectedItems.slice());
    this.setState({ selectedItems: updatedSelectedItems });
  };

  /**
   * Get number of selectedItems
   */ 
  getSelectedItemsCount = (): number => {
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

  //Fire this event call on adding/removing item from print cart modal view
  handleUpdateItemsInPrintcart = (item: ItemCardModel) => {
    const UpdatedItemsInCart:ItemCardModel[] = getUpdatedSelectedItems(item, this.state.ItemsInPrintCart);
    //this.setState({ItemsInPrintCart: UpdatedItemsInCart});
  }

  /**
   * Modal on click of print cart btn  
   * set selectedItemsincart same as selectedItems
   */
  handleShowPrintCartModal = (modelState: boolean): void => {
    if(modelState === false) {
      this.setState({
        showModal: modelState,
        ItemsInPrintCart: this.state.selectedItems
      })
    }
    if(this.state.selectedItems && this.state.selectedItems.length > 0 ) {
      const seletedItems = this.state.selectedItems.slice();
      this.setState({
        showModal: modelState,
        ItemsInPrintCart: this.state.selectedItems,
        statusMessage: seletedItems.toString()
      });
    }
    else {
      this.setState({
        showModal: modelState,
        ItemsInPrintCart: this.state.selectedItems
      });
    }
    //this.componentDidMount();
  };

  getSelectedItemCount = ():number => {
    let selectedItemCount = 0
    if(this.state.selectedItems !== undefined) {
      selectedItemCount = this.state.selectedItems.filter(it => it.selected === true).length;
    }
    return selectedItemCount;
  }
  isSelectedItemsHaveMathItem = ():boolean => {
    let areSelectedItemsHaveMath: boolean = false;
    if(this.state.selectedItems !== undefined && this.getSelectedItemCount() > 0) {
      let len = this.state.selectedItems.length;
      for(let i = 0; i < len; i++) {
        if(this.state.selectedItems[i].selected === true && this.state.selectedItems[i].subjectCode === "MATH") {
          areSelectedItemsHaveMath = true;
          break;
        }
      }
    }
    return areSelectedItemsHaveMath;
  }



  handleHideErrorModal = () => {
    this.setState({ showErrorModal: false, statusMessage: "" });
  };

  onSelectionAddItemToCart = () => {
    return;
  };

  /*********************All rendering method starts from here**********************************/
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

  /**
   * Renders toggle buttons for changing the layout to table and item card
   */
  renderHeader(): JSX.Element {
    const toShowModal = true;
    return (
      <div className="row">
        <div className="col-sm-4 header-grid-div">
        </div>
        <div className="col-sm-4 header-grid-div">
          {this.renderToggle(SearchResultType.Table)}
          {this.renderToggle(SearchResultType.ItemCard)}
        </div>
        <div className="col-sm-4 header-grid-div">
          <PrintCartButton
            // onClick={this.onSelectionAddItemToCart}
            label="Print Cart"
            itemsInCart={this.getSelectedItemsCount()}
            onClick={() => this.handleShowPrintCartModal(true)}
          />
        </div>
      </div>
    );
  }

  /**
   * Renders Print Accessibility model
   */
  renderPrintAccessibility(): JSX.Element {
    const { showModal, statusMessage, showErrorModal } = this.state;
    const selectedItems  = this.state.selectedItems.slice();
    return (
      <>
        <PrintCartModal
          showModal= {showModal}
          onChangeModelState={this.handleShowPrintCartModal}
          itemsInCart={selectedItems}
          onSubmitPrint={this.handlePrintItemsClick}
          isSelectedItemsHaveMathItem = {this.isSelectedItemsHaveMathItem()}
          syncSelectedItemsAndItemsinCart = {this.handleSyncSelectedItemsAndItemsinCart}
          onUpdateItemsInPrintCart = {this.handleSelectItem}

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
            <ItemTableContainer
              onRowSelection={this.props.onRowSelection}
              onItemSelection={this.handleSelectItem}
              itemCards={this.props.itemCards}
              item={this.props.item}
              isLinkTable={this.props.isLinkTable}
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


