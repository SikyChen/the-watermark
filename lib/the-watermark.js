(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
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
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Watermark": () => (/* binding */ Watermark)
/* harmony export */ });
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
    this.container = this.config.container;

    this.setContainer();
    this.generateDataUrl();
    this.generateStyleString();
    this.generateWatermark();
    this.observerContainer();
  }

  // 设置水印容器
  setContainer() {
    if (!this.container) {
      this.container = document.querySelector('body');
      this.isFixed = true;
    }

    if (
      !this.isFixed &&
      !['absolute', 'relative', 'fixed'].includes(this.container.style.position)
    ) {
      this.container.style.position = 'relative';
    }
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
          const _watermark = document.querySelector('._watermark');
          if (
            !_watermark ||
            _watermark && _watermark.getAttribute('style') !== styleString
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

  // 移除水印
  hidden() {
    this.observer && this.observer.disconnect();
    this.observer = null;
    this.wm && this.wm.remove && this.wm.remove();
  }
}

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=the-watermark.js.map