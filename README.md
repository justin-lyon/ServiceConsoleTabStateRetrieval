# ServiceConsoleTabStateRetrieval

This is a static resource to augment the usage of [Salesforce's Integration Toolkit](https://developer.salesforce.com/docs/atlas.en-us.api_console.meta/api_console/sforce_api_console_methods_tabs.htm). Should a failure occur during your usage of the Integration Toolkit, implement this resource to retrieve the tab state so you can determine how best to move forward.

### Implementation

```javascript
var v1 = 1;
var v2 = 2;

// Use the caller to pass through tabState into your own processing handler.
function myCaller(fulfilledTabState, functionToBeCalled) {
  functionToBeCalled(fulfilledTabState, v1, v2);
}

// Now that we've passed all that we need into the processor, get cooking.
function myProcessor(fulfilledTabState, p1, p2) {
  console.log('we did it!', fulfilledTabState);
  console.log(fulfilledTabState['scc-pt-0'].info.objectId);
  console.log(p1);
  console.log(p2);
}

getTabState(myCaller, myProcessor);
```
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
