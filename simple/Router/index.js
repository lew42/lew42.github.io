import simple, { el, div, p } from "/simple/simple.js";
import Router from "./Router.js";
import view_notes from "./view.notes.js";
import markdown from "/simple/markdown.js";
// import readme from "./readme.md";



simple.body.addClass("body-1");
simple.View.set_captor(div.c("paper bg-white"))

el("h1", "Router");



el("pre", "route('yo')");

el("pre", 
`route("yo");
route("two", () => {})`).attr("contenteditable", true);

el("code", `
test

test
`);

view_notes();