class Base {
	constructor(...args){
		this.instantiate(...args);
	}

	instantiate(...args){
		this.assign(...args);
		this.initialize();
	}

	initialize(){}

	assign(...args){
		return Object.assign(this, ...args);
	}
}


const is = {
	arr: function(value){
		return Array.isArray(value);
	},
	obj: function(value){
		return typeof value === "object" && !is.arr(value);
	},
	dom: function(value){
		return value && value.nodeType > 0;
	},
	el: function(value){
		return value && value.nodeType === 1;
	},
	str: function(value){
		return typeof value === "string";
	},
	num: function(value){
		return typeof value === "number";
	},
	bool: function(value){
		return typeof value === 'boolean';
	},
	fn: function(value){
		return typeof value === 'function';
	},
	def: function(value){
		return typeof value !== 'undefined';
	},
	undef: function(value){
		return typeof value === 'undefined';
	},
	pojo: function(value){
		return is.obj(value) && value.constructor === Object;
	},
	proto: function(value){
		return is.obj(value) && value.constructor && value.constructor.prototype === value;
	},
	class(value){
		return typeof variable === 'function' && typeof variable.prototype === 'object';
	}
};


class EventEmitter extends Base {
	instantiate(...args) {
		this.events = {};
		this.assign(...args);
		this.initialize();
	}

	on(event, listener) {
		if (!this.events[event]) {
			this.events[event] = [];
		}
		this.events[event].push(listener);
	}

	off(event, listener) {
		if (!this.events[event]) return;

		this.events[event] = this.events[event].filter(l => l !== listener);
	}

	once(event, listener) {
		const onceWrapper = (...args) => {
			listener.apply(this, args);
			this.off(event, onceWrapper);
		};
		this.on(event, onceWrapper);
	}

	emit(event, ...args) {
		if (!this.events[event]) return;

		this.events[event].forEach(listener => listener.apply(this, args));
	}

	removeAllListeners(event) {
		if (!this.events[event]) return;

		this.events[event] = [];
	}
}



class View extends Base {

	tag = "div";

	instantiate(...args){
		this.assign(...args);
		this.prerender();
		this.initialize();
	}

	prerender(){
		this.el = this.el || document.createElement(this.tag || "div");
		this.capture && View.captor && View.captor.append(this);
		this.classify && this.classify();
	}

	// add class
	ac(...args){
		for (const arg of args){
			arg && arg.split(" ").forEach(cls => this.el.classList.add(cls));
		}
		return this;
	}

	// remove class
	rc(...args){
		for (const arg of args){
			arg && arg.split(" ").forEach(cls => this.el.classList.remove(cls));
		}
		return this;
	}

	html(value){
		// set
		if (typeof value !== "undefined"){
			this.el.innerHTML = value;
			return this;

		// get
		} else {
			return this.el.innerHTML;
		}
	}

	attr(name, value){
		if (typeof value !== "undefined"){
			this.el.setAttribute(name, value);
			return this;
		} else {
			return this.el.getAttribute(name);
		}
	}

	classify(){
		this.ac(this.classes); // probably a bad idea, this won't stay sync'd...

		var cls = this.constructor;

		while (cls !== View){
			this.ac(cls.name.replace("View", "").toLowerCase());
			cls = Object.getPrototypeOf(cls);
		}

		if (this.name)
			this.ac(this.name);
	}

	append(...args){
		for (const arg of args){
			if (arg && arg.el){
				arg.parent = this;
				this.el.appendChild(arg.el);
			} else if (is.pojo(arg)){
				this.append_pojo(arg);
			} else if (is.obj(arg)){
				console.error("maybe not");
			} else if (is.arr(arg)){
				this.append.apply(this, arg);
			} else if (is.fn(arg)){
				this.append_fn(arg);
			} else {
				// DOM, str, undefined, null, etc
				this.el.append(arg);
			}
		}
		return this;
	}

	append_fn(fn){
		View.set_captor(this);
		const return_value = fn.call(this, this);
		View.restore_captor();

		if (is.def(return_value))
			this.append(return_value);

		return this;
	}

	append_pojo(pojo){
		for (const prop in pojo){
			this.append_prop(prop, pojo[prop]);
		}
		
		return this;
	}

	append_prop(prop, value){
		var view;
		if (value && value.el){
			view = value;
		} else {
			view = (new View({ tag: this.tag })).append(value);
		}

		view.ac(prop).append_to(this);

		if (!this[prop]){
			this[prop] = view;
		} else {
			console.warn(`.${prop} property is already taken`);
		}

		return this;
	}

	append_to(view){
		if (is.dom(view)){
			view.appendChild(this.el);
		} else {
			view.append(this);
		}
		return this;
	}

	has_class(cls){
		return this.el.classList.contains(cls);
	}

	toggle_class(cls){
		return this.has_class(cls) ? this.rc(cls) : this.ac(cls);
	}

	html(value){
		// set
		if (is.def(value)){
			this.el.innerHTML = value;
			return this;

		// get
		} else {
			return this.el.innerHTML
		}
	}

	text(value){
		// set
		if (is.def(value)){
			this.el.textContent = value;
			return this;

		// get
		} else {
			return this.el.textContent;
		}
	}

	attr(name, value){
		if (is.def(value)){
			this.el.setAttribute(name, value);
			return this;
		} else {
			return this.el.getAttribute(name);
		}
	}

	click(cb){
		if (!cb) console.error("must provide a callback");
		return this.on("click", cb);
	}

	on(event, cb){
		this.el.addEventListener(event, (...args) => {
			cb.call(this, this, ...args);
		});

		return this;
	}


	// this is more consistent with jQuery and this.el.style{}
	style(){
		return this.css(...arguments);
	}

	// inline styles
	css(prop, value){
		// set with object
		if (is.obj(prop)){
			for (var p in prop){
				this.css(p, prop[p]);
			}
			return this;

		// set with "prop", "value"
		} else if (prop && is.def(value)) {
			this.el.style[prop] = value;
			return this;

		// get with "prop"
		} else if (prop) {
			return this.el.style[prop];

		// get all
		} else if (!arguments.length){
			return this.el.style;
		} else {
			throw "whaaaat";
		}
	}

	static set_captor(view){
		View.previous_captors.push(View.captor);
		View.captor = view;
	}

	static restore_captor(){
		View.captor = View.previous_captors.pop();
	}

	static stylesheet(url){
		return new View({ tag: "link" }).attr("rel", "stylesheet").attr("href", url).append_to(document.head);
	}

	static elements(){
		const View = this;
		const fns = {
			el(tag, ...args){
				return new View({ tag }).append(...args);
			},
			div(){
				return new View().append(...arguments);
			}
		};

		fns.el.c = function(tag, classes, ...args){
			return new View({ tag }).ac(classes).append(...args);
		};

		fns.div.c = function(classes, ...args){
			return new View().ac(classes).append(...args);
		};

		["p", "h1", "h2", "h3"].forEach(tag => {
			fns[tag] = function(){
				return new View({ tag }).append(...arguments);
			};

			fns[tag].c = function(classes, ...args){
				return new View({ tag }).ac(classes).append(...args);
			};
		})

		return fns;
	}

	// setup body as captor
	static body(){
		if (View._body){
			return View._body;
		} else {
			View._body = new View({
				tag: "body",
				el: document.body,
				capture: false,
				init(){
					View.set_captor(this);
					return this;
				}
			});

			// View.set_captor(View._body); // this might backfire, if you're trying to get View.body() inside another view, for example..
			return View._body;
		}
	}
}

View.previous_captors = [];
View.prototype.capture = true;

export default View;
export const { el, div, p, h1, h2, h3 } = View.elements();
export { View, is, Base, EventEmitter };
