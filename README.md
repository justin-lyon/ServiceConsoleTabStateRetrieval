# Acumen Service Console Utility

This is a utility to augment the usage of [Salesforce's Integration Toolkit](https://developer.salesforce.com/docs/atlas.en-us.api_console.meta/api_console/sforce_api_console_methods_tabs.htm). By using this utility in conjunction with Salesforce's Integration Toolkit, you may quickly identify the Service Console's Tab State and take action upon it.

---
### Public Functions
These functions are available in both the Static Resource and the Lightning Component resources.

* ```getTabState(callback)```
Retrieve the current Tab State from Service Console. See Sample Tab State response below.

---
### Implementations

#### [Static Resource](./Static_Resource/README.md)

#### [Lightning Super Component](./Lightning/README.md)

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
