import simple, { el, div, p, route } from "/simple/simple.js";
import Router from "../Router.js";

simple.View.stylesheet("/simple/Router/Router.css");

simple.router.log = true;

route("one");