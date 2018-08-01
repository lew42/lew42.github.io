import "/simple/Test/Test.js";
import Canvas from "./Canvas/Canvas.js";
import View, { el, div } from "/simple/View/View.js";

const SVG_NS = "http://www.w3.org/2000/svg";
class SVG {
	constructor(...args){
		Object.assign(this, ...args);
		this.render();
		document.body.appendChild(this.el);
	}

	render(){
		return this.el = document.createElementNS(SVG_NS, "svg");
	}

	rect(){}
}

new SVG();

class Point {
	constructor(...args){
		this.x = 0;
		this.y = 0;

		Object.assign(this, ...args);

		this.canvas = this.scene.canvas;
		this.ctx = this.scene.ctx;
		this.render();
	}

	render(){
		this.ctx.fillRect(this.x, this.y, 1, 1);
		this.scene.view.on("mouseover", () => {
			console.log("hover");
		});
		this.scene.view.on("mouseout", () => console.log("out"));
	}
}

class Scene {
	constructor(...args){
		this.items = [];
		Object.assign(this, ...args);
		this.render().appendTo(document.body);
	}

	render(){
		this.view = el("canvas");
		this.canvas = this.view.el;
		this.ctx = this.canvas.getContext("2d");
		return this.view;
	}

	point(x = 50, y = 50){
		const point = new Point({ x, y, scene: this });
		this.items.push(point);
		return point;
	}
}


const scene = new Scene();
window.ctx = scene.ctx;
window.canvas = scene.view.el;

setTimeout(() => {

console.log(canvas.getBoundingClientRect());
canvas.width = canvas.getBoundingClientRect().width;
canvas.height = canvas.getBoundingClientRect().height;

scene.point(50, 100);
}, 1000);