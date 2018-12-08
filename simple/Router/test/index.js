import simple, { el, div, p, route } from "/simple/simple.js";
import Router from "../Router.js";

class Test extends Router {
	
}
// const router = new Router();

route("one").route("oneA");
route("two")//.activate();

/*

route("yo").render(); // ?
// manually render vs auto render?
// would this render a button AND the content?

*/