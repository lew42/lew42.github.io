import config from "/config.js";
import "/simple/css/css.js";
import View, { el, div, p } from "/simple/View/View.js";
import { test, assert } from "/simple/Test/Test.js";
import { icon } from "/simple/View/Icon/Icon.js";
import Page from "/simple/Page/Page.js";
import Base from "/simple/Base/Base.js";
import Pager from "/simple/View/Pager/Pager.js";

const stylesheet = View.stylesheet;
const write = View.write;

export default {
	el, div, p, test, assert, icon, stylesheet, write, Page, View, Base, Pager
};
export { el, div, p, test, assert, icon, stylesheet, write, Page, View, Base, Pager };