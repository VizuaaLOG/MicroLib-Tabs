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