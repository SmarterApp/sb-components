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
import * as ReactModal from "react-modal";
import { PrintAccessibilityModal } from "@src/Accessibility/PrintAccessibilityModal";
import { ErrorMessageModal } from "@src/ErrorBoundary/ErrorMessageModal";

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
    IllustrationRequired: string
  ) => void;
  onResetItems: () => void;
  onSelectAll: () => void;
  itemCards?: ItemCardModel[];
  item?: Resource<AboutItemModel>;
  defaultRenderType?: SearchResultType;
  isLinkTable: boolean;
  showSelectAllButton: boolean;
  totalItemCards?: ItemCardModel[];
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
  countSelectedItems: number;
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
      countSelectedItems: this.getSelectedItemCount()
    };
  }

  componentWillReceiveProps(nextProps: SearchResultContainerProps) {
    let loading = true;
    if (nextProps.itemCards) {
      loading = false;
    }
    this.setState({ loading });
  }

  handleSelectItem = (item: ItemCardModel) => {
    this.props.onItemSelection(item);
    this.handleCountNumberOfItemSelection();
  };
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
            onItemSelection={this.props.onItemSelection}
            itemCards={this.props.itemCards}
            item={this.props.item}
            isLinkTable={this.props.isLinkTable}
            onCountNumberOfItemSelection={this.handleCountNumberOfItemSelection}
            numberOfSelectedItem={this.state.countSelectedItems}
            showErrorModalOnPrintItemsCountExceeded={
              this.showErrorModalOnPrintItemsCountExceeded
            }
            getSelectedItemCount={this.getSelectedItemCount}
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

  handleTypeChange = (renderType: SearchResultType): void => {
    this.setState({ renderType });
  };

  handleResetItems = (): void => {
    this.props.onResetItems();
    this.handleCountNumberOfItemSelection();
  };
  handleSelectAllItems = (): void => {
    this.props.onResetItems();
    this.props.onSelectAll();
    this.handleCountNumberOfItemSelection();
  };

  handleCountNumberOfItemSelection = (): void => {
    this.setState({ countSelectedItems: this.getSelectedItemCount() });
  };

  getSelectedItemCount = (): number => {
    let selectedItemCount = 0;
    if (this.props.totalItemCards !== undefined) {
      selectedItemCount = this.props.totalItemCards.filter(
        it => it.selected === true
      ).length;
    }
    return selectedItemCount;
  };

  areSelectedItemsHaveMath = (): boolean => {
    let areSelectedItemsHaveMath: boolean = false;
    if (
      this.props.totalItemCards !== undefined &&
      this.getSelectedItemCount() > 0
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

  handlePrintItemsClick = (
    langCode: string,
    GlossaryRequired: string,
    IllustrationRequired: string
  ): void => {
    this.props.onPrintItems(langCode, GlossaryRequired, IllustrationRequired);
    this.setState({ showModal: false, statusMessage: "" });
  };

  handleShowModal = (modelState: boolean): void => {
    //check item selected , if not show error msg popup
    this.areSelectedItemsHaveMath();
    const totalItemCards = this.props.totalItemCards;
    let visibleItems = this.props.itemCards;
    let selectedItemCount = 0;
    if (totalItemCards !== undefined) {
      for (let i = 0; i < totalItemCards.length; i++) {
        if (totalItemCards[i].selected === true) {
          selectedItemCount = selectedItemCount + 1;
        }
      }
    }
    //console.log(selectedItemCount);
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

  showErrorModalOnPrintItemsCountExceeded = () => {
    this.setState({
      showErrorModal: true,
      statusMessage: " Printing is limited to 20 items."
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
    if (this.getSelectedItemCount() <= 0) {
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
      <button
        onClick={() => this.handleShowModal(true)}
        aria-label="Print Item"
        title="Print Items"
        className={"btn btn-default search-result-container-header-button"}
      >
        <i
          aria-hidden="true"
          className="glyphicon glyphicon-th-large glyphicon-print"
        />{" "}
        Print
      </button>
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
   * Renders toggle buttons for changing the layout to table and item card
   */
  renderHeader(): JSX.Element {
    return (
      <div className="row search-result-header-row">
        <div className="col-sm-4 header-grid-div header-print-button-groups">
          {this.renderSelectAllButton(this.props.showSelectAllButton)}
        </div>
        <div className="col-sm-3 header-grid-div  ">
          {this.renderToggle(SearchResultType.Table)}
          {this.renderToggle(SearchResultType.ItemCard)}
        </div>
        <div className="col-sm-5 header-grid-div header-print-button-groups">
          {this.renderResetButton()}
          {this.renderPrintButton(SearchResultType.ItemCard)}
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
    return (
      <>
        <PrintAccessibilityModal
          onChangeModelState={this.handleShowModal}
          onSubmitPrint={this.handlePrintItemsClick}
          showModal={showModal}
          StatusMessage={statusMessage}
          areSelectedItemsHaveMath={this.areSelectedItemsHaveMath()}
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
