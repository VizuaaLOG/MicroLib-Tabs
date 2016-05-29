/**
Copyright (c) 2016 Thomas Erbe <vizuaalog@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
class MicroTabs {
    /**
     * Create a new instance of MicroTabs
     * @method constructor
     * @param  {string|object}    element
     */
    constructor(element) {
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
    }

    /**
     * Loop over the tabs inside our element(s) and assign them a unique ID
     * @method findTabs
     */
    findTabs() {
        let tabs = [];
        this.forEach(this._element, (index, item) => {
            let results = this.findFromElement(item, 'microlib_tabs_tab');
            this.forEach(results, (index, item) => {
                item.id = 'microlib_tabs_' + this.makeUID();
            });
            tabs.push(results);
        });
        return tabs;
    }

    /**
     * Loop over an array, executing the callback passing the item and index.
     * @method forEach
     * @param  {array}    array
     * @param  {Function} callback
     */
    forEach(array, callback) {
        for(let i = 0; i < array.length; i++) {
            callback(i, array[i]);
        }
    }

    /**
     * Search through an elements children, finding the search string in either
     * the class or id.
     * @method findFromElement
     * @param  {object}        element    [description]
     * @param  {string}        searchItem [description]
     * @return {array}                   [description]
     */
    findFromElement(element, searchItem) {
        let children = element.children;
        let results = [];

        this.forEach(children, (index, item) => {
            if(this.hasClass(item, searchItem) || item.id === searchItem) {
                results.push(item);
            }
        });

        return results;
    }

    /**
     * Generate the navigation markup and set the first items to active
     * @method generateTabNavigation
     */
    generateTabNavigation() {
        this.forEach(this._tabs, (index, item) => {
            let navContainer = document.createElement('div');
            this.addClass(navContainer, 'microlib_tabs_nav');

            let parent = '';

            this.forEach(item, (child_index, child) => {
                if(!parent || parent === '') {
                    parent = child.parentNode;
                }

                var navItem = document.createElement('div');
                this.addClass(navItem, 'microlib_tabs_nav_item');
                navItem.setAttribute('data-target', child.id);
                navItem.innerHTML = child.getAttribute('data-title');

                navItem.addEventListener('click', this._processClick.bind(this));

                if(child_index === 0) {
                    this.addClass(navItem, 'microlib_active');
                }

                navContainer.appendChild(navItem);
            });

            parent.insertBefore(navContainer, item[0]);
            this.addClass(item[0], 'microlib_active');
        });
    }

    /**
     * Process a nav item click
     * @method _processClick
     * @param  {object}      e Event object
     */
    _processClick(e) {
        let target = e.target.getAttribute('data-target');
        let element = document.querySelector('#' + target);
        let tabs = this.findFromElement(e.target.parentNode.parentNode, 'microlib_tabs_tab');
        let navItems = this.findFromElement(e.target.parentNode, 'microlib_tabs_nav_item');

        this.forEach(navItems, (index, item) => {
            this.removeClass(item, 'microlib_active');
        });

        this.forEach(tabs, (index, item) => {
            this.removeClass(item, 'microlib_active');
        });

        this.addClass(element, 'microlib_active');
        this.addClass(e.target, 'microlib_active');
    }

    /**
     * Generate a random UID.
     * @method makeUID
     * @return {string}
     */
    makeUID() {
        return ('0000' + (Math.random()*Math.pow(36,4) << 0).toString(36)).slice(-4);
    }

    addClass(element, className) {
        let classes = element.className.split(' ');
        if(!this.hasClass(element, className)) {
            classes.push(className);
        }
        element.className = classes.join(' ');
    }

    hasClass(element, className) {
        let classes = element.className.split(' ');
        return classes.indexOf(className) !== -1;
    }

    removeClass(element, className) {
        let classes = element.className.split(' ');
        if(this.hasClass(element, className)) {
            classes.splice(classes.indexOf(className), 1);
        }
        element.className = classes.join(' ');
    }
}

window.MicroTabs = MicroTabs;
