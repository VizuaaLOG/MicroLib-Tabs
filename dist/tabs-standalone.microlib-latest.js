/**
 * MicroLib-Utils is the utility library for other MicroLib libraries. It provides
 * helper methods for common tasks such as adding, checking and removing classes.
 * @version 1.0.0
 * @author Thomas Erbe <vizuaalog@gmail.com>
 * @license MIT
 */

/**
 * Loop over an array, executing the callback passing the item and index.
 * @method forEach
 * @param  {array}    array
 * @param  {Function} callback
 */
function forEach(array, callback) {
    for(var i = 0; i < array.length; i++) {
        callback(i, array[i]);
    }
}

/**
 * Generate a random UID.
 * @method makeUID
 * @return {string}
 */
function makeUID() {
    return ('0000' + (Math.random()*Math.pow(36,4) << 0).toString(36)).slice(-4);
}

/**
 * Search through an elements children, finding the search string in either
 * the class or id.
 * @method findFromElement
 * @param  {object}        element    [description]
 * @param  {string}        searchItem [description]
 * @return {array}                   [description]
 */
function findFromElement(element, searchItem) {
    var children = element.children;
    var results = [];

    forEach(children, function (index, item) {
        if(hasClass(item, searchItem) || item.id === searchItem) {
            results.push(item);
        }
    });

    return results;
}

/**
 * Add a class to an element
 * @method addClass
 * @param  {object} element
 * @param  {string} className
 */
function addClass(element, className) {
    var classes = element.className.split(' ');
    if(!this.hasClass(element, className)) {
        classes.push(className);
    }
    element.className = classes.join(' ');
}

/**
 * Check to see if the element has a class
 * @method hasClass
 * @param  {object}  element
 * @param  {string}  className
 * @return {Boolean}           [description]
 */
function hasClass(element, className) {
    var classes = element.className.split(' ');
    return classes.indexOf(className) !== -1;
}

/**
 * Remove a class from an element
 * @method removeClass
 * @param  {object}    element
 * @param  {string}    className
 */
function removeClass(element, className) {
    var classes = element.className.split(' ');
    if(this.hasClass(element, className)) {
        classes.splice(classes.indexOf(className), 1);
    }
    element.className = classes.join(' ');
}

var MicroTabs = function MicroTabs(element) {
    if(!element || (typeof element !== 'string' && element === Object(element))) {
        throw new TypeError('Element is expected to be of type string or object.');
    }

    if(typeof element === 'string') {
        if(element.indexOf(0) === '#') {
            this._element = document.querySelector(element);
        } else {
            this._element = document.querySelectorAll(element);
        }
    } else {
        this._element = element;
    }

    this._tabs = this.findTabs();

    this.generateTabNavigation();
};

/**
 * Loop over the tabs inside our element(s) and assign them a unique ID
 * @method findTabs
 */
MicroTabs.prototype.findTabs = function findTabs() {
    var tabs = [];
    forEach(this._element, function (index, item) {
        var results = findFromElement(item, 'microlib_tabs_tab');
        forEach(results, function (index, item) {
            item.id = 'microlib_tabs_' + makeUID();
        });
        tabs.push(results);
    });
    return tabs;
};

/**
 * Generate the navigation markup and set the first items to active
 * @method generateTabNavigation
 */
MicroTabs.prototype.generateTabNavigation = function generateTabNavigation() {
        var this$1 = this;

    forEach(this._tabs, function (index, item) {
        var navContainer = document.createElement('div');
        addClass(navContainer, 'microlib_tabs_nav');

        var parent = '';

        forEach(item, function (child_index, child) {
            if(!parent || parent === '') {
                parent = child.parentNode;
            }

            var navItem = document.createElement('div');
            addClass(navItem, 'microlib_tabs_nav_item');
            navItem.setAttribute('data-target', child.id);
            navItem.innerHTML = child.getAttribute('data-title');

            navItem.addEventListener('click', this$1._processClick.bind(this$1));

            if(child_index === 0) {
                addClass(navItem, 'microlib_active');
            }

            navContainer.appendChild(navItem);
        });

        parent.insertBefore(navContainer, item[0]);
        addClass(item[0], 'microlib_active');
    });
};

/**
 * Process a nav item click
 * @method _processClick
 * @param  {object}  e Event object
 */
MicroTabs.prototype._processClick = function _processClick(e) {
    var target = e.target.getAttribute('data-target');
    var element = document.querySelector('#' + target);
    var tabs = findFromElement(e.target.parentNode.parentNode, 'microlib_tabs_tab');
    var navItems = findFromElement(e.target.parentNode, 'microlib_tabs_nav_item');

    forEach(navItems, function (index, item) {
        removeClass(item, 'microlib_active');
    });

    forEach(tabs, function (index, item) {
        removeClass(item, 'microlib_active');
    });

    addClass(element, 'microlib_active');
    addClass(e.target, 'microlib_active');
};

window.ML = window.ML || {};
window.ML.Tabs = MicroTabs;