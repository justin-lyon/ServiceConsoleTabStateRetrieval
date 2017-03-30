#### [Back to Repo README]("../README.md")

## JS Static Resource
This Static Resource is designed to extend the ```acumen``` module. All Service Console Utility functions are within the ```console``` object of the ```acumen``` module.

Include the resource in your page, then call ```.getTabState()``` through the module ```acumen.console.getTabState()```.
```html
<!-- include the resource in your html -->
<script src="path/to/ServiceConsoleUtility.js" type="text/javascript" ></script>
```
```javascript
var v1 = 1;
var v2 = 2;

// Write a function to pass through .getTabState()
function myProcessor(fulfilledTabState) {
  console.log('we did it!', fulfilledTabState);
  console.log(fulfilledTabState['scc-pt-0'].info.objectId);
  console.log(v1);
  console.log(v2);
}

acumen.console.getTabState(myProcessor);
```

#### [Back to Repo README]("../README.md")
