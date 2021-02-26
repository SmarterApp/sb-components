import * as enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import * as moment from "moment";

//import Jquery and add reqired global keyword used in jquery plugins
import * as $ from "jquery";
Object.defineProperty(window, "$", { value: $ });
Object.defineProperty(global, "$", { value: $ });
Object.defineProperty(global, "jQuery", { value: $ });

// tslint:disable-next-line:no-any
(enzyme as any).configure({ adapter: new Adapter() });

jest.mock("moment", () => () => ({
  format: () => "2018–01–30T12:34:56+00:00"
}));
