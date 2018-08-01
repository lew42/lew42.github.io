import View, { el, div } from "/simple/View/View.js";

export default class Canvas {
	constructor(...args){
		Object.assign(this, ...args);
		this.instantiate();
	}

	instantiate(){

	}

	render(){
		this.view = el("canvas");
		this.canvas = this.view.el;
		return this.view;
	}
}