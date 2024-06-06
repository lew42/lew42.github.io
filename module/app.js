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

class Smart extends Base {
	instantiate(...args){
		this.assign(...args);
		// this.initialize(); // do this after?
	}

	toJSON(){
		return this.props;
	}


	get(name){
		return this.props[name];
	}

	/*
	This is quite confusing.
	1. A smart object needs to be set to a parent smart object.
	2. We assume the parent smart object is already initialized with data...?
	*/
	set(name, value){
		const data = this.props[name];
		if (value instanceof Smart){
			// do smart init?

			value.saver = this.saver; // set this before .initialize(), so initialize can .set subs

			if (!value.props){ // unset smart object
				if (!is.def(data)) // no data to load
					this.props[name] = value.props = {};  // init empty props
					// I'm not sure if this should be saved yet?
					// I guess the empty props would be saved, and would be reloaded...
					// could be useful for fleshing out some sort of empty structures...?
				else // assume the data are for real
					value.props = data;  // doesn't need to be saved...

				value.initialize();
			} else {
				console.warn("hmm, not sure here");
				// we're trying to re-set a smart object...
			}

		} else {
			// normal prop update...
			this.props[name] = value;
			this.save();
		}

		if (is.obj(value) || is.arr(value) || is.class(value)){
			if (!is.def(this[name]))
				this[name] = value;
			else
				console.warn("promote prop conflict");
		}

		return this; // ?
	}

	save(){
		if (this.saver) this.saver.save();
		else console.error("no .saver");
		// else this.constructor.save();
	}

	static save(){
		this.saver.save();
	}

	// get root_prop(){
	// 	return this.props._root_prop;
	// }

	// set root_prop(value){
	// 	this.props._root_prop = value;
	// 	this.save();
	// }  // no underscore needed, just map it?

	log(){
		console.log(this);
	}
}


class Socket extends EventEmitter {
	initialize(){
		this.ws = new WebSocket("ws://" + window.location.host);
		this.ws.addEventListener("open", () => this.open());
		this.ws.addEventListener("message", res => this.message(res));

		this.ready = new Promise((res, rej) => {
			this._ready = res;
		});
	}
	open(){
		console.log("%cSocket connected.", "color: green; font-weight: bold;");
		this.rpc("log", "connected!");
		this._ready();
	}
	// message recieved handler
	message(res){
		console.log(res);
		const data = JSON.parse(res.data);
		data.args = data.args || [];
		console.log(data.method + "(", ...data.args, ")");

		this[data.method](...data.args);
	}
	reload(){
		window.location.reload();
	}

	async send(obj){
		// console.log("sending", obj);
		return this.ready.then(() => {
			this.ws.send(JSON.stringify(obj));
		});
	}

	rpc(method, ...args){
		this.send({ method, args })
	}
	ls(data){
		console.log(data);
	}
}


class Saver extends EventEmitter {
	initialize(){
		this.filename = this.filename || "data.json";
		this.data = {};
		this.ready = new Promise((res, rej) => {
			this._ready = res;
		});
		this.fetch();
	}
	set(name, value){
		this.data[name] = value;
		this.save();
	}
	get(name){
		return this.data[name];
	}
	fetch(){
		// fetch is relative to the html file.  if we add /, we can use this code in /sub/paths/
		fetch("/" + this.filename)
			.then(response => {
				if (!response.ok) {
					throw new Error('Network response was not ok ' + response.statusText);
				}
				return response.json();
			}).then(data => {
				this.load(data);
			}).catch(error => {
				console.error('There was a problem with the fetch operation:', error);
			});
	}

	load(data){
		this.app.props = data;
		this._ready();
		this.emit("loaded"); // events{prop: [fn]}
	}

	save(){
		if (!this.saving)
			this.saving = setTimeout(this.send.bind(this), 0);
	}

	send(){
		this.app.socket.rpc("write", this.filename, JSON.stringify(this.app.props, null, 4));
		this.saving = false;
	}
}

class App extends Smart {

	// Smart objects normally don't need to auto init, but this does
	instantiate(...args){
		this.Smart = Smart;
		this.props = {};
		this.assign(...args);
		this.initialize();
	}

	initialize(){
		if (this.is_dev()){
			this.initialize_socket();
			this.initialize_saver();
			this.initialize_dev_ready();
		} else {
			this.initialize_ready();
		}
		this.initialize_google_icon_font();
		this.initialize_body();
	}

	is_dev(){
		return window.location.hostname == "localhost";
	}

	initialize_dev_ready(){
		this.ready = Promise.all([this.socket.ready, this.saver.ready, this.DOMready()]).then(() => this);
	}

	DOMready(){
		return new Promise((res, rej) => {
			document.addEventListener('DOMContentLoaded', () => res(this));
		});
	}

	initialize_ready(){
		this.ready = this.DOMready();
	}

	initialize_body(){
		this.body = View.body().init();
	}

	initialize_saver(){
		this.saver = new Saver({ app: this }, this.saver);
	}

	initialize_google_icon_font(){
		View.stylesheet("https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,1,0");
	}

	initialize_socket(){
		this.socket = new Socket(this.socket); // you could pass socket: {config} to App this way...
	}
}

export const { el, div, p, h1, h2, h3 } = View.elements();
export { View, is, Base, EventEmitter, Smart, App };

export const app = new App();