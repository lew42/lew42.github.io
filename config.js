// import store from "/simple/store/store.js";

const config = {
	env: "dev"
};

// Object.assign(config, store(""))

if (config.env === "dev"){
	const s = document.createElement("script");
	s.setAttribute("src", "/simple/dev/dev.js");
	s.setAttribute("type", "module");
	document.head.appendChild(s);
}


export default {
	env: "dev"
}