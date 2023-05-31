/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/preload.js":
/*!************************!*\
  !*** ./src/preload.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _shared_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shared/constants */ \"./src/shared/constants.js\");\n/* harmony import */ var _shared_constants__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_shared_constants__WEBPACK_IMPORTED_MODULE_0__);\n// See the Electron documentation for details on how to use preload scripts:\n// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts\n\nconst {\n  contextBridge,\n  ipcRenderer\n} = __webpack_require__(/*! electron */ \"electron\");\n\ncontextBridge.exposeInMainWorld('api', {\n  testApi: args => {\n    console.log(\" test api \");\n    console.log(ipcRenderer);\n    return ipcRenderer.invoke('channel:test', args);\n  },\n  stepApi: args => {\n    return ipcRenderer.invoke('channel:step', args);\n  },\n  stepApi: args => {\n    return ipcRenderer.invoke('channel:step', args);\n  }\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcHJlbG9hZC5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7QUFBQTtBQUNBOztBQUVBLE1BQU07RUFBRUEsYUFBYTtFQUFFQztBQUFZLENBQUMsR0FBR0MsbUJBQU8sQ0FBQywwQkFBVSxDQUFDO0FBQ1o7QUFFOUNGLGFBQWEsQ0FBQ0ksaUJBQWlCLENBQUMsS0FBSyxFQUFFO0VBQ25DQyxPQUFPLEVBQUdDLElBQUksSUFBSztJQUNmQyxPQUFPLENBQUNDLEdBQUcsQ0FBQyxZQUFZLENBQUM7SUFDekJELE9BQU8sQ0FBQ0MsR0FBRyxDQUFDUCxXQUFXLENBQUM7SUFDeEIsT0FBT0EsV0FBVyxDQUFDUSxNQUFNLENBQUMsY0FBYyxFQUFFSCxJQUFJLENBQUM7RUFDbkQsQ0FBQztFQUNESSxPQUFPLEVBQUdKLElBQUksSUFBSztJQUNmLE9BQU9MLFdBQVcsQ0FBQ1EsTUFBTSxDQUFDLGNBQWMsRUFBRUgsSUFBSSxDQUFDO0VBQ25ELENBQUM7RUFDREksT0FBTyxFQUFHSixJQUFJLElBQUs7SUFDZixPQUFPTCxXQUFXLENBQUNRLE1BQU0sQ0FBQyxjQUFjLEVBQUVILElBQUksQ0FBQztFQUNuRDtBQUNKLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL21vdG9yLWNvbnNvbGUvLi9zcmMvcHJlbG9hZC5qcz82ZTQwIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFNlZSB0aGUgRWxlY3Ryb24gZG9jdW1lbnRhdGlvbiBmb3IgZGV0YWlscyBvbiBob3cgdG8gdXNlIHByZWxvYWQgc2NyaXB0czpcbi8vIGh0dHBzOi8vd3d3LmVsZWN0cm9uanMub3JnL2RvY3MvbGF0ZXN0L3R1dG9yaWFsL3Byb2Nlc3MtbW9kZWwjcHJlbG9hZC1zY3JpcHRzXG5cbmNvbnN0IHsgY29udGV4dEJyaWRnZSwgaXBjUmVuZGVyZXIgfSA9IHJlcXVpcmUoJ2VsZWN0cm9uJyk7XG5pbXBvcnQgeyBjaGFubmVscyB9IGZyb20gJy4vc2hhcmVkL2NvbnN0YW50cyc7XG5cbmNvbnRleHRCcmlkZ2UuZXhwb3NlSW5NYWluV29ybGQoJ2FwaScsIHtcbiAgICB0ZXN0QXBpOiAoYXJncykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIiB0ZXN0IGFwaSBcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKGlwY1JlbmRlcmVyKTtcbiAgICAgICAgcmV0dXJuIGlwY1JlbmRlcmVyLmludm9rZSgnY2hhbm5lbDp0ZXN0JywgYXJncylcbiAgICB9LFxuICAgIHN0ZXBBcGk6IChhcmdzKSA9PiB7XG4gICAgICAgIHJldHVybiBpcGNSZW5kZXJlci5pbnZva2UoJ2NoYW5uZWw6c3RlcCcsIGFyZ3MpXG4gICAgfSxcbiAgICBzdGVwQXBpOiAoYXJncykgPT4ge1xuICAgICAgICByZXR1cm4gaXBjUmVuZGVyZXIuaW52b2tlKCdjaGFubmVsOnN0ZXAnLCBhcmdzKVxuICAgIH0sXG59KTsiXSwibmFtZXMiOlsiY29udGV4dEJyaWRnZSIsImlwY1JlbmRlcmVyIiwicmVxdWlyZSIsImNoYW5uZWxzIiwiZXhwb3NlSW5NYWluV29ybGQiLCJ0ZXN0QXBpIiwiYXJncyIsImNvbnNvbGUiLCJsb2ciLCJpbnZva2UiLCJzdGVwQXBpIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/preload.js\n");

/***/ }),

/***/ "./src/shared/constants.js":
/*!*********************************!*\
  !*** ./src/shared/constants.js ***!
  \*********************************/
/***/ ((module) => {

eval("module.exports = {\n  channels: {\n    NEXT_EVENT: 'nextEvent',\n    GET_DATA: 'get_data',\n    TEST_EVENT: 'testEvent',\n    SEND_DATA: 'sendData'\n  }\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc2hhcmVkL2NvbnN0YW50cy5qcy5qcyIsIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJjaGFubmVscyIsIk5FWFRfRVZFTlQiLCJHRVRfREFUQSIsIlRFU1RfRVZFTlQiLCJTRU5EX0RBVEEiXSwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsid2VicGFjazovL21vdG9yLWNvbnNvbGUvLi9zcmMvc2hhcmVkL2NvbnN0YW50cy5qcz82ZGY4Il0sInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGNoYW5uZWxzOiB7XG4gICAgICAgIE5FWFRfRVZFTlQ6ICduZXh0RXZlbnQnLFxuICAgICAgICBHRVRfREFUQTogJ2dldF9kYXRhJyxcbiAgICAgICAgVEVTVF9FVkVOVDogJ3Rlc3RFdmVudCcsXG4gICAgICAgIFNFTkRfREFUQTogJ3NlbmREYXRhJyxcbiAgICB9XG59OyJdLCJtYXBwaW5ncyI6IkFBQUFBLE1BQU0sQ0FBQ0MsT0FBTyxHQUFHO0VBQ2JDLFFBQVEsRUFBRTtJQUNOQyxVQUFVLEVBQUUsV0FBVztJQUN2QkMsUUFBUSxFQUFFLFVBQVU7SUFDcEJDLFVBQVUsRUFBRSxXQUFXO0lBQ3ZCQyxTQUFTLEVBQUU7RUFDZjtBQUNKLENBQUMifQ==\n//# sourceURL=webpack-internal:///./src/shared/constants.js\n");

/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("electron");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/preload.js");
/******/ 	
/******/ })()
;