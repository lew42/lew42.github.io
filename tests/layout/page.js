import simple, { el, div, icon, test, assert, write, Page } from "/simple.js";
import content from "./content.js";
// simple.stylesheet("/tests/layout/styles.css");

const page = new Page({
	title: "Layouts",
	route: "layoyut",
	// content
	// content: v => "yo!@#"
	content
});

export default page;