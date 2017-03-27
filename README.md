# ServiceConsoleTabStateRetrieval

This is a JS resource to augment the usage of [Salesforce's Integration Toolkit](https://developer.salesforce.com/docs/atlas.en-us.api_console.meta/api_console/sforce_api_console_methods_tabs.htm). Should a failure occur during your usage of the Integration Toolkit, implement this resource to retrieve the tab state so you can determine how best to move forward.

## Implementation
This resource can be used as either a Javascript Static Resource or a Lightning Super Component.

---
### As a Javascript Static Resource
Include the resource in your page, then call ```.getTabState()``` through the module ```acumen.console.getTabState()```.
```html
<!-- include the resource in your html -->
<script src="path/to/ServiceConsoleTabStateRetrieval.js" type="text/javascript" ></script>
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
---
### As a Lightning Super Component
Extend the ```ServiceConsoleTabStateRetrieval``` into your component. Then call ```.getTabState()``` from your component's ```helper``` object.
```html
<!-- MyComponent extends the ServiceConsoleTabStateRetrieval Super Component -->
<aura:component description="MyComponent" extends="c:ServiceConsoleTabStateRetrieval"></aura:component>
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
---
### Sample Tab State
Note: The Integration Toolkit's [```getPageInfo()```](https://developer.salesforce.com/docs/atlas.en-us.api_console.meta/api_console/sforce_api_console_getpageinfo.htm) will return at minimum ```objectId``` and ```url``` - even for sleeping service console tabs. Active tabs will return more info.
```json
{
   "scc-pt-0":{
      "info":{
         "objectId":"",
         "url":""
      },
      "scc-st-0":{
         "info":{
            "objectId":"",
            "url":""
         }
      },
      "scc-st-1":{
         "info":{
            "objectId":"",
            "url":""
         }
      }
   },
   "scc-pt-1":{
      "info":{
         "objectId":"",
         "url":""
      },
      "scc-st-2":{
         "info":{
            "objectId":"",
            "url":""
         }
      },
      "scc-st-3":{
         "info":{
            "objectId":"",
            "url":""
         }
      }
   }
}
```
