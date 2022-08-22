(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Watermark"] = factory();
	else
		root["Watermark"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Watermark)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/utils.js");


/**
 * new Watermark({
 *  container: body,
 *  content: 'watermark',
 *  width: 300,
 *  height: 200,
 *  zIndex: 1000,
 *  font: "28px auto",
 *  textAlign: 'center',
 *  textBaseline: 'middle',
 *  color: 'rgba(0, 0, 0, 0.2)',
 *  rotate: -34,
 * })
 */
class Watermark {

  config = {
    container: null,
    content: 'watermark',
    width: 300,
    height: 200,
    zIndex: 1000,
    font: "28px auto",
    textAlign: 'center',
    textBaseline: 'middle',
    color: 'rgba(0, 0, 0, 0.2)',
    rotate: -34,
  }

  container = null;
  isFixed = false;
  dataUrl = void 0;
  styleString = '';
  wm = void 0;
  observer = void 0;

  constructor(config = {}) {
    this.config = {
      ...this.config,
      ...config,
    }

    this.setContainer(this.config.container);

    try {
      if (
        this.container._watermarkInstance &&
        (0,_utils__WEBPACK_IMPORTED_MODULE_0__.isConfigEqual)(this.container._watermarkInstance.config, this.config)
      ) {
        return this.container._watermarkInstance;
      } else {
        this.container._watermarkInstance = this;
      }
    } catch (error) {
      console.log('Please enter the correct configs.', error);
    }

    this.init();
  }

  // 设置水印容器
  setContainer(container) {
    if (container) {
      this.container = container;
      if (!['absolute', 'relative', 'fixed'].includes(this.container.style.position)) {
        this.container.style.position = 'relative';
      }
    }
    else {
      this.container = document.querySelector('body');
      this.isFixed = true;
    }
  }

  init() {
    this.generateDataUrl();
    this.generateStyleString();
    this.generateWatermark();
    this.observerContainer();
  }

  // 使用 canvas 生成水印图片，并转为 dataUrl
  generateDataUrl() {
    const {
      width,
      height,
      font,
      textAlign,
      textBaseline,
      color,
      rotate,
      content,
    } = this.config;

    const canvas = document.createElement('canvas');
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);
  
    const ctx = canvas.getContext('2d');
    ctx.font = font;
    ctx.textAlign = textAlign;
    ctx.textBaseline = textBaseline;
    ctx.fillStyle = color;
    ctx.translate(parseFloat(width) / 2, parseFloat(height) / 2);
    ctx.rotate(Math.PI / 180 * rotate);
    ctx.fillText(content, 0, 0);
  
    this.dataUrl = canvas.toDataURL();
  }

  // 根据配置及 dataUrl 生成一个 style 字符串，用于注入到水印 dom 节点中
  generateStyleString() {
    const { zIndex } = this.config;

    this.styleString = 
    (`
      position: ${this.isFixed ? 'fixed' : 'absolute'};
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: ${zIndex};
      pointer-events:none;
      background-repeat:repeat;
    `)
    .replaceAll(/[\n]|[\ +]/g, '') + `background-image: url("${this.dataUrl}");`;
  }

  // 生成水印 dom 节点，并 append 到容器中
  generateWatermark() {
    this.wm = document.createElement('div');
    this.wm.setAttribute('style', this.styleString);
    this.wm.setAttribute('class', '_watermark');
    this.container.appendChild(this.wm);
  }

  /**
   * 监听容器节点变化，若
   * 1. 水印节点被删掉
   * 2. 水印节点的 style 改变
   * 那么，重新生成水印，以防用户对水印作出修改
   */
  observerContainer() {
    const MutationObserver = window.MutationObserver;
    if (MutationObserver) {
      this.observer = new MutationObserver(
        () => {
          const _watermark = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getWatermarkByContainer)(this.container);
          if (
            !_watermark ||
            _watermark && _watermark.getAttribute('style') !== this.styleString
          ) {
            this.hidden();
            const newWm = new Watermark(this.config);
            this.hidden = () => {
              newWm.hidden();
            }
          }
        }
      );
  
      this.observer.observe(
        this.container,
        {
          childList: true,
          attributes: true,
          subtree: true,
        }
      );
    }
  }

  /**
   * 移除水印
   */
  hidden() {
    this.observer && this.observer.disconnect();
    this.observer = null;
    this.wm && this.wm.remove && this.wm.remove();
    this.container._watermarkInstance = null;
  }
}


/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getWatermarkByContainer": () => (/* binding */ getWatermarkByContainer),
/* harmony export */   "isConfigEqual": () => (/* binding */ isConfigEqual)
/* harmony export */ });
/**
 * 比较两次的 config 配置是否相同
 * @param {Object} config 
 * @param {Object} other 
 * @returns Boolean
 */
const isConfigEqual = (config, other) => {

	if (config === other) return true;

	let configProps = Object.getOwnPropertyNames(config);
	let otherProps = Object.getOwnPropertyNames(other);
	if (configProps.length !== otherProps.length) return false;

	for (let prop in config) {
		if (!other.hasOwnProperty(prop) || other[prop] !== config[prop]) {
			return false;
		}
	}

	return true;
}

/**
 * 获取容器下的水印 DOM 节点
 * @param {HTMLDocumentElement} container 水印所在容器的 DOM 节点
 * @returns 水印 DOM 节点
 */
const getWatermarkByContainer = (container) => {
  if (!container) return null;
  
  for(let child of container.childNodes.values()) {
    if (child.className === '_watermark') {
      return child;
    }
  }

  return null;
}


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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!******************!*\
  !*** ./index.js ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _src_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/index.js */ "./src/index.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_src_index_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

})();

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=the-watermark.js.map