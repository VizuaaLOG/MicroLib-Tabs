# MicroLib-Tabs
Tabs is part of the MicroLib libaray collection created by Thomas Erbe. It is a small, lightweight and easy to use library for creating tabs within your document. It has support for an unlimited number of tags/content and makes use of HTML5 for small HTML code overhead.

If you have any issues regarding a MicroLib library then please use the issue reporter on that library to report the issue. The same thing applies if you have a feature request.

## Installation
**Option 1** Install via NPM
```
npm install microlib-tabs
```

**Option 2** Install via Bower
```
bower install microlib-tabs
```
**Option 3** Download and include manually

## File differences
In the newer versions of MicroLib libraries the have two files, ```{moduleName}.microlib-x.x.x.js``` and ```{moduleName}-standalone.microlib.x.x.x.js```. When moving over to use ES6 any utility / helper methods were extracted into a utility file, this is shared among all MicroLib libraries. Should you wish to use a single library i.e Tabs, then you can the standalone variant, this includes the Tabs code as well as the helper methods it needs, nothing else. It is recommended to use the non-standalone file if you use more than one MicroLib libary as this way the methods are defined once and not multiple times.

Older versions of each file are also kept for historic purposes.

## Usage
Making use of Tabs is super easy! All you need to do is put the right markup in your HTML and then call the function on it.

### Example Markup
The below HTML markup is a basic structure of the tabs within HTML. It makes use of the HTML5 data attributes to set the title and type of element. The ```container``` element can have more than one tabs div and the library will automatically find it and generate it indipendently of everything else.
```html
<div class="tabs">
    <div class="microlib_tabs_tab" data-title="Tab 1">
        <h1>Tab 1</h1>
    </div>

    <div class="microlib_tabs_tab" data-title="Tab 2">
        <h1>Tab 2</h1>
    </div>

    <div class="microlib_tabs_tab" data-title="Tab 3">
        <h1>Tab 3</h1>
    </div>

    <div class="microlib_tabs_tab" data-title="Tab 4">
        <h1>Tab 4</h1>
    </div>
</div>
```

### Calling the library
You can setup the tabs system by creating a new MicroTab instance and passing either the class name or ID of the element(s) you would like to 'tabbinate'
```html
    ...
    <script src="path/to/utils.microlib.min.js"></script>
    <script src="path/to/tabs.microlib.min.js"></script>
    // OR
    <script src="path/to/tabs-standalone.microlib.min.js"></script>
</body>
</html>
```

You can then inside your javascript call the following function.
```javascript
new ML.Tabs(".tabs");
// OR
new ML.Tabs("#tab");
```

## Events
You can call a function when the tab changes by attaching an onChange function to the MicroTab instance, this then receives 3 parameter; the new content element, the new tab element and the mouse click event.
```javascript
var myTabs = new ML.Tabs('.tabs');
myTabs.onChange = function(newContent, newTab, e) {console.log('changed')};
```

## Configuration
As from version `2.1.0` you can now pass an optional object as the second argument. This will allow you to customise the classes applied to the elements.

| Option         | Type   | Default                  | Description                                                    |
|----------------|--------|--------------------------|----------------------------------------------------------------|
| tab_class      | string | `microlib_tabs_tab`      | The class used when searching for all tabs within your markup. |
| nav_class      | string | `microlib_tabs_nav`      | The class applied to the tab nav container.                    |
| nav_item_class | string | `microlib_tabs_nav_item` | The class applied to each nav item.                            |
| active_class   | string | `microlib_active`        | The class applied to a nav item and tab when it is active.     |

## Feature Requests
If you have any features you would like to see in this library then please leave an issue with your idea and I'll look into it and see if I think it should be added.

## Issues
Any issues you have please also post in the issues section, myself or other contributors can then look into the issue and release a fix for it.

## Contributing
If you would like to contribute to this project then please fork the repository, make your changes and then publish a pull request. You could also ask other people in the issues section first. Please make your the added features pass the ```npm run lint``` task without any issues.

In order to build the standalone file, you may need to run a ```bower install``` this will download the latest version of MicroLib-Utils.
