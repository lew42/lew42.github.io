import Site from "./Site/Site.js";

const site = window.simple = new Site({ /* config */ });
export default site;
export const route = site.route.bind(site);
export * from "./Site/Site.js";