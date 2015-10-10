# Tabs
Tabs is part of the MicroLib libaray collection created by Thomas Erbe. It is a small, lightweight and easy to use library for creating tabs within your document. It has support for an unlimited number of tags/content and makes use of HTML5 for small HTML code overhead.

If you have any issues regarding a MicroLib library then please use the issue reporter on that library to report the issue. The same thing applies if you have a feature request.

## Usage
Making use of Tabs is super easy! All you need to do is put the right markup in your HTML and then call the function on it.

### Example Markup
The below HTML markup is a basic structure of the tabs within HTML. It makes use of the HTML5 data attributes to set the title and type of element. The ```container``` element can have more than one tabs div and the library will automatically find it and generate it indipendently of everything else.
```html
<div class="container">
    <div class="tabs" data-micro="tabs">
        <div class="tab" data-title="Tab 1">
            <h1>Tab 1</h1>
        </div>
        <div class="tab" data-title="Tab 2">
            <h1>Tab 2</h1>
        </div>

        <div class="tab" data-title="Tab 3">
            <h1>Tab 3</h1>
        </div>

        <div class="tab" data-title="Tab 4">
            <h1>Tab 4</h1>
        </div>
    </div>
</div>
```

### Calling the library
The library works by looking for all elements with the ```data-micro="tabs"``` attribute. It only searches through the parent element you provide it ```container``` in the above example. To call the plugin you first load it into your page, preferably before the closing ```body``` tag.
```html
    ...
    <script src="path/to/tabs.microlib.min.js></script>
</body>
...
```

You can then inside your javascript call the following function. There are a few different ways, below are the different ways.
```javascript
// Passing a string to the function. If the library detects a string then it will use
// document.querySelectorAll to get the elements relating to that string. Currently it
// also assumes you want the first element.
Micro.tabs(".container");
```

The second way is by selecting the element yourself and then passing it the selected HTMLElement object like below:
```javascript
// Select the HTML element
var elem = document.getElementById("yourElement");
Micro.tabs(elem);
```

## Feature Requests
If you have any features you would like to see in this library then please leave an issue with your idea and I'll look into it and see if I think it should be added.

## Issues
Any issues you have please also post in the issues section, myself or other contributors can then look into the issue and release a fix for it.

## Contributing
If you would like to contribute to this project then please fork the repository, make your changes and then publish a pull request. You could also ask other people in the issues section first. Please make your the added features pass the ```npm run lint``` task without any issues.