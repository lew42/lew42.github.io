import View, { el, div } from "/simple/View/View.js";

export default class RouteCtrl extends View {
	initialize(){
		this.views = []; // these could go on the route... route.views[] ?

		this.render();
	}
}