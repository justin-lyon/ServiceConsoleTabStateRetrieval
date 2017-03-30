var acumen = (function(acumen) {
	'use strict';

	acumen.console = {
		getTabState : getTabState,
		getPrimaryTabIdByObjectIdAndUrl : getPrimaryTabIdByObjectIdAndUrl,
		getSubTabIdByObjectIdAndUrl : getPrimaryTabIdByObjectIdAndUrl
	};

	return acumen;

	/**
	* Retrieves the current tab state of the Service Console and executes a callback.
	* @param {callback} cb - The callback that handles the response.
	*/
	function getTabState(processor) {
		var requestPrimaryTabIds = new Promise(function(resolve, reject) {
			sforce.console.getPrimaryTabIds(function(result) {
				if(result.success) {
					resolve(result.ids);

				} else {
					var reason = new Error('Primary Tab Id Request Failed.');
					reject(reason);
				}
			});
		});

		requestPrimaryTabIds
			.then(requestAllPrimaryPageInfos)
			.then(requestAllSubTabs)
			.then(requestAllSubPageInfos)
			.then(function(fulfilled) {

				processor(fulfilled);
			})
			.catch(function(error) {

				processor(error);
			});
	}

	/**
	* Retrieve a single Primary Tab Id using SF Record Id and URL from the Tab State
	* @param {callback} cb - The callback that handles the response.
	*/
	function getPrimaryTabIdByObjectIdAndUrl(recordId, url, callback) {}

	/**
	* Retrieve a single Sub Tab Id using SF Record Id and URL from the Tab State
	* @param {callback} cb - The callback that handles the response.
	*/
	function getSubTabIdByObjectIdAndUrl(recordId, url, callback) {}

	function requestAllPrimaryPageInfos(primaryTabIds) {
		var requestedPrimaryTabIds = primaryTabIds.map(function(primaryTabId) {
			return requestPageInfoByPrimaryTab(primaryTabId);
		});
		return Promise.all(requestedPrimaryTabIds).then(function(fulfilled) {
			return fulfilled.reduce(function(acc, val) {
				acc[val.id] = {};
				acc[val.id].info = val.info;
				return acc;
			}, {});
		});
	}

	function requestPageInfoByPrimaryTab(primaryTabId) {
		return new Promise(function(resolve, reject) {
			sforce.console.getPageInfo(primaryTabId, function(result) {
				if(result.success) {
					var res = {};
					res.info = JSON.parse(result.pageInfo);
					res.id = primaryTabId;
					resolve(res);

				} else {
					var reason = new Error('Page Info Request Failed for TabId: ' + primaryTabId);
					reject(reason);
				}
			});
		});
	}

	function requestAllSubTabs(tabState) {
		var requestedPrimaryTabIds = getPrimaryTabIds(tabState).map(function(primaryTabId) {
			return requestSubTabsByPrimaryTab(primaryTabId);
		});
		return Promise.all(requestedPrimaryTabIds).then(function(fulfilled) {
			return fulfilled.reduce(function(acc, val) {
				val.subTabIds.forEach(function(subTabId) {
					acc[val.id][subTabId] = {};
				});
				return acc;
			}, tabState);
		});
	}

	function requestSubTabsByPrimaryTab(primaryTabId) {
		return new Promise(function(resolve, reject) {
			sforce.console.getSubtabIds(primaryTabId, function(result) {
				if(result.success) {
					var res = {};
					res.id = primaryTabId;
					res.subTabIds = result.ids;
					resolve(res);

				} else {
					var reason = new Error('Error retrieving subtabs for tabId: ' + primaryTabId);
					reject(reason);
				}
			});
		});
	}

	function requestAllSubPageInfos(tabState) {
		var requestedSubTabIds = [];

		getPrimaryTabIds(tabState).forEach(function(primaryTabId) {
			getSubtabIds(tabState, primaryTabId).forEach(function(subTabId) {
				requestedSubTabIds.push(requestPageInfoBySubTab(primaryTabId, subTabId));
			});
		});

		return Promise.all(requestedSubTabIds).then(function(fulfilled) {
			return fulfilled.reduce(function(acc, val) {
				acc[val.primaryTabId][val.subTabId].info = val.info;
				return acc;
			}, tabState);
		});
	}

	function requestPageInfoBySubTab(primaryTabId, subTabId) {
		return new Promise(function(resolve, reject) {
			sforce.console.getPageInfo(subTabId, function(result) {
				if(result.success) {
					var res = {};
					res.primaryTabId = primaryTabId;
					res.subTabId = subTabId;
					res.info = JSON.parse(result.pageInfo);
					resolve(res);

				} else {
					var reason = new Error('Page Info Request Failed for TabId: ' +  subTabId);
					reject(reason);
				}
			});
		});
	}

	function getPrimaryTabIds(tabState) {
		var primaryTabIds = [];
		for( var primaryTabId in tabState ) {
			if( tabState.hasOwnProperty(primaryTabId) && primaryTabId !== 'info' ) {
				primaryTabIds.push(primaryTabId);
			}
		}
		return primaryTabIds;
	}

	function getSubtabIds(tabState, primaryTabId) {
		var subTabIds = [];
		for( var subTabId in tabState[primaryTabId] ) {
			if( tabState[primaryTabId].hasOwnProperty(subTabId) && subTabId !== 'info' ) {
				subTabIds.push(subTabId);
			}
		}
		return subTabIds;
	}

})(acumen || {})
