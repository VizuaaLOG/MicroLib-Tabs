/**
 * Project: MicroLibs
 * File Name: tabs.microlib.js
 * Author: Thomas Erbe
 * Created: 10/10/2015 19:52
 * License: MIT
 */

(function(w, d) {
    "use strict";

    var Micro = w.Micro || {};
    Micro._tabsElements = [];

    /**
     * The main function to initiate a tabs call
     * @param {string|HTMLElement} element The containing element to search through to create a tabs instance
     */
    Micro.tabs = function(element) {
        var container, i, j, k;

        if(!element) {
            return;
        }

        /**
         * Assume that if the container argument is a string that we need to do the selection
         * Also assume that we want the first element
         */
        if(typeof element === "string") {
            container = d.querySelectorAll(element)[0];
        } else {
            container = element;
        }

        /**
         * Loop over all of the children inside the container. When an element with data-micro="tabs" is found
         * then store it for later use.
         */
        var numChildren = container.children.length;

        for(i = 0; i < numChildren; i++) {
            if(container.children[i].dataset.hasOwnProperty("micro") && container.children[i].dataset.micro === "tabs") {

                Micro._tabsElements.push(container.children[i]);
            }
        }

        /**
         * Check to make sure at least one tabs container exists, otherwise exit
         */
        if(Micro._tabsElements.length <= 0) {
            return;
        }

        /**
         * Loop over each tab element creating the tabs markup and the functionality for each.
         */
        var tabsLength = Micro._tabsElements.length;

        for(i = 0; i < tabsLength; i++) {
            var tab = Micro._tabsElements[i];

            /**
             * Find each tab within the main container. Look for the data-title attribute
             */
            var tabs = [],
                childrenNum = tab.children.length;

            for(j = 0; j < childrenNum; j++) {
                if(tab.children[j].dataset.hasOwnProperty("title")) {
                    tabs.push({
                        title: tab.children[j].dataset.title,
                        elem: tab.children[j]
                    });

                    tab.children[j].style.display = "none";

                    if(j === 0) {
                        tab.children[j].style.display = "block";
                        tab.children[j].classList.add("active");
                    }
                }
            }

            /**
             * Loop over each tab setting up the HTML structure.
             */
            var numTabs = tabs.length,
                headingContainer = d.createElement("div");

            headingContainer.classList.add("tabs-headings");

            for(k = 0; k < numTabs; k++) {
                var heading = d.createElement("div");
                heading.classList.add("tab-heading");
                heading.dataset.target = tabs[k].title;
                heading.innerHTML = tabs[k].title;

                heading.addEventListener("click", Micro._processTabClick, false);

                if(k === 0) {
                    heading.classList.add("active");
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
            target = clickedElem.dataset.target,
            tabHeadings = clickedElem.parentNode,
            i;

        /**
         * Find the target element within the tags and assign the HTML element to the target variable
         */
        var tabNum = tabsContainer.children.length;
        for(i = 1; i < tabNum; i++) {
            if(tabsContainer.children[i].dataset.title === target) {
                target = tabsContainer.children[i];
            }
        }

        /**
         * Change the classes and styles to update the looks of the tabs element
         */
        for(i = 1; i < tabNum; i++) {
            tabsContainer.children[i].style.display = "none";
            tabsContainer.children[i].classList.remove("active");
        }


        var numHeadings = tabHeadings.children.length;
        for(i = 0; i < numHeadings; i++) {
            tabHeadings.children[i].classList.remove("active");
        }

        clickedElem.classList.add("active");
        target.style.display = "block";
        target.classList.add("active");
    };

    w.Micro = Micro;
}(window, document));