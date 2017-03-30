#### [Back to Repo README](../README.md)

## Lightning Super Component
By Extending the ```ServiceConsoleUtility``` into your component, the [Public Functions](../README.md#public-functions) are available to be called from your component's ```helper``` object.
```html
<!-- MyComponent extends the ServiceConsoleUtility Super Component -->
<aura:component description="MyComponent" extends="c:ServiceConsoleUtility"></aura:component>
```
```javascript
// MyComponentHelper.js calls .getTabState() through the super's helper function
({
    helperMethod : function(cmp, event, helper) {
        function myProcessor(tabState) { console.log(tabState); }
        helper.getTabState(myProcessor);
    }
})
```

#### [Back to Repo README](../README.md)
