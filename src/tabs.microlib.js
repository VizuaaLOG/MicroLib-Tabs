/**
 * Project: MicroLibs
 * File Name: tabs.microlib.js
 * Author: Thomas Erbe
 * License: MIT
 * Version: 1.1.0
 */

(function(w, d) {
    "use strict";

    var Micro = w.Micro || {};

    /**
     * The main function to initiate a tabs call
     * @param {string|HTMLElement} element The containing element to search through to create a tabs instance
     */
    Micro.tabs = function(element) {
        var container, i, j, k, l;

        if(!element) {
            return;
        }

        /**
         * Create the tabsElements variable to store the instances of tabs within
         * this container. (NOTE: Was moved to be private to each function call to prevent
         * conflicting function calls)
         * @type {Array}
         */
        var _tabsElements = [];

        /**
         * Assume that if the container argument is a string that we need to do the selection
         * Also assume that we want the first element
         */
        if(typeof element === "string") {
            container = d.querySelectorAll(element);
        } else {
            container = element;
        }

        /**
         * Loop over the following code for each element found with the querySelectorAll
         */
        for(l = 0; l < container.length; l++) {
            /**
             * Check to see if the provided element is infact the tabs we want
             * if not then look over the children finding all instances of the tabs.
             */
            if(container[l].getAttribute("data-micro") && container[l].getAttribute("data-micro") === "tabs") {
                _tabsElements.push(container[l]);
            } else {
                /**
                 * Loop over all of the children inside the container. When an element with data-micro="tabs" is found
                 * then store it for later use.
                 */
                var numChildren = container[l].children.length;

                for(i = 0; i < numChildren; i++) {
                    if(container[l].children[i].getAttribute("data-micro") && container[l].children[i].getAttribute("data-micro") === "tabs") {
                        _tabsElements.push(container[l].children[i]);
                    }
                }
            }
        }

        /**
         * Check to make sure at least one tabs container exists, otherwise exit
         */
        if(_tabsElements.length <= 0) {
            return;
        }

        /**
         * Loop over each tab element creating the tabs markup and the functionality for each.
         */
        var tabsLength = _tabsElements.length;

        for(i = 0; i < tabsLength; i++) {
            var tab = _tabsElements[i];

            /**
             * Find each tab within the main container. Look for the data-title attribute
             */
            var tabs = [],
                childrenNum = tab.children.length;

            for(j = 0; j < childrenNum; j++) {
                if(tab.children[j].getAttribute("data-title")) {
                    tabs.push({
                        title: tab.children[j].getAttribute("data-title"),
                        elem: tab.children[j]
                    });

                    tab.children[j].style.display = "none";

                    if(j === 0) {
                        tab.children[j].style.display = "block";
                        Micro.addClass("active", tab.children[j]);
                    }
                }
            }

            /**
             * Loop over each tab setting up the HTML structure.
             */
            var numTabs = tabs.length,
                headingContainer = d.createElement("div");

            Micro.addClass("tabs-headings", headingContainer);

            for(k = 0; k < numTabs; k++) {
                var heading = d.createElement("div");
                Micro.addClass("tab-heading", heading);
                heading.setAttribute("data-target", tabs[k].title);
                heading.innerHTML = tabs[k].title;

                heading.addEventListener("click", Micro._processTabClick, false);

                if(k === 0) {
                    Micro.addClass("active", heading);
                }

                headingContainer.appendChild(heading);
            }

            tab.insertBefore(headingContainer, tab.firstChild);
        }
    };

    /**
     * The function to call when each tab is clicked. This function will remove the active class from the current
     * tab heading and content and place it on the newly clicked heading and matching content. It will also
     * change the display styles on the content to match.
     * @param event
     * @private
     */
    Micro._processTabClick = function(event) {
        var clickedElem = event.target,
            tabsContainer = clickedElem.parentNode.parentNode,
            target = clickedElem.getAttribute("data-target"),
            tabHeadings = clickedElem.parentNode,
            i;

        /**
         * Find the target element within the tags and assign the HTML element to the target variable
         */
        var tabNum = tabsContainer.children.length;
        for(i = 1; i < tabNum; i++) {
            if(tabsContainer.children[i].getAttribute("data-title") === target) {
                target = tabsContainer.children[i];
            }
        }

        /**
         * Change the classes and styles to update the looks of the tabs element
         */
        for(i = 1; i < tabNum; i++) {
            tabsContainer.children[i].style.display = "none";
            Micro.removeClass("active", tabsContainer.children[i]);
        }


        var numHeadings = tabHeadings.children.length;
        for(i = 0; i < numHeadings; i++) {
            Micro.removeClass("active", tabHeadings.children[i]);
        }

        Micro.addClass("active", clickedElem);
        target.style.display = "block";
        Micro.addClass("active", target);
    };

    /**
     * Helper function to remove a class from an element.
     * @param  {string} nameClass The name of the class to remove
     * @param  {HTMLElement} element The element to remove the class from
     */
    Micro.removeClass = function(nameClass, element) {
        if(!element || !nameClass) {
            return;
        }

        element.className = element.className.replace( new RegExp('(?:^|\\s)'+nameClass+'(?!\\S)') ,'');
    };

    /**
     * Helper function to add a class to an element
     * @param {string} nameClass The class to add to the element
     * @param {HTMLElement} element   The HTML element to add the class to
     */
    Micro.addClass = function(nameClass, element) {
        if(!element || !nameClass) {
            return;
        }

        element.className += " " + nameClass;
    };

    w.Micro = Micro;
}(window, document));