import { registerApplication, start } from "single-spa";
import * as isActive from "./activity-function";

registerApplication({
  name: "@abhi/single-spa-angular-react",
  app: () => System.import("@abhi/single-spa-angular-react"),
  activeWhen: ["/react"]
});


// // react
// registerApplication(
//   "@abhi/single-spa-angular-react",
//   () => System.import("@abhi/single-spa-angular-react"),
//   isActive.nav
//   // { domElement: document.getElementById("nav-container") }
// );


// angular
// registerApplication(
//   "@abhi/my-app",
//   () => System.import("@abhi/my-app"),
//   isActive.page1
//   // { domElement: document.getElementById("page-1-container") }
// );


registerApplication({
  name: "@abhi/my-app",
  app: () => loadWithoutAmd("@abhi/my-app"),
  activeWhen: ["/angular"]
});

start({
  urlRerouteOnly: true,
});


function loadWithoutAmd(name) {
  return Promise.resolve().then(() => {
    let globalDefine = window.define;
    delete window.define;
    return System.import(name).then((module) => {
      window.define = globalDefine;
      return module;
    });
  });
}