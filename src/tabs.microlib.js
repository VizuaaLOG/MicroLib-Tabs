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
        forEach(this._element, (index, item) => {
            let results = findFromElement(item, 'microlib_tabs_tab');
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
    generateTabNavigation() {
        forEach(this._tabs, (index, item) => {
            let navContainer = document.createElement('div');
            addClass(navContainer, 'microlib_tabs_nav');

            let parent = '';

            forEach(item, (child_index, child) => {
                if(!parent || parent === '') {
                    parent = child.parentNode;
                }

                var navItem = document.createElement('div');
                addClass(navItem, 'microlib_tabs_nav_item');
                navItem.setAttribute('data-target', child.id);
                navItem.innerHTML = child.getAttribute('data-title');

                navItem.addEventListener('click', this._processClick.bind(this));

                if(child_index === 0) {
                    addClass(navItem, 'microlib_active');
                }

                navContainer.appendChild(navItem);
            });

            parent.insertBefore(navContainer, item[0]);
            addClass(item[0], 'microlib_active');
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
        let tabs = findFromElement(e.target.parentNode.parentNode, 'microlib_tabs_tab');
        let navItems = findFromElement(e.target.parentNode, 'microlib_tabs_nav_item');

        forEach(navItems, (index, item) => {
            removeClass(item, 'microlib_active');
        });

        forEach(tabs, (index, item) => {
            removeClass(item, 'microlib_active');
        });

        addClass(element, 'microlib_active');
        addClass(e.target, 'microlib_active');
    }
}

window.ML = window.ML || {};
window.ML.Tabs = MicroTabs;
