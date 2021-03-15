import * as React from "react";
import * as TestUtils from "react-dom/test-utils";
import { shallow, mount, render } from "enzyme";
import {
  headerColumns,
  HeaderSortModel,
  SortColumnModel,
  SortDirection,
  HeaderTable,
  HeaderTableProps
} from "@src/index";
import {
  getColumnsHeaderConfig_mock,
  tabClassNames
} from "@mocks/ItemTable/mocks";
import { itemHandler } from "./mocks";
import { PrintcartHeaderTable } from "../PrintcartHeaderTable";

describe("ItemTableHeader", () => {
  const sorts: HeaderSortModel[] = [
    {
      col: headerColumns[0],
      direction: SortDirection.Ascending,
      resetSortCount: 1
    }
  ];

  const props: HeaderTableProps = {
    sorts,
    columns: headerColumns,
    onHeaderClick: itemHandler,
    isLinkTable: false,
    itemTableConfig: getColumnsHeaderConfig_mock()
  };

  const wrapper = shallow(<PrintcartHeaderTable {...props} />);
  const wrapperLinkTable = shallow(
    <PrintcartHeaderTable {...props} isLinkTable={false} />
  );

  it("matches snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("matches link table snapshot", () => {
    expect(wrapperLinkTable).toMatchSnapshot();
  });
});
