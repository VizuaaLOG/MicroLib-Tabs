import {forEach, addClass, hasClass, removeClass, findFromElement, makeUID} from '../bower_components/MicroLib-Utils/src/utils.microlib.js';

class MicroTabs {
    /**
     * Create a new instance of MicroTabs
     * @method constructor
     * @param  {string|object}    element
     */
    constructor(element, options) {
        if(!element || (typeof element !== 'string' && element === Object(element))) {
            throw new TypeError('Element is expected to be of type string or object.');
        }

        if(!options) {
            options = {};
        }

        this.options = {
            tab_class: options.hasOwnProperty('tab_class') ? options.tab_class : 'microlib_tabs_tab',
            nav_class: options.hasOwnProperty('nav_class') ? options.nav_class : 'microlib_tabs_nav',
            nav_item_class: options.hasOwnProperty('nav_item_class') ? options.nav_item_class : 'microlib_tabs_nav_item',
            active_class: options.hasOwnProperty('active_class') ? options.active_class : 'microlib_active'
        };

        if(typeof element === 'string') {
            if(element.indexOf(0) === '#') {
                this._element = document.querySelector(element);
            } else {
                this._element = document.querySelectorAll(element);
            }
        } else {
            this._element = element;
        }

        this._tabs = this._findTabs();

        this._generateTabNavigation();

        this.onChange = function(newContent, newTab, event){};
    }

    /**
     * Loop over the tabs inside our element(s) and assign them a unique ID
     * @method findTabs
     */
    _findTabs() {
        let tabs = [];
        forEach(this._element, (index, item) => {
            let results = findFromElement(item, this.options.tab_class);
            forEach(results, (index, item) => {
                item.id = 'microlib_tabs_' + makeUID();
            });
            tabs.push(results);
        });
        return tabs;
    }

    /**
     * Generate the navigation markup and set the first items to active
     * @method generateTabNavigation
     */
    _generateTabNavigation() {
        forEach(this._tabs, (index, item) => {
            let navContainer = document.createElement('div');
            addClass(navContainer, this.options.nav_class);

            let parent = '';

            forEach(item, (child_index, child) => {
                if(!parent || parent === '') {
                    parent = child.parentNode;
                }

                var navItem = document.createElement('div');
                addClass(navItem, this.options.nav_item_class);
                navItem.setAttribute('data-target', child.id);
                navItem.innerHTML = child.getAttribute('data-title');

                navItem.addEventListener('click', this._processClick.bind(this));

                if(child_index === 0) {
                    addClass(navItem, this.options.active_class);
                }

                navContainer.appendChild(navItem);
            });

            parent.insertBefore(navContainer, item[0]);
            addClass(item[0], this.options.active_class);
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
        let tabs = findFromElement(e.target.parentNode.parentNode, this.options.tab_class);
        let navItems = findFromElement(e.target.parentNode, this.options.nav_item_class);

        forEach(navItems, (index, item) => {
            removeClass(item, this.options.active_class);
        });

        forEach(tabs, (index, item) => {
            removeClass(item, this.options.active_class);
        });

        addClass(element, this.options.active_class);
        addClass(e.target, this.options.active_class);

        this.onChange(element, e.target, e);
    }
}

window.ML = window.ML || {};
window.ML.Tabs = MicroTabs;

