import * as React from "react";
import {
  ItemCardModel,
  AboutItemModel,
  Resource,
  ItemTableContainer,
  ItemModel,
  ItemCard
} from "@src/index";
import * as ReactModal from "react-modal";
import { PrintAccessibilityModal } from "@src/Accessibility/PrintAccessibilityModal";

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
      showModal: false
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
  };
  /**
   * Renders all results to ItemCard view.
   */
  // Changed by Sonu => passing additional 2 props or the whole props to get ItemcardModel
  renderItemCards(): JSX.Element[] | undefined {
    let tags: JSX.Element[] | undefined;

    if (this.props.itemCards) {
      tags = this.props.itemCards.map(digest => (
        // onItemSelection = {this.props.onItemSelection}
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
        tag = <ItemTableContainer {...this.props} />;
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

  handlePrintItemsClick = (
    langCode: string,
    GlossaryRequired: string,
    IllustrationRequired: string
  ): void => {
    this.props.onPrintItems(langCode, GlossaryRequired, IllustrationRequired);
  };

  handleShowModal = (modelState: boolean): void => {
    this.setState({ showModal: modelState });
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

  renderPrintButton(viewType: SearchResultType): JSX.Element {
    return (
      <button
        onClick={() => this.handleShowModal(true)}
        aria-label="Print Item"
        title="Print Items"
        className={"btn btn-default"}
      >
        <i
          aria-hidden="true"
          className="glyphicon glyphicon-th-large glyphicon-print"
        />{" "}
        Print
      </button>
    );
  }

  /**
   * Renders toggle buttons for changing the layout to table and item card
   */
  renderHeader(): JSX.Element {
    return (
      <div className="search-result-header">
        <div className="search-type">
          {this.renderToggle(SearchResultType.Table)}
          {this.renderToggle(SearchResultType.ItemCard)}
        </div>
        <div className="PrintItem">
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
    const { showModal } = this.state;
    return (
      <PrintAccessibilityModal
        onChangeModelState={this.handleShowModal}
        onSubmitPrint={this.handlePrintItemsClick}
        showModal={showModal}
      />
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
