chrome.extension.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.action === "showIcon") {
			chrome.pageAction.show(sender.tab.id);
		}
		if (request.action == "queryConfig") {
			chrome.storage.sync.get('config', function(object) {
				var defaultConfig = {
					ADBlock: true,
					darkMode: true,
					hideChat: false
				}
				var config = object.config===undefined?defaultConfig:object.config;
				chrome.tabs.sendMessage(sender.tab.id, 
		        	{action:"initConfig", config:config},
		        	function(response){}
		        );
			});
		}
	}
);

