(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["es6Boilerplate"] = factory();
	else
		root["es6Boilerplate"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = __webpack_require__(1);

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	
	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	/**
	Copyright (c) 2016 Thomas Erbe <vizuaalog@gmail.com>
	
	Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
	
	The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
	
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
	*/
	
	var MicroTabs = (function () {
	    /**
	     * Create a new instance of MicroTabs
	     * @method constructor
	     * @param  {string|object}    element
	     */
	
	    function MicroTabs(element) {
	        _classCallCheck(this, MicroTabs);
	
	        if (!element || typeof element !== "string" && element === Object(element)) {
	            throw new TypeError("Element is expected to be of type string or object.");
	        }
	
	        if (typeof element === "string") {
	            if (element.indexOf(0) === "#") {
	                this._element = document.querySelector(element);
	            } else {
	                this._element = document.querySelectorAll(element);
	            }
	        } else {
	            this._element = element;
	        }
	
	        this._tabs = this.findTabs();
	
	        this.generateTabNavigation();
	    }
	
	    _createClass(MicroTabs, {
	        findTabs: {
	
	            /**
	             * Loop over the tabs inside our element(s) and assign them a unique ID
	             * @method findTabs
	             */
	
	            value: function findTabs() {
	                var _this = this;
	
	                var tabs = [];
	                this.forEach(this._element, function (index, item) {
	                    var results = _this.findFromElement(item, "microlib_tabs_tab");
	                    _this.forEach(results, function (index, item) {
	                        item.id = "microlib_tabs_" + _this.makeUID();
	                    });
	                    tabs.push(results);
	                });
	                return tabs;
	            }
	        },
	        forEach: {
	
	            /**
	             * Loop over an array, executing the callback passing the item and index.
	             * @method forEach
	             * @param  {array}    array
	             * @param  {Function} callback
	             */
	
	            value: function forEach(array, callback) {
	                for (var i = 0; i < array.length; i++) {
	                    callback(i, array[i]);
	                }
	            }
	        },
	        findFromElement: {
	
	            /**
	             * Search through an elements children, finding the search string in either
	             * the class or id.
	             * @method findFromElement
	             * @param  {object}        element    [description]
	             * @param  {string}        searchItem [description]
	             * @return {array}                   [description]
	             */
	
	            value: function findFromElement(element, searchItem) {
	                var _this = this;
	
	                var children = element.children;
	                var results = [];
	
	                this.forEach(children, function (index, item) {
	                    if (_this.hasClass(item, searchItem) || item.id === searchItem) {
	                        results.push(item);
	                    }
	                });
	
	                return results;
	            }
	        },
	        generateTabNavigation: {
	
	            /**
	             * Generate the navigation markup and set the first items to active
	             * @method generateTabNavigation
	             */
	
	            value: function generateTabNavigation() {
	                var _this = this;
	
	                this.forEach(this._tabs, function (index, item) {
	                    var navContainer = document.createElement("div");
	                    _this.addClass(navContainer, "microlib_tabs_nav");
	
	                    var parent = "";
	
	                    _this.forEach(item, function (child_index, child) {
	                        if (!parent || parent === "") {
	                            parent = child.parentNode;
	                        }
	
	                        var navItem = document.createElement("div");
	                        _this.addClass(navItem, "microlib_tabs_nav_item");
	                        navItem.setAttribute("data-target", child.id);
	                        navItem.innerHTML = child.getAttribute("data-title");
	
	                        navItem.addEventListener("click", _this._processClick.bind(_this));
	
	                        if (child_index === 0) {
	                            _this.addClass(navItem, "microlib_active");
	                        }
	
	                        navContainer.appendChild(navItem);
	                    });
	
	                    parent.insertBefore(navContainer, item[0]);
	                    _this.addClass(item[0], "microlib_active");
	                });
	            }
	        },
	        _processClick: {
	
	            /**
	             * Process a nav item click
	             * @method _processClick
	             * @param  {object}      e Event object
	             */
	
	            value: function _processClick(e) {
	                var _this = this;
	
	                var target = e.target.getAttribute("data-target");
	                var element = document.querySelector("#" + target);
	                var tabs = this.findFromElement(e.target.parentNode.parentNode, "microlib_tabs_tab");
	                var navItems = this.findFromElement(e.target.parentNode, "microlib_tabs_nav_item");
	
	                this.forEach(navItems, function (index, item) {
	                    _this.removeClass(item, "microlib_active");
	                });
	
	                this.forEach(tabs, function (index, item) {
	                    _this.removeClass(item, "microlib_active");
	                });
	
	                this.addClass(element, "microlib_active");
	                this.addClass(e.target, "microlib_active");
	            }
	        },
	        makeUID: {
	
	            /**
	             * Generate a random UID.
	             * @method makeUID
	             * @return {string}
	             */
	
	            value: function makeUID() {
	                return ("0000" + (Math.random() * Math.pow(36, 4) << 0).toString(36)).slice(-4);
	            }
	        },
	        addClass: {
	            value: function addClass(element, className) {
	                var classes = element.className.split(" ");
	                if (!this.hasClass(element, className)) {
	                    classes.push(className);
	                }
	                element.className = classes.join(" ");
	            }
	        },
	        hasClass: {
	            value: function hasClass(element, className) {
	                var classes = element.className.split(" ");
	                return classes.indexOf(className) !== -1;
	            }
	        },
	        removeClass: {
	            value: function removeClass(element, className) {
	                var classes = element.className.split(" ");
	                if (this.hasClass(element, className)) {
	                    classes.splice(classes.indexOf(className), 1);
	                }
	                element.className = classes.join(" ");
	            }
	        }
	    });
	
	    return MicroTabs;
	})();
	
	window.MicroTabs = MicroTabs;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBiYWEzZmQyYWVjNGYxMzc3MDNjNCIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvdGFicy5taWNyb2xpYi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7OztBQ3RDQSxPQUFNLENBQUMsT0FBTyxHQUFHLG1CQUFPLENBQUMsQ0FBd0IsQ0FBQyxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tDUzVDLFNBQVM7Ozs7Ozs7QUFNQSxjQU5ULFNBQVMsQ0FNQyxPQUFPLEVBQUU7K0JBTm5CLFNBQVM7O0FBT1AsYUFBRyxDQUFDLE9BQU8sSUFBSyxPQUFPLE9BQU8sS0FBSyxRQUFRLElBQUksT0FBTyxLQUFLLE1BQU0sQ0FBQyxPQUFPLENBQUUsRUFBRTtBQUN6RSxtQkFBTSxJQUFJLFNBQVMsQ0FBQyxxREFBcUQsQ0FBQyxDQUFDO1VBQzlFOztBQUVELGFBQUcsT0FBTyxPQUFPLEtBQUssUUFBUSxFQUFFO0FBQzVCLGlCQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFO0FBQzNCLHFCQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7Y0FDbkQsTUFBTTtBQUNILHFCQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztjQUN0RDtVQUNKLE1BQU07QUFDSCxpQkFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7VUFDM0I7O0FBRUQsYUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7O0FBRTdCLGFBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO01BQ2hDOztrQkF4QkMsU0FBUztBQThCWCxpQkFBUTs7Ozs7OztvQkFBQSxvQkFBRzs7O0FBQ1AscUJBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUNkLHFCQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsVUFBQyxLQUFLLEVBQUUsSUFBSSxFQUFLO0FBQ3pDLHlCQUFJLE9BQU8sR0FBRyxNQUFLLGVBQWUsQ0FBQyxJQUFJLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztBQUM5RCwyQkFBSyxPQUFPLENBQUMsT0FBTyxFQUFFLFVBQUMsS0FBSyxFQUFFLElBQUksRUFBSztBQUNuQyw2QkFBSSxDQUFDLEVBQUUsR0FBRyxnQkFBZ0IsR0FBRyxNQUFLLE9BQU8sRUFBRSxDQUFDO3NCQUMvQyxDQUFDLENBQUM7QUFDSCx5QkFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztrQkFDdEIsQ0FBQyxDQUFDO0FBQ0gsd0JBQU8sSUFBSSxDQUFDO2NBQ2Y7O0FBUUQsZ0JBQU87Ozs7Ozs7OztvQkFBQSxpQkFBQyxLQUFLLEVBQUUsUUFBUSxFQUFFO0FBQ3JCLHNCQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUNsQyw2QkFBUSxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztrQkFDekI7Y0FDSjs7QUFVRCx3QkFBZTs7Ozs7Ozs7Ozs7b0JBQUEseUJBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRTs7O0FBQ2pDLHFCQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDO0FBQ2hDLHFCQUFJLE9BQU8sR0FBRyxFQUFFLENBQUM7O0FBRWpCLHFCQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxVQUFDLEtBQUssRUFBRSxJQUFJLEVBQUs7QUFDcEMseUJBQUcsTUFBSyxRQUFRLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxJQUFJLElBQUksQ0FBQyxFQUFFLEtBQUssVUFBVSxFQUFFO0FBQzFELGdDQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO3NCQUN0QjtrQkFDSixDQUFDLENBQUM7O0FBRUgsd0JBQU8sT0FBTyxDQUFDO2NBQ2xCOztBQU1ELDhCQUFxQjs7Ozs7OztvQkFBQSxpQ0FBRzs7O0FBQ3BCLHFCQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsVUFBQyxLQUFLLEVBQUUsSUFBSSxFQUFLO0FBQ3RDLHlCQUFJLFlBQVksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ2pELDJCQUFLLFFBQVEsQ0FBQyxZQUFZLEVBQUUsbUJBQW1CLENBQUMsQ0FBQzs7QUFFakQseUJBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQzs7QUFFaEIsMkJBQUssT0FBTyxDQUFDLElBQUksRUFBRSxVQUFDLFdBQVcsRUFBRSxLQUFLLEVBQUs7QUFDdkMsNkJBQUcsQ0FBQyxNQUFNLElBQUksTUFBTSxLQUFLLEVBQUUsRUFBRTtBQUN6QixtQ0FBTSxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUM7MEJBQzdCOztBQUVELDZCQUFJLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzVDLCtCQUFLLFFBQVEsQ0FBQyxPQUFPLEVBQUUsd0JBQXdCLENBQUMsQ0FBQztBQUNqRCxnQ0FBTyxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQzlDLGdDQUFPLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUM7O0FBRXJELGdDQUFPLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLE1BQUssYUFBYSxDQUFDLElBQUksT0FBTSxDQUFDLENBQUM7O0FBRWpFLDZCQUFHLFdBQVcsS0FBSyxDQUFDLEVBQUU7QUFDbEIsbUNBQUssUUFBUSxDQUFDLE9BQU8sRUFBRSxpQkFBaUIsQ0FBQyxDQUFDOzBCQUM3Qzs7QUFFRCxxQ0FBWSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztzQkFDckMsQ0FBQyxDQUFDOztBQUVILDJCQUFNLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMzQywyQkFBSyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLGlCQUFpQixDQUFDLENBQUM7a0JBQzdDLENBQUMsQ0FBQztjQUNOOztBQU9ELHNCQUFhOzs7Ozs7OztvQkFBQSx1QkFBQyxDQUFDLEVBQUU7OztBQUNiLHFCQUFJLE1BQU0sR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUNsRCxxQkFBSSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLENBQUM7QUFDbkQscUJBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFLG1CQUFtQixDQUFDLENBQUM7QUFDckYscUJBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsd0JBQXdCLENBQUMsQ0FBQzs7QUFFbkYscUJBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFVBQUMsS0FBSyxFQUFFLElBQUksRUFBSztBQUNwQywyQkFBSyxXQUFXLENBQUMsSUFBSSxFQUFFLGlCQUFpQixDQUFDLENBQUM7a0JBQzdDLENBQUMsQ0FBQzs7QUFFSCxxQkFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsVUFBQyxLQUFLLEVBQUUsSUFBSSxFQUFLO0FBQ2hDLDJCQUFLLFdBQVcsQ0FBQyxJQUFJLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztrQkFDN0MsQ0FBQyxDQUFDOztBQUVILHFCQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0FBQzFDLHFCQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztjQUM5Qzs7QUFPRCxnQkFBTzs7Ozs7Ozs7b0JBQUEsbUJBQUc7QUFDTix3QkFBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2NBQ2hGOztBQUVELGlCQUFRO29CQUFBLGtCQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUU7QUFDekIscUJBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzNDLHFCQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLEVBQUU7QUFDbkMsNEJBQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7a0JBQzNCO0FBQ0Qsd0JBQU8sQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztjQUN6Qzs7QUFFRCxpQkFBUTtvQkFBQSxrQkFBQyxPQUFPLEVBQUUsU0FBUyxFQUFFO0FBQ3pCLHFCQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMzQyx3QkFBTyxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2NBQzVDOztBQUVELG9CQUFXO29CQUFBLHFCQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUU7QUFDNUIscUJBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzNDLHFCQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxFQUFFO0FBQ2xDLDRCQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7a0JBQ2pEO0FBQ0Qsd0JBQU8sQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztjQUN6Qzs7OztZQWpLQyxTQUFTOzs7QUFvS2YsT0FBTSxDQUFDLFNBQVMsR0FBRyxTQUFTLEMiLCJmaWxlIjoiLi9kaXN0L3RhYnMubWljcm9saWItMi4wLjAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJlczZCb2lsZXJwbGF0ZVwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJlczZCb2lsZXJwbGF0ZVwiXSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgYmFhM2ZkMmFlYzRmMTM3NzAzYzRcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL3RhYnMubWljcm9saWIuanMnKTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2pzaGludC1sb2FkZXIhLi9pbmRleC5qc1xuICoqLyIsIi8qKlxyXG5Db3B5cmlnaHQgKGMpIDIwMTYgVGhvbWFzIEVyYmUgPHZpenVhYWxvZ0BnbWFpbC5jb20+XHJcblxyXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxyXG5cclxuVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXHJcblxyXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cclxuKi9cclxuY2xhc3MgTWljcm9UYWJzIHtcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIE1pY3JvVGFic1xyXG4gICAgICogQG1ldGhvZCBjb25zdHJ1Y3RvclxyXG4gICAgICogQHBhcmFtICB7c3RyaW5nfG9iamVjdH0gICAgZWxlbWVudFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50KSB7XHJcbiAgICAgICAgaWYoIWVsZW1lbnQgfHwgKHR5cGVvZiBlbGVtZW50ICE9PSAnc3RyaW5nJyAmJiBlbGVtZW50ID09PSBPYmplY3QoZWxlbWVudCkpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0VsZW1lbnQgaXMgZXhwZWN0ZWQgdG8gYmUgb2YgdHlwZSBzdHJpbmcgb3Igb2JqZWN0LicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodHlwZW9mIGVsZW1lbnQgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIGlmKGVsZW1lbnQuaW5kZXhPZigwKSA9PT0gJyMnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9lbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbGVtZW50KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2VsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGVsZW1lbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fZWxlbWVudCA9IGVsZW1lbnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl90YWJzID0gdGhpcy5maW5kVGFicygpO1xyXG5cclxuICAgICAgICB0aGlzLmdlbmVyYXRlVGFiTmF2aWdhdGlvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9vcCBvdmVyIHRoZSB0YWJzIGluc2lkZSBvdXIgZWxlbWVudChzKSBhbmQgYXNzaWduIHRoZW0gYSB1bmlxdWUgSURcclxuICAgICAqIEBtZXRob2QgZmluZFRhYnNcclxuICAgICAqL1xyXG4gICAgZmluZFRhYnMoKSB7XHJcbiAgICAgICAgbGV0IHRhYnMgPSBbXTtcclxuICAgICAgICB0aGlzLmZvckVhY2godGhpcy5fZWxlbWVudCwgKGluZGV4LCBpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHRzID0gdGhpcy5maW5kRnJvbUVsZW1lbnQoaXRlbSwgJ21pY3JvbGliX3RhYnNfdGFiJyk7XHJcbiAgICAgICAgICAgIHRoaXMuZm9yRWFjaChyZXN1bHRzLCAoaW5kZXgsIGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICAgIGl0ZW0uaWQgPSAnbWljcm9saWJfdGFic18nICsgdGhpcy5tYWtlVUlEKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0YWJzLnB1c2gocmVzdWx0cyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRhYnM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMb29wIG92ZXIgYW4gYXJyYXksIGV4ZWN1dGluZyB0aGUgY2FsbGJhY2sgcGFzc2luZyB0aGUgaXRlbSBhbmQgaW5kZXguXHJcbiAgICAgKiBAbWV0aG9kIGZvckVhY2hcclxuICAgICAqIEBwYXJhbSAge2FycmF5fSAgICBhcnJheVxyXG4gICAgICogQHBhcmFtICB7RnVuY3Rpb259IGNhbGxiYWNrXHJcbiAgICAgKi9cclxuICAgIGZvckVhY2goYXJyYXksIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKGksIGFycmF5W2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZWFyY2ggdGhyb3VnaCBhbiBlbGVtZW50cyBjaGlsZHJlbiwgZmluZGluZyB0aGUgc2VhcmNoIHN0cmluZyBpbiBlaXRoZXJcclxuICAgICAqIHRoZSBjbGFzcyBvciBpZC5cclxuICAgICAqIEBtZXRob2QgZmluZEZyb21FbGVtZW50XHJcbiAgICAgKiBAcGFyYW0gIHtvYmplY3R9ICAgICAgICBlbGVtZW50ICAgIFtkZXNjcmlwdGlvbl1cclxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gICAgICAgIHNlYXJjaEl0ZW0gW2Rlc2NyaXB0aW9uXVxyXG4gICAgICogQHJldHVybiB7YXJyYXl9ICAgICAgICAgICAgICAgICAgIFtkZXNjcmlwdGlvbl1cclxuICAgICAqL1xyXG4gICAgZmluZEZyb21FbGVtZW50KGVsZW1lbnQsIHNlYXJjaEl0ZW0pIHtcclxuICAgICAgICBsZXQgY2hpbGRyZW4gPSBlbGVtZW50LmNoaWxkcmVuO1xyXG4gICAgICAgIGxldCByZXN1bHRzID0gW107XHJcblxyXG4gICAgICAgIHRoaXMuZm9yRWFjaChjaGlsZHJlbiwgKGluZGV4LCBpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuaGFzQ2xhc3MoaXRlbSwgc2VhcmNoSXRlbSkgfHwgaXRlbS5pZCA9PT0gc2VhcmNoSXRlbSkge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKGl0ZW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiByZXN1bHRzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2VuZXJhdGUgdGhlIG5hdmlnYXRpb24gbWFya3VwIGFuZCBzZXQgdGhlIGZpcnN0IGl0ZW1zIHRvIGFjdGl2ZVxyXG4gICAgICogQG1ldGhvZCBnZW5lcmF0ZVRhYk5hdmlnYXRpb25cclxuICAgICAqL1xyXG4gICAgZ2VuZXJhdGVUYWJOYXZpZ2F0aW9uKCkge1xyXG4gICAgICAgIHRoaXMuZm9yRWFjaCh0aGlzLl90YWJzLCAoaW5kZXgsIGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgbGV0IG5hdkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICB0aGlzLmFkZENsYXNzKG5hdkNvbnRhaW5lciwgJ21pY3JvbGliX3RhYnNfbmF2Jyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgcGFyZW50ID0gJyc7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmZvckVhY2goaXRlbSwgKGNoaWxkX2luZGV4LCBjaGlsZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYoIXBhcmVudCB8fCBwYXJlbnQgPT09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50ID0gY2hpbGQucGFyZW50Tm9kZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgbmF2SXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRDbGFzcyhuYXZJdGVtLCAnbWljcm9saWJfdGFic19uYXZfaXRlbScpO1xyXG4gICAgICAgICAgICAgICAgbmF2SXRlbS5zZXRBdHRyaWJ1dGUoJ2RhdGEtdGFyZ2V0JywgY2hpbGQuaWQpO1xyXG4gICAgICAgICAgICAgICAgbmF2SXRlbS5pbm5lckhUTUwgPSBjaGlsZC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGl0bGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBuYXZJdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5fcHJvY2Vzc0NsaWNrLmJpbmQodGhpcykpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKGNoaWxkX2luZGV4ID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRDbGFzcyhuYXZJdGVtLCAnbWljcm9saWJfYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbmF2Q29udGFpbmVyLmFwcGVuZENoaWxkKG5hdkl0ZW0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHBhcmVudC5pbnNlcnRCZWZvcmUobmF2Q29udGFpbmVyLCBpdGVtWzBdKTtcclxuICAgICAgICAgICAgdGhpcy5hZGRDbGFzcyhpdGVtWzBdLCAnbWljcm9saWJfYWN0aXZlJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQcm9jZXNzIGEgbmF2IGl0ZW0gY2xpY2tcclxuICAgICAqIEBtZXRob2QgX3Byb2Nlc3NDbGlja1xyXG4gICAgICogQHBhcmFtICB7b2JqZWN0fSAgICAgIGUgRXZlbnQgb2JqZWN0XHJcbiAgICAgKi9cclxuICAgIF9wcm9jZXNzQ2xpY2soZSkge1xyXG4gICAgICAgIGxldCB0YXJnZXQgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFyZ2V0Jyk7XHJcbiAgICAgICAgbGV0IGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjJyArIHRhcmdldCk7XHJcbiAgICAgICAgbGV0IHRhYnMgPSB0aGlzLmZpbmRGcm9tRWxlbWVudChlLnRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGUsICdtaWNyb2xpYl90YWJzX3RhYicpO1xyXG4gICAgICAgIGxldCBuYXZJdGVtcyA9IHRoaXMuZmluZEZyb21FbGVtZW50KGUudGFyZ2V0LnBhcmVudE5vZGUsICdtaWNyb2xpYl90YWJzX25hdl9pdGVtJyk7XHJcblxyXG4gICAgICAgIHRoaXMuZm9yRWFjaChuYXZJdGVtcywgKGluZGV4LCBpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQ2xhc3MoaXRlbSwgJ21pY3JvbGliX2FjdGl2ZScpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmZvckVhY2godGFicywgKGluZGV4LCBpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQ2xhc3MoaXRlbSwgJ21pY3JvbGliX2FjdGl2ZScpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmFkZENsYXNzKGVsZW1lbnQsICdtaWNyb2xpYl9hY3RpdmUnKTtcclxuICAgICAgICB0aGlzLmFkZENsYXNzKGUudGFyZ2V0LCAnbWljcm9saWJfYWN0aXZlJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZW5lcmF0ZSBhIHJhbmRvbSBVSUQuXHJcbiAgICAgKiBAbWV0aG9kIG1ha2VVSURcclxuICAgICAqIEByZXR1cm4ge3N0cmluZ31cclxuICAgICAqL1xyXG4gICAgbWFrZVVJRCgpIHtcclxuICAgICAgICByZXR1cm4gKCcwMDAwJyArIChNYXRoLnJhbmRvbSgpKk1hdGgucG93KDM2LDQpIDw8IDApLnRvU3RyaW5nKDM2KSkuc2xpY2UoLTQpO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZENsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSkge1xyXG4gICAgICAgIGxldCBjbGFzc2VzID0gZWxlbWVudC5jbGFzc05hbWUuc3BsaXQoJyAnKTtcclxuICAgICAgICBpZighdGhpcy5oYXNDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpKSB7XHJcbiAgICAgICAgICAgIGNsYXNzZXMucHVzaChjbGFzc05hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbGVtZW50LmNsYXNzTmFtZSA9IGNsYXNzZXMuam9pbignICcpO1xyXG4gICAgfVxyXG5cclxuICAgIGhhc0NsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSkge1xyXG4gICAgICAgIGxldCBjbGFzc2VzID0gZWxlbWVudC5jbGFzc05hbWUuc3BsaXQoJyAnKTtcclxuICAgICAgICByZXR1cm4gY2xhc3Nlcy5pbmRleE9mKGNsYXNzTmFtZSkgIT09IC0xO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZUNsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSkge1xyXG4gICAgICAgIGxldCBjbGFzc2VzID0gZWxlbWVudC5jbGFzc05hbWUuc3BsaXQoJyAnKTtcclxuICAgICAgICBpZih0aGlzLmhhc0NsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSkpIHtcclxuICAgICAgICAgICAgY2xhc3Nlcy5zcGxpY2UoY2xhc3Nlcy5pbmRleE9mKGNsYXNzTmFtZSksIDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbGVtZW50LmNsYXNzTmFtZSA9IGNsYXNzZXMuam9pbignICcpO1xyXG4gICAgfVxyXG59XHJcblxyXG53aW5kb3cuTWljcm9UYWJzID0gTWljcm9UYWJzO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vanNoaW50LWxvYWRlciEuL2xpYi90YWJzLm1pY3JvbGliLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==