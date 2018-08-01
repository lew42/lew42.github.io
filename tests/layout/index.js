import simple, { el, div, p, h1, h2, h3, icon, test, assert, write } from "/simple.js";
// simple.stylesheet("/tests/layout/styles.css");

import Router from "/simple/Router/Router.js";

import old from "./old.js";

const router = new Router();

router.add({old});
console.log(router);
el("button", "old").click(() => router.old.activate());